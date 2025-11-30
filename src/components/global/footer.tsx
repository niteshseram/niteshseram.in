import clsx from 'clsx';

import { Anchor } from '@/components/ui/anchor';
import { Container } from '@/components/ui/container';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <Container
        className={clsx(
          'flex flex-col items-center justify-between gap-6 md:flex-row',
          'py-6',
          'border-border/30 border-t',
        )}
      >
        <p className="text-muted-foreground text-sm">
          &copy; {currentYear} Nitesh Seram
        </p>
        <p className="text-muted-foreground text-sm">
          The source code is available on{' '}
          <Anchor href="https://github.com/niteshseram/niteshseram.in">
            GitHub
          </Anchor>
          .
        </p>
      </Container>
    </footer>
  );
}
