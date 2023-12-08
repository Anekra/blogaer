import React from 'react';
import { Icon } from '@iconify/react';
import { useTheme } from '@/lib/contexts/ThemeProvider';

function ThemeIcon({ theme }: { theme: string }) {
  if (theme === 'dark') {
    return (
      <Icon
        icon="tabler:moon-filled"
        className="absolute inset-y-0 right-[6px] m-[auto_0] text-xl text-black"
      />
    );
  } else {
    return (
      <Icon
        icon="tabler:sun-filled"
        className="absolute inset-y-0 left-1 m-[auto_0] text-2xl text-white"
      />
    );
  }
}
function ThemeSwitch() {
  const { theme, setTheme } = useTheme();

  const setNewTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.theme = newTheme;
  };

  return (
    <div>
      <button onClick={setNewTheme}>
        <input
          type="checkbox"
          id="check"
          checked={theme === 'dark'}
          onChange={() => {}}
          className="absolute inset-y-0 m-[auto_0] h-6 w-16 appearance-none rounded-full bg-white py-4 after:absolute after:inset-y-[0] after:left-1 after:m-[auto_0] after:h-6 after:w-6 after:translate-x-0 after:rounded-full after:bg-primary-foreground after:duration-500 checked:after:h-6 checked:after:w-6 checked:after:translate-x-8 checked:after:rounded-full dark:bg-black"
          onClick={setNewTheme}
        />
        <ThemeIcon theme={theme} />
      </button>
    </div>
  );
}

export default ThemeSwitch;
