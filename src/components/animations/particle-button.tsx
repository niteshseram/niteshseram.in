'use client';

import { AnimatePresence, motion } from 'motion/react';
import { useRef, useState } from 'react';

import type { ButtonProps } from '@/components/ui/button';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type Props = ButtonProps &
  Readonly<{
    onSuccess?: () => void;
    successDuration?: number;
  }>;

export function ParticleButton({
  successDuration = 1000,
  className,
  onClick,
  ...props
}: Props) {
  const [particleState, setParticleState] = useState<ParticleState | null>(
    null,
  );
  const buttonRef = useRef<HTMLButtonElement>(null);

  function handleClick(e: React.MouseEvent<HTMLElement>) {
    onClick?.(e);

    const rect = e.currentTarget.getBoundingClientRect();
    const origin = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };

    const particles = Array.from({ length: 6 }).map((_, i) => ({
      id: i,
      x: (i % 2 ? 1 : -1) * (Math.random() * 50 + 20),
      y: -Math.random() * 50 - 20,
    }));

    setParticleState({ particles, origin });

    setTimeout(() => {
      setParticleState(null);
    }, successDuration);
  }

  return (
    <>
      {particleState && (
        <SuccessParticles
          particles={particleState.particles}
          origin={particleState.origin}
        />
      )}
      <Button
        ref={buttonRef}
        onClick={handleClick}
        className={cn(
          'relative',
          particleState && 'scale-95',
          'transition-transform duration-100',
          className,
        )}
        {...props}
      />
    </>
  );
}

type Particle = {
  id: number;
  x: number;
  y: number;
};

type ParticleState = {
  particles: Particle[];
  origin: { x: number; y: number };
};

function SuccessParticles({
  particles,
  origin,
}: Readonly<{
  particles: Particle[];
  origin: { x: number; y: number };
}>) {
  return (
    <AnimatePresence>
      {particles.map((particle, i) => (
        <motion.div
          key={particle.id}
          className="bg-foreground fixed size-1 rounded-full"
          style={{ left: origin.x, top: origin.y }}
          initial={{
            scale: 0,
            x: 0,
            y: 0,
          }}
          animate={{
            scale: [0, 1, 0],
            x: [0, particle.x],
            y: [0, particle.y],
          }}
          transition={{
            duration: 0.6,
            delay: i * 0.1,
            ease: 'easeOut',
          }}
        />
      ))}
    </AnimatePresence>
  );
}
