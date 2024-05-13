import React from 'react';
import ThemeIcon from './ThemeIcon';
import { useTheme } from 'next-themes';

export default function ThemeSwitch({
  className,
  darkIconClass,
  lightIconClass
}: {
  className: string;
  darkIconClass: string;
  lightIconClass: string;
}) {
  const { setTheme, resolvedTheme } = useTheme();

  return (
    <button onClick={()=>setTheme(resolvedTheme === 'light' ? 'dark' : 'light')}>
      <input
        type="checkbox"
        id="check"
        checked={resolvedTheme === 'dark'}
        onChange={() => {}}
        className={`${className}`}
      />
      <ThemeIcon
        theme={resolvedTheme}
        darkIconClass={darkIconClass}
        lightIconClass={lightIconClass}
      />
    </button>
  );
}
