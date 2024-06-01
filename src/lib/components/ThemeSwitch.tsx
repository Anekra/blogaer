import React from 'react';
import ThemeIcon from './ThemeIcon';

export default function ThemeSwitch({
  className,
  darkIconClass,
  lightIconClass,
  setTheme, 
  resolvedTheme
}: {
  className: string;
  darkIconClass: string;
  lightIconClass: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
  resolvedTheme: string | undefined;
}) {

  return (
    <button
      className="cursor-pointer"
      onClick={() => setTheme(resolvedTheme === 'light' ? 'dark' : 'light')}
    >
      <input
        type="checkbox"
        id="check"
        checked={resolvedTheme === 'dark'}
        onChange={() => setTheme(resolvedTheme === 'light' ? 'dark' : 'light')}
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
