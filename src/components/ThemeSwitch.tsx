import React from 'react';
import { Icon } from '@iconify/react';
import { useTheme } from '@/contexts/ThemeProvider';

function ThemeIcon({ theme }: { theme: string }) {
  if (theme === 'dark') {
    return (
      <Icon
        icon="tabler:moon-filled"
        className="absolute bottom-0 right-[6px] top-0 m-[auto_0] text-xl text-black"
      />
    );
  } else {
    return (
      <Icon
        icon="tabler:sun-filled"
        className="absolute bottom-0 left-1 top-0 m-[auto_0] text-2xl text-white"
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
          className="absolute bottom-0 top-0 m-[auto_0] h-6 w-16 appearance-none rounded-full bg-white dark:bg-black py-4 after:absolute after:bottom-[0] after:left-1 after:top-[0] after:m-[auto_0] after:h-6 after:w-6 after:translate-x-0 after:rounded-full after:bg-primary-foreground after:duration-500 checked:after:h-6 checked:after:w-6 checked:after:translate-x-8 checked:after:rounded-full"
          onClick={setNewTheme}
        />
        <ThemeIcon theme={theme} />
      </button>
    </div>
  );
}

export default ThemeSwitch;
