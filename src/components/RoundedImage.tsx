'use client';
import clsx from 'clsx';
import Image from 'next/image';
import { type ComponentProps, useState } from 'react';

const RoundedImage = (props: ComponentProps<typeof Image>) => {
  const [isLoading, setLoading] = useState(true);

  return (
    <div
      className={clsx(
        "relative flex overflow-hidden rounded-lg after:pointer-events-none after:absolute after:inset-0 after:z-10 after:rounded-lg after:content-['']",
        isLoading ? 'animate-pulse bg-white/[2%]' : '',
      )}
    >
      <Image
        {...props}
        alt={props.alt}
        className={clsx(
          'rounded-lg duration-700 ease-in-out',
          isLoading
            ? 'scale-[1.02] blur-lg grayscale'
            : 'blur-0 scale-100 grayscale-0',
        )}
        onLoad={() => setLoading(false)}
      />
    </div>
  );
};

export default RoundedImage;
