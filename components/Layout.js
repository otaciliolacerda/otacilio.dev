/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { getSiteMetaData } from 'utils/helpers';
import { DarkModeSwitch } from 'react-toggle-dark-mode';

const { title } = getSiteMetaData();

function Header() {
  const { setTheme, resolvedTheme } = useTheme();
  const { pathname } = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const toggleDarkMode = checked => {
    const isDarkMode = checked;

    if (isDarkMode) setTheme('dark');
    else setTheme('light');
  };

  const isRoot = pathname === '/';
  const isDarkMode = resolvedTheme === 'dark';

  return (
    <header
      className={clsx('flex items-center justify-between ', {
        'mb-8': isRoot,
        'mb-2': !isRoot,
      })}
    >
      <div className="max-w-md">{isRoot ? <LargeTitle /> : <SmallTitle />}</div>
      {mounted && <DarkModeSwitch checked={isDarkMode} onChange={toggleDarkMode} className={isRoot ? 28 : 24} />}
    </header>
  );
}

function LargeTitle() {
  return (
    <h1>
      <Link href="/">
        <a
          className={clsx(
            'text-3xl font-black leading-none text-black no-underline font-display',
            'sm:text-5xl',
            'dark:text-white'
          )}
        >
          {title}
        </a>
      </Link>
    </h1>
  );
}

function SmallTitle() {
  return (
    <h1>
      <Link href="/">
        <a className={clsx('text-2xl font-black text-black no-underline font-display', 'dark:text-white')}>{title}</a>
      </Link>
    </h1>
  );
}

function Layout({ children }) {
  return (
    <div className="w-full min-h-screen dark:bg-gray-700 dark:text-white">
      <div className="max-w-screen-sm px-4 py-12 mx-auto antialiased font-body">
        <Header />
        <main>{children}</main>
        <footer className="text-lg font-light" />
      </div>
    </div>
  );
}

export default Layout;
