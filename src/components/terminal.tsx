'use client';

import {
  Children,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from 'react';

import { cn } from '@/lib/utils';

type SequenceContextValue = {
  completeItem: (index: number) => void;
  activeIndex: number;
  sequenceStarted: boolean;
};

const SequenceContext = createContext<SequenceContextValue | null>(null);
const ItemIndexContext = createContext<number | null>(null);

function useInView(ref: RefObject<Element | null>, threshold = 0.3): boolean {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, threshold]);
  return inView;
}

type TypingAnimationProps = {
  children: string;
  className?: string;
  duration?: number;
  delay?: number;
  startOnView?: boolean;
  keepCursor?: boolean;
};

export function TypingAnimation({
  children,
  className,
  duration = 40,
  delay = 0,
  startOnView = true,
  keepCursor = false,
}: TypingAnimationProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(ref);
  const [displayed, setDisplayed] = useState('');
  const [started, setStarted] = useState(false);
  const sequence = useContext(SequenceContext);
  const itemIndex = useContext(ItemIndexContext);
  const hasSequence = sequence !== null;
  const sequenceStarted = sequence?.sequenceStarted ?? false;
  const sequenceActiveIndex = sequence?.activeIndex ?? null;

  // Hold sequence access in refs so the typing interval below doesn't re-run
  // (and restart from i=0) every time the parent sequence advances.
  const completeItemRef = useRef<SequenceContextValue['completeItem'] | null>(
    null,
  );
  const itemIndexRef = useRef<number | null>(null);
  useEffect(() => {
    completeItemRef.current = sequence?.completeItem ?? null;
    itemIndexRef.current = itemIndex;
  }, [sequence, itemIndex]);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null;
    if (hasSequence && itemIndex !== null) {
      if (sequenceStarted && !started && sequenceActiveIndex === itemIndex) {
        setStarted(true);
      }
    } else if (!startOnView || isInView) {
      timer = setTimeout(() => setStarted(true), delay);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [
    hasSequence,
    itemIndex,
    sequenceStarted,
    sequenceActiveIndex,
    startOnView,
    isInView,
    started,
    delay,
  ]);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const interval = setInterval(() => {
      if (i < children.length) {
        setDisplayed(children.substring(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
        const complete = completeItemRef.current;
        const idx = itemIndexRef.current;
        if (complete && idx !== null) complete(idx);
      }
    }, duration);
    return () => clearInterval(interval);
  }, [started, children, duration]);

  const showCursor =
    started && (displayed.length < children.length || keepCursor);

  return (
    <span ref={ref} className={className}>
      {displayed}
      {showCursor && <TerminalCursor />}
    </span>
  );
}

type TerminalProps = {
  children: ReactNode;
  className?: string;
  title?: string;
  sequence?: boolean;
  startOnView?: boolean;
};

export function Terminal({
  children,
  className,
  title = 'nitesh.config.ts',
  sequence = true,
  startOnView = true,
}: TerminalProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef);
  const [activeIndex, setActiveIndex] = useState(0);
  const sequenceStarted = sequence ? !startOnView || isInView : false;

  const contextValue = useMemo<SequenceContextValue | null>(() => {
    if (!sequence) return null;
    return {
      completeItem: (index) => {
        setActiveIndex((current) =>
          index === current ? current + 1 : current,
        );
      },
      activeIndex,
      sequenceStarted,
    };
  }, [sequence, activeIndex, sequenceStarted]);

  const wrappedChildren = useMemo(() => {
    if (!sequence) return children;
    return Children.toArray(children).map((child, index) => (
      <ItemIndexContext.Provider key={index} value={index}>
        {child}
      </ItemIndexContext.Provider>
    ));
  }, [children, sequence]);

  const content = (
    <div
      ref={containerRef}
      className={cn(
        'overflow-hidden',
        'rounded-xl border border-input/60',
        'bg-code',
        className,
      )}
    >
      <div
        className={cn(
          'flex items-center justify-between',
          'px-4 py-3',
          'border-b border-input/60',
          'bg-code-bar',
        )}
      >
        <div className="flex items-center gap-x-1.5">
          <span
            aria-hidden="true"
            className="size-2 rounded-full bg-[#FF5F57]"
          />
          <span
            aria-hidden="true"
            className="size-2 rounded-full bg-[#FEBC2E]"
          />
          <span
            aria-hidden="true"
            className="size-2 rounded-full bg-[#28C840]"
          />
        </div>
        <span className="font-mono text-xs text-muted-foreground">{title}</span>
      </div>

      <pre
        className={cn(
          'p-5 overflow-x-auto',
          'font-mono text-[12.5px] leading-6',
          'text-code-foreground',
        )}
      >
        <code className="grid gap-y-0">{wrappedChildren}</code>
      </pre>
    </div>
  );

  if (!sequence) return content;

  return (
    <SequenceContext.Provider value={contextValue}>
      {content}
    </SequenceContext.Provider>
  );
}

export function TerminalCursor() {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'ml-1 inline-block h-3 w-1.5 align-middle',
        'bg-brand',
        'animate-blink',
      )}
    />
  );
}
