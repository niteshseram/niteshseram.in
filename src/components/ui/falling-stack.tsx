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

import { cn } from '@/lib/utils';

import { playImpact, playScrape } from './falling-stack-audio';
import { FallingStackControls } from './falling-stack-controls';

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
  const ensureAudioRef = useRef<() => void>(() => {});

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

  ensureAudioRef.current = () => {
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
  };

  const reset = useCallback(() => {
    ensureAudioRef.current();
    setRunKey((k) => k + 1);
  }, []);

  const toggleMute = useCallback(() => {
    ensureAudioRef.current();
    setMuted((m) => !m);
  }, []);

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

    const chipBodies: Array<{ elem: HTMLDivElement; body: Matter.Body }> = [];
    for (const elem of itemRefs.current) {
      if (elem === null) continue;
      const rect = elem.getBoundingClientRect();
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

      chipBodies.push({ elem, body });
    }

    for (const { elem } of chipBodies) {
      elem.style.position = 'absolute';
    }

    World.add(engine.world, [
      floor,
      leftWall,
      rightWall,
      ceiling,
      ...chipBodies.map((cb) => cb.body),
    ]);
    bodiesRef.current = chipBodies.map((cb) => cb.body);

    for (let i = 0; i < SETTLE_STEPS; i++) {
      Engine.update(engine, SETTLE_DT);
    }

    for (const { elem, body } of chipBodies) {
      elem.style.cssText = `position: absolute; left: ${body.position.x}px; top: ${body.position.y}px; transform: translate(-50%, -50%) rotate(${body.angle}rad); opacity: 1;`;
    }

    function handleEnsureAudio() {
      ensureAudioRef.current();
    }
    container.addEventListener('pointerdown', handleEnsureAudio, {
      passive: true,
    });
    const onVisibility = () => {
      if (document.visibilityState === 'visible') ensureAudioRef.current();
    };
    document.addEventListener('visibilitychange', onVisibility, {
      passive: true,
    });

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

    const releaseDrag = () => {
      const mc = mouseConstraint as unknown as {
        body: Matter.Body | null;
        constraint: { bodyB: Matter.Body | null };
      };
      const held = mc.body;
      if (held) {
        Body.setVelocity(held, {
          x: held.velocity.x,
          y: Math.max(held.velocity.y, 1.5),
        });
      }
      mc.body = null;
      mc.constraint.bodyB = null;
      mouse.button = -1;
    };
    window.addEventListener('mouseup', releaseDrag, { passive: true });
    window.addEventListener('touchend', releaseDrag, { passive: true });
    window.addEventListener('pointerup', releaseDrag, { passive: true });

    const runner = Runner.create();
    Runner.run(runner, engine);
    Render.run(render);

    let rafId = 0;
    const updateLoop = () => {
      for (const { body, elem } of chipBodies) {
        const { x, y } = body.position;
        elem.style.cssText = `position: absolute; left: ${x}px; top: ${y}px; transform: translate(-50%, -50%) rotate(${body.angle}rad); opacity: 1;`;
      }
      Engine.update(engine);
      rafId = requestAnimationFrame(updateLoop);
    };
    updateLoop();

    return () => {
      window.removeEventListener('mouseup', releaseDrag);
      window.removeEventListener('touchend', releaseDrag);
      window.removeEventListener('pointerup', releaseDrag);
      container.removeEventListener('pointerdown', handleEnsureAudio);
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
  }, [runKey, gravity, mouseConstraintStiffness]);

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

    window.addEventListener('deviceorientation', onOrient, { passive: true });
    window.addEventListener('devicemotion', onMotion, { passive: true });
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

      <FallingStackControls
        muted={muted}
        tiltSupported={tiltSupported}
        tiltEnabled={tiltEnabled}
        onReset={reset}
        onToggleMute={toggleMute}
        onToggleTilt={toggleTilt}
      />
    </div>
  );
}
