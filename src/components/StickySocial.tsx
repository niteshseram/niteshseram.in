'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import React from 'react';

import { SOCIAL } from '@/constants';

import FadeUp from './animations/FadeUp';

const StickySocial = () => {
  return (
    <div className="fixed top-[50%] hidden translate-y-[-104px] flex-col items-center gap-12 lg:right-[20px] lg:flex xl:right-[40px]">
      {SOCIAL.map((social, idx) => (
        <FadeUp duration={0.6} delay={0.2 * idx} key={idx}>
          <Link
            aria-label={social.label}
            href={social.href}
            target="_blank"
            title={social.label}
            className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-solid border-secondary/50 text-gray-500 transition hover:border-secondary hover:text-gray-900 dark:border-primary/50 dark:text-slate-500 dark:hover:border-primary dark:hover:text-light"
          >
            <motion.div
              className="logo"
              whileHover={{ rotate: 360, scale: 1.2 }}
              transition={{ duration: 0.25 }}
            >
              {React.createElement(social.icon, {
                className: 'h-8 w-8 pointer-events-auto p-2',
              })}
            </motion.div>
          </Link>
        </FadeUp>
      ))}
    </div>
  );
};

export default StickySocial;
