'use client';

import { animate, useInView, useReducedMotion } from 'motion/react';
import {
  Children,
  cloneElement,
  createContext,
  isValidElement,
  use,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  type ReactNode,
} from 'react';

import { cn } from '@/lib/utils';

type TypingState = {
  displayed: string;
  hasStarted: boolean;
};

type TypingAction =
  | { type: 'start' }
  | { type: 'progress'; value: string }
  | { type: 'finish'; value: string };

function typingReducer(state: TypingState, action: TypingAction): TypingState {
  switch (action.type) {
    case 'start':
      return { ...state, hasStarted: true };
    case 'progress':
      return { ...state, displayed: action.value };
    case 'finish':
      return { hasStarted: true, displayed: action.value };
  }
}

const INITIAL_TYPING_STATE: TypingState = { displayed: '', hasStarted: false };

const StartGateContext = createContext<boolean | null>(null);

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
  const ref = useRef<HTMLSpanElement>(null);
  const ownInView = useInView(ref, { once: true, amount: 0.3 });
  const gateSignal = use(StartGateContext);
  const shouldStart =
    gateSignal !== null ? gateSignal : !startOnView || ownInView;
  const prefersReducedMotion = useReducedMotion();

  const [state, dispatch] = useReducer(typingReducer, INITIAL_TYPING_STATE);
  const { displayed, hasStarted } = state;
  const isDone = displayed === children;

  useEffect(() => {
    if (!shouldStart) {
      return;
    }
    if (prefersReducedMotion) {
      dispatch({ type: 'finish', value: children });
      return;
    }
    let controls: ReturnType<typeof animate> | null = null;
    const timer = setTimeout(() => {
      dispatch({ type: 'start' });
      controls = animate(0, children.length, {
        duration: (children.length * duration) / 1000,
        ease: 'linear',
        onUpdate: (value) =>
          dispatch({
            type: 'progress',
            value: children.substring(0, Math.floor(value)),
          }),
        onComplete: () => dispatch({ type: 'progress', value: children }),
      });
    }, delay);
    return () => {
      clearTimeout(timer);
      controls?.stop();
    };
  }, [shouldStart, children, duration, delay, prefersReducedMotion]);

  const showCursor = hasStarted && (!isDone || keepCursor);

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
  const inView = useInView(containerRef, { once: true, amount: 0.4 });
  const shouldStart = !startOnView || inView;

  const sequencedChildren = useMemo(() => {
    if (!sequence) {
      return children;
    }
    let accumulated = 0;
    return Children.map(children, (child) => {
      if (!isValidElement<TypingAnimationProps>(child)) {
        return child;
      }
      const text =
        typeof child.props.children === 'string' ? child.props.children : '';
      const childDuration = child.props.duration ?? 40;
      const thisDelay = accumulated;
      accumulated += text.length * childDuration;
      return cloneElement(child, { ...child.props, delay: thisDelay });
    });
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
        <code className="grid gap-y-0">{sequencedChildren}</code>
      </pre>
    </div>
  );

  if (!sequence) {
    return content;
  }

  return (
    <StartGateContext.Provider value={shouldStart}>
      {content}
    </StartGateContext.Provider>
  );
}

export function TerminalCursor() {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'ml-1 inline-block h-4 w-1.5 align-middle',
        'bg-brand',
        'animate-blink',
      )}
    />
  );
}
