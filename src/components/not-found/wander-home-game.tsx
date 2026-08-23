'use client';

import { useEffect, useReducer, useRef } from 'react';
import {
  PiArrowCounterClockwise,
  PiArrowDown,
  PiArrowLeft,
  PiArrowRight,
  PiArrowUp,
  PiDiamondFill,
  PiHouseSimpleFill,
} from 'react-icons/pi';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const MAZE = [
  '....#.....G',
  '.##.#.###..',
  '..F...#....',
  '###.###.#.#',
  '....#...F.#',
  '.##...##...',
  'S...#.....F',
] as const;

const START_POSITION: Position = { column: 0, row: 6 };

const DIRECTION_OFFSETS: Record<Direction, Position> = {
  down: { column: 0, row: 1 },
  left: { column: -1, row: 0 },
  right: { column: 1, row: 0 },
  up: { column: 0, row: -1 },
};

const KEY_DIRECTIONS: Partial<Record<string, Direction>> = {
  ArrowDown: 'down',
  ArrowLeft: 'left',
  ArrowRight: 'right',
  ArrowUp: 'up',
  a: 'left',
  d: 'right',
  s: 'down',
  w: 'up',
};

const FRAGMENT_KEYS = MAZE.flatMap((row, rowIndex) =>
  Array.from(row).flatMap((cell, columnIndex) =>
    cell === 'F' ? [positionKey({ column: columnIndex, row: rowIndex })] : [],
  ),
);

type Direction = 'down' | 'left' | 'right' | 'up';

type Position = Readonly<{
  column: number;
  row: number;
}>;

type GameState = Readonly<{
  announcement: string;
  collectedFragmentKeys: readonly string[];
  moves: number;
  phase: 'playing' | 'won';
  playerPosition: Position;
}>;

type GameAction =
  | Readonly<{ direction: Direction; type: 'move' }>
  | Readonly<{ type: 'reset' }>;

type PointerStart = Readonly<{
  pointerId: number;
  x: number;
  y: number;
}>;

const INITIAL_GAME_STATE: GameState = {
  announcement: '',
  collectedFragmentKeys: [],
  moves: 0,
  phase: 'playing',
  playerPosition: START_POSITION,
};

export function WanderHomeGame() {
  const [gameState, dispatch] = useReducer(gameReducer, INITIAL_GAME_STATE);
  const pointerStartRef = useRef<PointerStart | null>(null);
  const collectedCount = gameState.collectedFragmentKeys.length;
  const hasWon = gameState.phase === 'won';
  const statusMessage = hasWon
    ? `Made it home in ${formatMoveCount(gameState.moves)}.`
    : gameState.announcement ||
      'Use arrow keys or WASD anywhere. You can also swipe.';

  useEffect(() => {
    function handleWindowKeyDown(event: KeyboardEvent) {
      if (event.altKey || event.ctrlKey || event.metaKey) {
        return;
      }

      const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
      const direction = KEY_DIRECTIONS[key];

      if (direction == null || isEditableTarget(event.target)) {
        return;
      }

      event.preventDefault();
      dispatch({ direction, type: 'move' });
    }

    window.addEventListener('keydown', handleWindowKeyDown);
    return () => window.removeEventListener('keydown', handleWindowKeyDown);
  }, []);

  function move(direction: Direction) {
    dispatch({ direction, type: 'move' });
  }

  function reset() {
    dispatch({ type: 'reset' });
  }

  function handlePointerDown(event: React.PointerEvent<HTMLDivElement>) {
    pointerStartRef.current = {
      pointerId: event.pointerId,
      x: event.clientX,
      y: event.clientY,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function handlePointerUp(event: React.PointerEvent<HTMLDivElement>) {
    const pointerStart = pointerStartRef.current;
    pointerStartRef.current = null;

    if (pointerStart == null || pointerStart.pointerId !== event.pointerId) {
      return;
    }

    const dx = event.clientX - pointerStart.x;
    const dy = event.clientY - pointerStart.y;
    const swipeThreshold = 24;

    if (Math.max(Math.abs(dx), Math.abs(dy)) < swipeThreshold) {
      return;
    }

    if (Math.abs(dx) > Math.abs(dy)) {
      move(dx > 0 ? 'right' : 'left');
      return;
    }

    move(dy > 0 ? 'down' : 'up');
  }

  function handlePointerCancel() {
    pointerStartRef.current = null;
  }

  return (
    <section
      aria-labelledby="wander-home-title"
      className={cn('mt-10', 'rounded-2xl', 'bg-surface')}
    >
      <div
        className={cn(
          'flex items-start justify-between gap-4',
          'px-4 pt-4 sm:px-5 sm:pt-5',
        )}
      >
        <div>
          <h2
            id="wander-home-title"
            className={cn('type-section-title font-medium', 'text-foreground')}
          >
            Lost in the grid
          </h2>
          <p
            id="wander-home-instructions"
            className={cn(
              'mt-1',
              'text-sm leading-relaxed',
              'text-muted-foreground',
            )}
          >
            Collect the fragments, then find home.
          </p>
        </div>
        <Button
          addonPosition="start"
          className={cn('shrink-0', 'bg-background')}
          icon={<PiArrowCounterClockwise />}
          label="Reset"
          onClick={reset}
          size="xs"
          variant="ghost"
        />
      </div>

      <div
        className={cn(
          'flex items-center justify-between gap-3',
          'px-4 pt-4 sm:px-5',
          'font-mono text-[0.6875rem] uppercase tracking-[0.12em]',
          'text-muted-foreground',
        )}
      >
        <span>
          Fragments {collectedCount}/{FRAGMENT_KEYS.length}
        </span>
        <span>{formatMoveCount(gameState.moves)}</span>
      </div>

      <div
        aria-describedby="wander-home-instructions"
        aria-label={`Maze game. ${collectedCount} of ${FRAGMENT_KEYS.length} fragments collected. ${formatMoveCount(gameState.moves)}.`}
        className={cn(
          'grid aspect-[11/7] grid-cols-[repeat(11,minmax(0,1fr))] grid-rows-[repeat(7,minmax(0,1fr))] gap-1 overflow-hidden',
          'mx-3 mt-3 p-2 sm:mx-4 sm:p-3',
          'rounded-xl',
          'bg-background',
          'touch-none select-none',
        )}
        onPointerCancel={handlePointerCancel}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        role="group"
      >
        {MAZE.flatMap((row, rowIndex) =>
          Array.from(row).map((cell, columnIndex) => {
            const position = { column: columnIndex, row: rowIndex };
            const key = positionKey(position);
            const hasPlayer = positionsMatch(
              position,
              gameState.playerPosition,
            );
            const isCollected = gameState.collectedFragmentKeys.includes(key);
            const isGoal = cell === 'G';

            return (
              <div
                aria-hidden="true"
                className={cn(
                  'relative grid min-w-0 place-items-center',
                  'rounded-[0.3rem]',
                  cell === '#' ? 'bg-foreground/[0.075]' : 'bg-transparent',
                )}
                key={key}
              >
                {isGoal && (
                  <PiHouseSimpleFill
                    className={cn(
                      'absolute size-[46%]',
                      collectedCount === FRAGMENT_KEYS.length
                        ? 'text-brand'
                        : 'text-muted-foreground/45',
                    )}
                  />
                )}
                {cell === 'F' && !isCollected && (
                  <PiDiamondFill
                    className={cn('absolute size-[34%]', 'text-brand')}
                  />
                )}
                {hasPlayer && (
                  <span
                    className={cn(
                      'absolute z-10 grid size-[76%] place-items-center',
                      'rounded-[0.35rem] shadow-sm',
                      hasWon &&
                        'ring-2 ring-brand/30 ring-offset-2 ring-offset-background',
                      'font-mono text-[clamp(0.42rem,1.6vw,0.7rem)] font-semibold leading-none',
                      'bg-brand text-brand-foreground',
                    )}
                  >
                    404
                  </span>
                )}
              </div>
            );
          }),
        )}
      </div>

      <div
        className={cn(
          'flex flex-col items-center gap-3 sm:flex-row sm:justify-between',
          'px-4 py-4 sm:px-5 sm:py-5',
        )}
      >
        <p
          aria-live="polite"
          className={cn(
            'min-h-5',
            'text-center text-sm leading-relaxed sm:text-left',
            hasWon ? 'font-medium text-brand' : 'text-muted-foreground',
          )}
        >
          {statusMessage}
        </p>

        <div
          aria-label="Maze controls"
          className={cn(
            'grid shrink-0 grid-cols-3 grid-rows-2 gap-1',
            'sm:ml-auto',
          )}
          role="group"
        >
          <span aria-hidden="true" className="size-10" />
          <Button
            disabled={hasWon || !canMove(gameState.playerPosition, 'up')}
            icon={<PiArrowUp />}
            isLabelHidden={true}
            label="Move up"
            onClick={() => move('up')}
            size="lg"
            tooltip="Move up"
            variant="outline"
          />
          <span aria-hidden="true" className="size-10" />
          <Button
            disabled={hasWon || !canMove(gameState.playerPosition, 'left')}
            icon={<PiArrowLeft />}
            isLabelHidden={true}
            label="Move left"
            onClick={() => move('left')}
            size="lg"
            tooltip="Move left"
            variant="outline"
          />
          <Button
            disabled={hasWon || !canMove(gameState.playerPosition, 'down')}
            icon={<PiArrowDown />}
            isLabelHidden={true}
            label="Move down"
            onClick={() => move('down')}
            size="lg"
            tooltip="Move down"
            variant="outline"
          />
          <Button
            disabled={hasWon || !canMove(gameState.playerPosition, 'right')}
            icon={<PiArrowRight />}
            isLabelHidden={true}
            label="Move right"
            onClick={() => move('right')}
            size="lg"
            tooltip="Move right"
            variant="outline"
          />
        </div>
      </div>
    </section>
  );
}

function gameReducer(state: GameState, action: GameAction): GameState {
  if (action.type === 'reset') {
    return INITIAL_GAME_STATE;
  }

  if (state.phase === 'won') {
    return state;
  }

  const nextPosition = positionAfterMove(
    state.playerPosition,
    action.direction,
  );
  const nextCell = getCell(nextPosition);

  if (nextCell == null || nextCell === '#') {
    return {
      ...state,
      announcement: 'That way is blocked.',
    };
  }

  const nextPositionKey = positionKey(nextPosition);
  const foundNewFragment =
    nextCell === 'F' && !state.collectedFragmentKeys.includes(nextPositionKey);
  const collectedFragmentKeys = foundNewFragment
    ? [...state.collectedFragmentKeys, nextPositionKey]
    : state.collectedFragmentKeys;
  const remainingFragments =
    FRAGMENT_KEYS.length - collectedFragmentKeys.length;
  const hasWon = nextCell === 'G' && remainingFragments === 0;

  let announcement = '';

  if (hasWon) {
    announcement = `You found home in ${formatMoveCount(state.moves + 1)}.`;
  } else if (foundNewFragment) {
    announcement = `Page fragment collected. ${remainingFragments} remaining.`;
  } else if (nextCell === 'G') {
    announcement = `${remainingFragments} page fragment${remainingFragments === 1 ? '' : 's'} still missing.`;
  } else {
    announcement = `Moved ${action.direction}. ${formatMoveCount(state.moves + 1)}.`;
  }

  return {
    announcement,
    collectedFragmentKeys,
    moves: state.moves + 1,
    phase: hasWon ? 'won' : 'playing',
    playerPosition: nextPosition,
  };
}

function getCell(position: Position) {
  return MAZE[position.row]?.[position.column];
}

function formatMoveCount(moveCount: number) {
  return `${moveCount} ${moveCount === 1 ? 'move' : 'moves'}`;
}

function canMove(position: Position, direction: Direction) {
  const nextCell = getCell(positionAfterMove(position, direction));
  return nextCell != null && nextCell !== '#';
}

function isEditableTarget(target: EventTarget | null) {
  return (
    target instanceof HTMLElement &&
    (target.isContentEditable ||
      target instanceof HTMLInputElement ||
      target instanceof HTMLSelectElement ||
      target instanceof HTMLTextAreaElement)
  );
}

function positionAfterMove(position: Position, direction: Direction) {
  const offset = DIRECTION_OFFSETS[direction];
  return {
    column: position.column + offset.column,
    row: position.row + offset.row,
  };
}

function positionKey(position: Position) {
  return `${position.column}:${position.row}`;
}

function positionsMatch(firstPosition: Position, secondPosition: Position) {
  return (
    firstPosition.column === secondPosition.column &&
    firstPosition.row === secondPosition.row
  );
}
