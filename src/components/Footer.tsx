import Link from 'next/link';

import NowPlaying from './NowPlaying';

const navigation = {
  general: [
    { name: 'Home', title: 'Home Page', href: '/' },
    { name: 'About', title: 'About Page', href: '/about' },
    { name: 'Blog', title: 'Blog Page', href: '/blog' },
  ],
  extra: [
    {
      name: 'Source',
      title: 'View source code on Github',
      href: 'https://github.com/niteshseram/niteshseram.in',
    },
    {
      name: 'Resume',
      title: 'View my resume',
      href: 'https://drive.google.com/file/d/1uQxjmAY-mVyv-4F_oyrQitvzfCxVUka3/view',
    },
  ],
  social: [
    {
      name: 'Twitter',
      title: 'View Twitter',
      href: 'https://twitter.com/niteshseram',
    },
    {
      name: 'LinkedIn',
      title: 'View LinkedIn',
      href: 'https://linkedin.com/in/niteshseram',
    },
    {
      name: 'GitHub',
      title: 'View Github',
      href: 'https://github.com/niteshseram',
    },
  ],
};

const Footer = () => (
  <footer>
    <div className="border-t-2 border-gray-200 py-10 dark:border-gray-700">
      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2 md:grid md:grid-cols-2 md:gap-8">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">
              Pages
            </h3>
            <div role="list" className="mt-4 flex flex-col items-start">
              {navigation.general.map((item) => (
                <FooterLink
                  key={item.name}
                  name={item.name}
                  title={item.title}
                  href={item.href}
                />
              ))}
            </div>
          </div>
          <div className="mt-12 md:mt-0">
            <h3 className="text-sm font-semibold uppercase tracking-wider">
              Socials
            </h3>
            <div role="list" className="mt-4 flex flex-col items-start">
              {navigation.social.map((item) => (
                <FooterLink
                  key={item.name}
                  name={item.name}
                  title={item.title}
                  href={item.href}
                  newTab
                />
              ))}
            </div>
          </div>
        </div>
        <div className="md:grid md:grid-cols-1 md:gap-8">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">
              Extra
            </h3>
            <div role="list" className="mt-4 flex flex-col items-start">
              {navigation.extra.map((item) => (
                <FooterLink
                  key={item.name}
                  name={item.name}
                  title={item.title}
                  href={item.href}
                  newTab
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-12 flex flex-col items-start">
        <NowPlaying />
        <p className="text-base font-medium">
          &copy; {new Date().getFullYear()} Nitesh Seram
        </p>
      </div>
    </div>
  </footer>
);

interface FooterLinkProps {
  href: string;
  name: string;
  title?: string;
  newTab?: boolean;
}

const FooterLink = ({ href, name, title, newTab }: FooterLinkProps) => (
  <Link
    href={href}
    className="horizontal-underline mt-2 tracking-wide text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
    aria-label={name}
    title={title}
    {...(newTab && {
      target: '_blank',
      rel: 'noopener noreferrer',
    })}
  >
    {name}
  </Link>
);
export default Footer;
