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
import { PiArrowCounterClockwise } from 'react-icons/pi';

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
const SETTLE_DT = 16.667;

export function FallingStack({
  items,
  className,
  gravity = 1.1,
  mouseConstraintStiffness = 0.3,
}: FallingStackProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasContainerRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);

  const [runKey, setRunKey] = useState(0);

  const reset = useCallback(() => {
    setRunKey((k) => k + 1);
  }, []);

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
    } = Matter;

    const canvasContainer = canvasContainerRef.current;

    if (!containerRef.current || !canvasContainer) {
      return;
    }

    const containerRect = containerRef.current.getBoundingClientRect();
    const width = containerRect.width;
    const height = containerRect.height;
    if (width <= 0 || height <= 0) return;

    const engine = Engine.create();
    engine.world.gravity.y = gravity;

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

    // Switch chips to absolute layout — hide briefly so the flex-wrap frame never paints.
    chipBodies.forEach(({ elem }) => {
      elem.style.position = 'absolute';
      elem.style.visibility = 'hidden';
    });

    World.add(engine.world, [
      floor,
      leftWall,
      rightWall,
      ceiling,
      ...chipBodies.map((cb) => cb.body),
    ]);

    // Pre-simulate headlessly until the pile settles.
    for (let i = 0; i < SETTLE_STEPS; i++) {
      Engine.update(engine, SETTLE_DT);
    }

    // Apply settled positions and reveal.
    chipBodies.forEach(({ elem, body }) => {
      elem.style.left = `${body.position.x}px`;
      elem.style.top = `${body.position.y}px`;
      elem.style.transform = `translate(-50%, -50%) rotate(${body.angle}rad)`;
      elem.style.visibility = 'visible';
    });

    const mouse = Mouse.create(containerRef.current);
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
      cancelAnimationFrame(rafId);
      Render.stop(render);
      Runner.stop(runner);
      if (render.canvas && canvasContainer) {
        canvasContainer.removeChild(render.canvas);
      }
      World.clear(engine.world, false);
      Engine.clear(engine);
    };
  }, [runKey, gravity, mouseConstraintStiffness]);

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

      <Button
        icon={PiArrowCounterClockwise}
        isLabelHidden
        label="Reset"
        onClick={reset}
        size="xs"
        variant="outline"
        className={cn(
          'absolute top-3 right-3 z-10',
          'bg-background/80 backdrop-blur',
        )}
      />
    </div>
  );
}
