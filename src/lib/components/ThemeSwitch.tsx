import React from 'react';
import { useTheme } from '@/lib/contexts/ThemeProvider';
import ThemeIcon from './ThemeIcon';

export default function ThemeSwitch({
  className,
  darkIconClass,
  lightIconClass
}: {
  className: string;
  darkIconClass: string;
  lightIconClass: string;
}) {
  const { theme, setTheme } = useTheme();

  const setNewTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.theme = newTheme;
  };

  return (
    <button onClick={setNewTheme}>
      <input
        type="checkbox"
        id="check"
        checked={theme === 'dark'}
        onChange={() => {}}
        className={`${className}`}
        onClick={setNewTheme}
      />
      <ThemeIcon theme={theme} darkIconClass={darkIconClass} lightIconClass={lightIconClass} />
    </button>
  );
}