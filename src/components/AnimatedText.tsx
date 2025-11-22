'use client';

import { useEffect, useState } from 'react';

const AnimatedText = ({ text }: { text: string }) => {
  const [randomizeText, setRandomizeText] = useState(text);
  const [isAnimating, setIsAnimating] = useState(true);
  const animatingTime = text.length * 100 > 1000 ? 1000 : text.length * 100;

  const generateGibberish = (index: number, timeElapsed: number) => {
    if (text[index] === ' ') return ' ';
    const characters =
      'A-B*CD_EF-GH_JK*LM-NOP_QRS*TU-VWX_YZa*bcd_ef-gh_jkm_nopq_rstu_vw-xyz_023_456*789_';

    const randomChar = Math.floor(Math.random() * characters.length);
    return Number(timeElapsed) >= Math.floor(Math.random() * animatingTime)
      ? text[index]
      : characters[randomChar];
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    setTimeout(() => {
      let timeElapsed = 0;
      interval = setInterval(() => {
        timeElapsed += 100;
        setRandomizeText(
          text
            .split('')
            .map((_, index: number) => generateGibberish(index, timeElapsed))
            .join(''),
        );
      }, 100);
    }, 50);

    setTimeout(() => {
      clearInterval(interval);
      setIsAnimating(false);
    }, animatingTime + 50);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  return <>{isAnimating ? randomizeText : text}</>;
};

export default AnimatedText;
