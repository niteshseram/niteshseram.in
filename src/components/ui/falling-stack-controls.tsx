import {
  PiArrowCounterClockwise,
  PiDeviceMobile,
  PiDeviceMobileSlash,
  PiSpeakerHigh,
  PiSpeakerSlash,
} from 'react-icons/pi';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type Props = Readonly<{
  muted: boolean;
  tiltSupported: boolean;
  tiltEnabled: boolean;
  onReset: () => void;
  onToggleMute: () => void;
  onToggleTilt: () => void;
}>;

export function FallingStackControls({
  muted,
  tiltSupported,
  tiltEnabled,
  onReset,
  onToggleMute,
  onToggleTilt,
}: Props) {
  return (
    <div
      className={cn('absolute top-3 right-3 z-10', 'flex items-center gap-1.5')}
    >
      {tiltSupported ? (
        <Button
          icon={tiltEnabled ? <PiDeviceMobile /> : <PiDeviceMobileSlash />}
          isLabelHidden
          label={tiltEnabled ? 'Disable tilt & shake' : 'Enable tilt & shake'}
          onClick={onToggleTilt}
          size="xs"
          variant="outline"
          className="bg-background/80 backdrop-blur"
        />
      ) : null}
      <Button
        icon={muted ? <PiSpeakerSlash /> : <PiSpeakerHigh />}
        isLabelHidden
        label={muted ? 'Unmute audio' : 'Mute audio'}
        onClick={onToggleMute}
        size="xs"
        variant="outline"
        className="bg-background/80 backdrop-blur"
      />
      <Button
        icon={<PiArrowCounterClockwise />}
        isLabelHidden
        label="Reset"
        onClick={onReset}
        size="xs"
        variant="outline"
        className="bg-background/80 backdrop-blur"
      />
    </div>
  );
}
