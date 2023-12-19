import React from 'react';
import { Icon } from '@iconify/react';
import { useTheme } from '@/lib/contexts/ThemeProvider';

function ThemeIcon({
  theme,
  darkIconClass,
  lightIconClass
}: {
  theme: string;
  darkIconClass: string;
  lightIconClass: string;
}) {
  if (theme === 'dark') {
    return (
      <Icon
        icon="tabler:moon-filled"
        className={`${darkIconClass} absolute inset-y-0 right-[6px] m-[auto_0] text-black`}
      />
    );
  } else {
    return (
      <Icon
        icon="tabler:sun-filled"
        className={`${lightIconClass} absolute inset-y-0 left-1 m-[auto_0] text-white`}
      />
    );
  }
}

function ThemeSwitch({
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

export default ThemeSwitch;
