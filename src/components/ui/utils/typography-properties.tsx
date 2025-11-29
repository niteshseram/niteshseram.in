import clsx from 'clsx';
import { useEffect, useState } from 'react';

export function TypographyProperties({
  elementRef,
  className = 'flex gap-8',
}: {
  elementRef: React.RefObject<HTMLElement | null>;
  className?: string;
}) {
  const [typography, setTypography] = useState<{
    fontSize: number;
    letterSpacing: string;
    lineHeight: number;
  }>({ fontSize: 0, letterSpacing: 'normal', lineHeight: 0 });

  useEffect(() => {
    const headingEl = elementRef.current;
    if (headingEl == null) {
      return;
    }

    const headingElStyle = window.getComputedStyle(headingEl);
    const baseFontSize = parseInt(
      window.getComputedStyle(document.documentElement).fontSize,
      10,
    );
    setTypography({
      fontSize: parseInt(headingElStyle.fontSize, 10) / baseFontSize,
      letterSpacing: headingElStyle.letterSpacing,
      lineHeight: parseInt(headingElStyle.lineHeight, 10) / baseFontSize,
    });
  }, [elementRef]);

  const properties = [
    { name: 'Font Size', value: typography.fontSize, unit: 'rem' },
    { name: 'Line Height', value: typography.lineHeight, unit: 'rem' },
    typography.letterSpacing !== 'normal'
      ? { name: 'Letter Spacing', value: typography.letterSpacing, unit: '' }
      : null,
  ].flatMap((i) => (i != null ? [i] : []));

  return (
    <div className={clsx('text-muted-foreground flex', className)}>
      {properties.map((prop) => (
        <div key={prop.name}>
          {prop.name}: {prop.value}
          {prop.unit}
        </div>
      ))}
    </div>
  );
}
