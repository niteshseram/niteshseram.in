'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { NAV_ITEMS } from '@/constants';

import AnimatedText from './AnimatedText';
import Logo from './Logo';
import ThemeSwitch from './ThemeSwitch';

const NavBar = () => {
  const pathname = usePathname();

  return (
    <nav className="sticky top-4 z-10 mx-auto flex w-[96vw] max-w-[44em] flex-col rounded-lg border border-secondary/20 bg-primary/10 p-[10px] backdrop-blur-[10px] backdrop-saturate-150 transition-all hover:shadow-dark sm:w-[96vw]">
      <div className="flex h-[40px] items-center justify-between bg-transparent py-5">
        <Link
          href="/"
          className="flex items-center justify-between"
          aria-label="Home"
        >
          <Logo />
        </Link>
        <div className="flex items-center gap-8 text-base leading-5">
          <div className="flex gap-8">
            {NAV_ITEMS.map((item, idx) => {
              const active = pathname === item.page;
              return (
                <Link
                  key={idx}
                  href={item.page}
                  className={clsx('horizontal-underline text-base', {
                    'horizontal-underline-active font-bold': active,
                  })}
                  aria-label={item.label}
                >
                  <span className="tracking-wide text-gray-900 dark:text-gray-100">
                    <AnimatedText text={item.label} />
                  </span>
                </Link>
              );
            })}
          </div>
          <ThemeSwitch />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
