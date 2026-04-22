'use client';

import Matter from 'matter-js';
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import {
  PiArrowCounterClockwise,
  PiDeviceMobile,
  PiDeviceMobileSlash,
  PiSpeakerHigh,
  PiSpeakerSlash,
} from 'react-icons/pi';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export type FallingStackItem = {
  id: string;
  node: ReactNode;
};

type FallingStackProps = {
  items: FallingStackItem[];
  className?: string;
  gravity?: number;
  mouseConstraintStiffness?: number;
};

const SETTLE_STEPS = 180;
const SETTLE_DT = 16.666;

export function FallingStack({
  items,
  className,
  gravity = 1.1,
  mouseConstraintStiffness = 0.3,
}: FallingStackProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasContainerRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const mutedRef = useRef(false);
  const engineRef = useRef<Matter.Engine | null>(null);
  const bodiesRef = useRef<Matter.Body[]>([]);

  const [runKey, setRunKey] = useState(0);
  const [muted, setMuted] = useState(true);
  const [tiltSupported, setTiltSupported] = useState(false);
  const [tiltEnabled, setTiltEnabled] = useState(false);

  useEffect(() => {
    mutedRef.current = muted;
  }, [muted]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const hasOrientation = 'DeviceOrientationEvent' in window;
    const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setTiltSupported(hasOrientation && hasTouch);
  }, []);

  const toggleTilt = useCallback(async () => {
    if (tiltEnabled) {
      setTiltEnabled(false);
      return;
    }
    const DOE = window.DeviceOrientationEvent as
      | (typeof window.DeviceOrientationEvent & {
          requestPermission?: () => Promise<'granted' | 'denied'>;
        })
      | undefined;
    const DME = window.DeviceMotionEvent as
      | (typeof window.DeviceMotionEvent & {
          requestPermission?: () => Promise<'granted' | 'denied'>;
        })
      | undefined;
    try {
      if (typeof DOE?.requestPermission === 'function') {
        const res = await DOE.requestPermission();
        if (res !== 'granted') return;
      }
      if (typeof DME?.requestPermission === 'function') {
        const res = await DME.requestPermission();
        if (res !== 'granted') return;
      }
    } catch {
      return;
    }
    setTiltEnabled(true);
  }, [tiltEnabled]);

  const ensureAudio = useCallback(() => {
    if (!audioCtxRef.current) {
      try {
        audioCtxRef.current = new AudioContext();
      } catch {
        return;
      }
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume().catch(() => {});
    }
  }, []);

  const reset = useCallback(() => {
    ensureAudio();
    setRunKey((k) => k + 1);
  }, [ensureAudio]);

  const toggleMute = useCallback(() => {
    ensureAudio();
    setMuted((m) => !m);
  }, [ensureAudio]);

  // Re-run the simulation when the container size changes (dev resizes, viewport changes).
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof ResizeObserver === 'undefined') return;
    let prev = { w: el.clientWidth, h: el.clientHeight };
    const observer = new ResizeObserver(() => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      if (w !== prev.w || h !== prev.h) {
        prev = { w, h };
        setRunKey((k) => k + 1);
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useLayoutEffect(() => {
    const {
      Engine,
      Render,
      World,
      Bodies,
      Runner,
      Mouse,
      MouseConstraint,
      Body,
      Events,
    } = Matter;

    const canvasContainer = canvasContainerRef.current;
    const container = containerRef.current;

    if (!container || !canvasContainer) {
      return;
    }

    const containerRect = container.getBoundingClientRect();
    const width = containerRect.width;
    const height = containerRect.height;
    if (width <= 0 || height <= 0) return;

    const engine = Engine.create();
    engine.gravity.y = gravity;
    engineRef.current = engine;

    const render = Render.create({
      element: canvasContainer,
      engine,
      options: {
        width,
        height,
        background: 'transparent',
        wireframes: false,
      },
    });

    const boundaryOptions = {
      isStatic: true,
      render: { fillStyle: 'transparent' },
    };
    const floor = Bodies.rectangle(
      width / 2,
      height + 25,
      width,
      50,
      boundaryOptions,
    );
    const leftWall = Bodies.rectangle(
      -25,
      height / 2,
      50,
      height,
      boundaryOptions,
    );
    const rightWall = Bodies.rectangle(
      width + 25,
      height / 2,
      50,
      height,
      boundaryOptions,
    );
    const ceiling = Bodies.rectangle(
      width / 2,
      -25,
      width,
      50,
      boundaryOptions,
    );

    const chipBodies = itemRefs.current
      .filter((el): el is HTMLDivElement => el !== null)
      .map((elem) => {
        const rect = elem.getBoundingClientRect();
        // Start each chip where flex-wrap put it — guarantees non-overlapping starts.
        const startX = rect.left - containerRect.left + rect.width / 2;
        const startY = rect.top - containerRect.top + rect.height / 2;

        const body = Bodies.rectangle(startX, startY, rect.width, rect.height, {
          chamfer: { radius: Math.min(rect.height / 2, 16) },
          render: { fillStyle: 'transparent' },
          restitution: 0.3,
          frictionAir: 0.008,
          friction: 0.15,
        });
        Body.setVelocity(body, { x: (Math.random() - 0.5) * 1.5, y: 0 });
        Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.05);

        return { elem, body };
      });

    // Switch chips to absolute layout. They render with opacity-0 from JSX so the
    // SSR/pre-hydration paint never shows the flex-wrap layout — we reveal them
    // below after the settled positions are applied.
    chipBodies.forEach(({ elem }) => {
      elem.style.position = 'absolute';
    });

    World.add(engine.world, [
      floor,
      leftWall,
      rightWall,
      ceiling,
      ...chipBodies.map((cb) => cb.body),
    ]);
    bodiesRef.current = chipBodies.map((cb) => cb.body);

    // Pre-simulate headlessly until the pile settles. Collision sounds are wired
    // up after this loop so the silent-settle doesn't trigger any audio.
    for (let i = 0; i < SETTLE_STEPS; i++) {
      Engine.update(engine, SETTLE_DT);
    }

    // Apply settled positions and reveal.
    chipBodies.forEach(({ elem, body }) => {
      elem.style.left = `${body.position.x}px`;
      elem.style.top = `${body.position.y}px`;
      elem.style.transform = `translate(-50%, -50%) rotate(${body.angle}rad)`;
      elem.style.opacity = '1';
    });

    // AudioContext is created lazily on first user gesture (pointerdown or a
    // button click). Also resume on tab return in case the browser suspended it.
    container.addEventListener('pointerdown', ensureAudio);
    const onVisibility = () => {
      if (document.visibilityState === 'visible') ensureAudio();
    };
    document.addEventListener('visibilitychange', onVisibility);

    let lastSlideAt = 0;
    const onCollisionStart = (event: Matter.IEventCollision<Matter.Engine>) => {
      if (mutedRef.current) return;
      const ctx = audioCtxRef.current;
      if (!ctx || ctx.state === 'closed') return;
      for (const pair of event.pairs) {
        const { bodyA, bodyB } = pair;
        const speed = Math.hypot(
          bodyA.velocity.x - bodyB.velocity.x,
          bodyA.velocity.y - bodyB.velocity.y,
        );
        if (speed < 1.5) continue;
        playImpact(ctx, Math.min(1, speed / 10));
      }
    };
    const onCollisionActive = (
      event: Matter.IEventCollision<Matter.Engine>,
    ) => {
      if (mutedRef.current) return;
      const ctx = audioCtxRef.current;
      if (!ctx || ctx.state === 'closed') return;
      const t = ctx.currentTime;
      if (t - lastSlideAt < 0.08) return;
      for (const pair of event.pairs) {
        const { bodyA, bodyB } = pair;
        const speed = Math.hypot(
          bodyA.velocity.x - bodyB.velocity.x,
          bodyA.velocity.y - bodyB.velocity.y,
        );
        if (speed > 2.5 && speed < 9) {
          playScrape(ctx, Math.min(1, speed / 12));
          lastSlideAt = t;
          return;
        }
      }
    };
    Events.on(engine, 'collisionStart', onCollisionStart);
    Events.on(engine, 'collisionActive', onCollisionActive);

    const mouse = Mouse.create(container);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: mouseConstraintStiffness,
        render: { visible: false },
      },
    });
    render.mouse = mouse;
    World.add(engine.world, mouseConstraint);

    // Matter binds release listeners only to the container. If the cursor leaves
    // mid-drag and releases outside, the constraint never detaches and the chip
    // stays pinned. Detach manually on any global release. Types disallow null
    // here but runtime accepts it — that is the documented release pattern.
    const releaseDrag = () => {
      const mc = mouseConstraint as unknown as {
        body: Matter.Body | null;
        constraint: { bodyB: Matter.Body | null };
      };
      const held = mc.body;
      if (held) {
        // Nudge downward so the chip can't rest in stable contact with a wall
        // or the ceiling — guarantees gravity takes over visibly.
        Body.setVelocity(held, {
          x: held.velocity.x,
          y: Math.max(held.velocity.y, 1.5),
        });
      }
      mc.body = null;
      mc.constraint.bodyB = null;
      mouse.button = -1;
    };
    window.addEventListener('mouseup', releaseDrag);
    window.addEventListener('touchend', releaseDrag);
    window.addEventListener('pointerup', releaseDrag);

    const runner = Runner.create();
    Runner.run(runner, engine);
    Render.run(render);

    let rafId = 0;
    const updateLoop = () => {
      chipBodies.forEach(({ body, elem }) => {
        const { x, y } = body.position;
        elem.style.left = `${x}px`;
        elem.style.top = `${y}px`;
        elem.style.transform = `translate(-50%, -50%) rotate(${body.angle}rad)`;
      });
      Engine.update(engine);
      rafId = requestAnimationFrame(updateLoop);
    };
    updateLoop();

    return () => {
      window.removeEventListener('mouseup', releaseDrag);
      window.removeEventListener('touchend', releaseDrag);
      window.removeEventListener('pointerup', releaseDrag);
      container.removeEventListener('pointerdown', ensureAudio);
      document.removeEventListener('visibilitychange', onVisibility);
      Events.off(engine, 'collisionStart', onCollisionStart);
      Events.off(engine, 'collisionActive', onCollisionActive);
      cancelAnimationFrame(rafId);
      Render.stop(render);
      Runner.stop(runner);
      if (render.canvas && canvasContainer) {
        canvasContainer.removeChild(render.canvas);
      }
      World.clear(engine.world, false);
      Engine.clear(engine);
      engineRef.current = null;
      bodiesRef.current = [];
    };
  }, [runKey, gravity, mouseConstraintStiffness, ensureAudio]);

  useEffect(() => {
    const engine = engineRef.current;
    if (!engine) return;
    if (!tiltEnabled) {
      engine.gravity.x = 0;
      engine.gravity.y = gravity;
      return;
    }

    const TILT_SCALE = 1.6;
    const SHAKE_THRESHOLD = 22;
    const SHAKE_COOLDOWN_MS = 350;

    // iOS reports `deviceorientation` values already compensated for screen
    // orientation; Android reports raw device-frame values. Rotate into screen
    // frame only on platforms that don't pre-compensate.
    const iosCompensates =
      typeof (
        window.DeviceOrientationEvent as unknown as {
          requestPermission?: unknown;
        }
      ).requestPermission === 'function';

    const onOrient = (event: DeviceOrientationEvent) => {
      const currentEngine = engineRef.current;
      if (!currentEngine) return;
      const beta = event.beta ?? 0;
      const gamma = event.gamma ?? 0;
      const deviceX = Math.sin((gamma * Math.PI) / 180);
      const deviceY = Math.sin((beta * Math.PI) / 180);
      let gx: number;
      let gy: number;
      if (iosCompensates) {
        gx = deviceX;
        gy = deviceY;
      } else {
        const screenAngleDeg =
          screen.orientation?.angle ??
          (window as Window & { orientation?: number }).orientation ??
          0;
        const screenAngleRad = (screenAngleDeg * Math.PI) / 180;
        const cos = Math.cos(screenAngleRad);
        const sin = Math.sin(screenAngleRad);
        gx = deviceX * cos + deviceY * sin;
        gy = -deviceX * sin + deviceY * cos;
      }
      currentEngine.gravity.x = gx * TILT_SCALE;
      currentEngine.gravity.y = gy * TILT_SCALE;
    };

    let lastAccel: { x: number; y: number; z: number } | null = null;
    let lastShakeAt = 0;
    const onMotion = (event: DeviceMotionEvent) => {
      const accel = event.accelerationIncludingGravity;
      if (!accel) return;
      const accelX = accel.x ?? 0;
      const accelY = accel.y ?? 0;
      const accelZ = accel.z ?? 0;
      if (lastAccel) {
        const deltaX = accelX - lastAccel.x;
        const deltaY = accelY - lastAccel.y;
        const deltaZ = accelZ - lastAccel.z;
        const deltaMagnitude = Math.hypot(deltaX, deltaY, deltaZ);
        const now = performance.now();
        if (
          deltaMagnitude > SHAKE_THRESHOLD &&
          now - lastShakeAt > SHAKE_COOLDOWN_MS
        ) {
          lastShakeAt = now;
          const strength = Math.min(3, deltaMagnitude / 15);
          bodiesRef.current.forEach((body) => {
            Matter.Body.setVelocity(body, {
              x: body.velocity.x + (Math.random() - 0.5) * 10 * strength,
              y: body.velocity.y + (Math.random() * -1 - 0.2) * 6 * strength,
            });
            Matter.Body.setAngularVelocity(
              body,
              body.angularVelocity + (Math.random() - 0.5) * 0.25 * strength,
            );
          });
        }
      }
      lastAccel = { x: accelX, y: accelY, z: accelZ };
    };

    window.addEventListener('deviceorientation', onOrient);
    window.addEventListener('devicemotion', onMotion);
    return () => {
      window.removeEventListener('deviceorientation', onOrient);
      window.removeEventListener('devicemotion', onMotion);
    };
  }, [tiltEnabled, gravity, runKey]);

  return (
    <div className={cn('relative', className)}>
      <div ref={containerRef} className="absolute inset-0 overflow-hidden">
        <div
          key={runKey}
          className={cn(
            'flex flex-wrap items-center justify-center',
            'gap-3 p-6 sm:p-8',
          )}
        >
          {items.map((item, i) => (
            <div
              key={item.id}
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
              className="opacity-0"
            >
              {item.node}
            </div>
          ))}
        </div>
        <div
          ref={canvasContainerRef}
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
        />
      </div>

      <div
        className={cn(
          'absolute top-3 right-3 z-10',
          'flex items-center gap-1.5',
        )}
      >
        {tiltSupported ? (
          <Button
            icon={tiltEnabled ? <PiDeviceMobile /> : <PiDeviceMobileSlash />}
            isLabelHidden
            label={tiltEnabled ? 'Disable tilt & shake' : 'Enable tilt & shake'}
            onClick={toggleTilt}
            size="xs"
            variant="outline"
            className="bg-background/80 backdrop-blur"
          />
        ) : null}
        <Button
          icon={muted ? <PiSpeakerSlash /> : <PiSpeakerHigh />}
          isLabelHidden
          label={muted ? 'Unmute audio' : 'Mute audio'}
          onClick={toggleMute}
          size="xs"
          variant="outline"
          className="bg-background/80 backdrop-blur"
        />
        <Button
          icon={<PiArrowCounterClockwise />}
          isLabelHidden
          label="Reset"
          onClick={reset}
          size="xs"
          variant="outline"
          className="bg-background/80 backdrop-blur"
        />
      </div>
    </div>
  );
}

function playImpact(ctx: AudioContext, intensity: number) {
  const now = ctx.currentTime;
  const duration = 0.09;
  const bufferSize = Math.max(1, Math.floor(ctx.sampleRate * duration));
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    const decay = 1 - i / bufferSize;
    data[i] = (Math.random() * 2 - 1) * decay * decay;
  }
  const source = ctx.createBufferSource();
  source.buffer = buffer;

  const filter = ctx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.value = 600 + intensity * 2400;
  filter.Q.value = 1;

  const gain = ctx.createGain();
  const peak = 0.04 + intensity * 0.16;
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(peak, now + 0.005);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

  source.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);
  source.start(now);
  source.stop(now + duration + 0.02);
}

function playScrape(ctx: AudioContext, intensity: number) {
  const now = ctx.currentTime;
  const duration = 0.07;
  const bufferSize = Math.max(1, Math.floor(ctx.sampleRate * duration));
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * 0.6;
  }
  const source = ctx.createBufferSource();
  source.buffer = buffer;

  const filter = ctx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.value = 1800 + intensity * 1800;
  filter.Q.value = 0.7;

  const gain = ctx.createGain();
  const peak = 0.015 + intensity * 0.03;
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(peak, now + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

  source.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);
  source.start(now);
  source.stop(now + duration + 0.02);
}
