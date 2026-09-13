'use client';

import { useEffect, useId, useRef } from 'react';

import { cn } from '@/lib/utils';

import styles from './footer-companion.module.css';

const headOutline =
  'M11 28C8 21 10 8 14 6c4-2 8 7 11 13 5-2 11-2 16 0 4-7 7-12 10-11 5 2 6 15 2 22 4 9-4 18-21 18S7 40 11 28Z';

export function FooterCompanion({
  isSleeping = false,
}: {
  isSleeping?: boolean;
}) {
  const characterRef = useRef<SVGSVGElement>(null);
  const faceClipId = useId();
  const pawClipId = useId();
  const headClipId = useId();

  useEffect(() => {
    const character = characterRef.current;
    if (!character) return;

    const motionPreference = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    );
    const finePointer = window.matchMedia('(any-pointer: fine)');
    let visible = false;
    let frame = 0;
    let pointerX = 0;
    let pointerY = 0;

    function resetGaze() {
      cancelAnimationFrame(frame);
      frame = 0;
      character?.style.setProperty('--gaze-x', '0px');
      character?.style.setProperty('--gaze-y', '0px');
      character?.style.setProperty('--lean', '0deg');
    }

    function updateGaze() {
      frame = 0;
      if (
        !character ||
        !visible ||
        isSleeping ||
        motionPreference.matches ||
        !finePointer.matches
      )
        return;
      const bounds = character.getBoundingClientRect();
      const distanceX = pointerX - (bounds.left + bounds.width / 2);
      const distanceY = pointerY - (bounds.top + bounds.height / 2);
      const distance = Math.hypot(distanceX, distanceY);
      const strength = Math.min(distance / 120, 1);
      const directionX = distance ? distanceX / distance : 0;
      const directionY = distance ? distanceY / distance : 0;
      character.style.setProperty(
        '--gaze-x',
        `${directionX * strength * 1.5}px`,
      );
      character.style.setProperty(
        '--gaze-y',
        `${directionY * strength * 1.5}px`,
      );
      character.style.setProperty('--lean', `${directionX * strength * 2}deg`);
    }

    function handlePointerMove(event: PointerEvent) {
      if (
        event.pointerType === 'touch' ||
        !visible ||
        isSleeping ||
        motionPreference.matches ||
        !finePointer.matches
      )
        return;
      pointerX = event.clientX;
      pointerY = event.clientY;
      if (!frame) frame = requestAnimationFrame(updateGaze);
    }

    resetGaze();

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        character.dataset.revealed = String(visible);
        if (!visible) resetGaze();
      },
      { rootMargin: '0px 0px -32px 0px' },
    );
    observer.observe(character.closest('footer') ?? character);
    window.addEventListener('pointermove', handlePointerMove, {
      passive: true,
    });
    window.addEventListener('blur', resetGaze);
    window.addEventListener('scroll', resetGaze, { passive: true });
    window.addEventListener('resize', resetGaze);
    document.documentElement.addEventListener('pointerleave', resetGaze);
    motionPreference.addEventListener('change', resetGaze);
    finePointer.addEventListener('change', resetGaze);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('blur', resetGaze);
      window.removeEventListener('scroll', resetGaze);
      window.removeEventListener('resize', resetGaze);
      document.documentElement.removeEventListener('pointerleave', resetGaze);
      motionPreference.removeEventListener('change', resetGaze);
      finePointer.removeEventListener('change', resetGaze);
    };
  }, [isSleeping]);

  return (
    <svg
      ref={characterRef}
      data-footer-companion=""
      data-sleeping={isSleeping}
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={cn(
        styles.character,
        'absolute -top-12 right-6 size-16 overflow-visible sm:right-10',
        'pointer-events-none',
      )}
    >
      <defs>
        <clipPath id={faceClipId}>
          <rect width="64" height="48" />
        </clipPath>
        <clipPath id={headClipId}>
          <path d={headOutline} />
        </clipPath>
        <clipPath id={pawClipId}>
          <rect width="64" height="52" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${faceClipId})`}>
        <g className={styles.reveal}>
          <g className={styles.body}>
            <path
              d={headOutline}
              fill="currentColor"
              className={styles.outline}
            />
            <g clipPath={`url(#${headClipId})`}>
              <path
                d="M8 46c1-9 5-17 11-18 5-1 8 2 10 6l2-12 1 10 4-11-1 13c3-6 8-8 12-5 6 3 8 10 9 17v5H8Z"
                className={styles.coat}
                stroke="none"
              />
            </g>
            <path
              d="M13 25c-1-6 0-14 2-14 2 0 5 6 7 10Zm31-3c2-5 5-10 7-9 2 2 2 8 0 14Z"
              className={styles.coat}
              stroke="none"
            />
            {isSleeping ? (
              <path d="M20 34q3 3 6 0m12 0q3 3 6 0" strokeWidth="1.6" />
            ) : (
              <>
                <g className={cn(styles.awakeEyes, styles.pupils)}>
                  <g className={styles.eyes} fill="currentColor" stroke="none">
                    <circle cx="23" cy="33" r="2.6" />
                    <circle cx="41" cy="33" r="2.6" />
                    <g className={styles.coat}>
                      <circle cx="22.3" cy="32.2" r=".7" />
                      <circle cx="40.3" cy="32.2" r=".7" />
                    </g>
                  </g>
                </g>
                <g className={styles.sunglasses} strokeWidth="1.2">
                  <path d="m13 29 4 2m12 0q3-2 6 0m12 0 4-2" />
                  <path
                    d="M17 30h12l-1 4.5c-.5 2-2 2.5-5 2.5s-4.5-.5-5-2.5Zm18 0h12l-1 4.5c-.5 2-2 2.5-5 2.5s-4.5-.5-5-2.5Z"
                    fill="currentColor"
                  />
                  <path
                    d="m21 31.5-1.5 2m19.5-2-1.5 2"
                    className={styles.lensShine}
                  />
                </g>
              </>
            )}
            <path
              d="M28 39c0-3 8-3 8 0 0 2-2 4-4 4s-4-2-4-4Z"
              fill="currentColor"
              stroke="none"
            />
            <path d="M32 43v4" />
          </g>
        </g>
      </g>
      <g clipPath={`url(#${pawClipId})`}>
        <g className={cn(styles.paws, styles.coat)}>
          <path
            className={styles.outline}
            d="M5 47c0-5 4-8 8-8 5 0 9 4 9 8 0 3-4 4-9 4s-8-1-8-4Zm37 0c0-4 4-8 9-8 4 0 8 3 8 8 0 3-3 4-8 4s-9-1-9-4Z"
          />
          <path d="M11 46v4m5-4v4m32-4v4m5-4v4" strokeWidth="1.1" />
        </g>
      </g>
      {isSleeping && (
        <g className={styles.sleepMarks} strokeWidth="1" fill="none">
          <path className={styles.sleepMark} d="M55 19h3l-3 3h3" />
          <path className={styles.sleepMark} d="M61 11h4l-4 4h4" />
          <path className={styles.sleepMark} d="M65 1h5l-5 5h5" />
        </g>
      )}
    </svg>
  );
}
