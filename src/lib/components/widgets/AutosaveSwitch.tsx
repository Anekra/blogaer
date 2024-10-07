import { useContent } from '@/lib/contexts/ContentContext';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function AutosaveSwitch() {
  const currentPath = usePathname();
  const { isDoneEditing } = useContent();
  const [isOn, setIsOn] = useState(true);

  useEffect(() => {
    const autosave = localStorage.getItem('autosave');
    if (autosave) setIsOn(JSON.parse(autosave) === true);
  }, [isOn]);

  return (
    <div className="flex grow justify-between">
      <div className="flex items-center gap-2 text-xs">
        <div className="group flex h-8 items-center">
          <label
            htmlFor="autosave-switch"
            className={`px-1 hover:cursor-pointer group-hover:text-primary-foreground${
              isOn ? ' text-primary-foreground' : ' text-accent'
            }`}
          >
            Autosave
          </label>
          <div className="switch-container group-hover:neu-base-inset w-[58px] bg-base-background group-hover:bg-accent">
            <input
              id="autosave-switch"
              type="checkbox"
              className="absolute left-0 z-[1] h-full w-full appearance-none rounded-full hover:cursor-pointer"
              checked={isOn}
              onChange={(e) => {
                setIsOn(e.target.checked);
                localStorage.setItem('autosave', `${e.target.checked}`);
              }}
            />
            <span
              className={`switch-toggle group-hover:neu-base p-1 text-base-background hover:text-accent group-hover:!bg-primary-foreground${
                isOn ? ' translate-x-full' : ' translate-x-0 !bg-accent'
              }`}
            >
              {isOn ? 'On' : 'Off'}
            </span>
          </div>
        </div>
        {currentPath !== '/blog/post/create' && (
          <p
            className={`w-full whitespace-nowrap${
              isDoneEditing ? '' : ' dots-loading'
            }`}
          >
            {isDoneEditing ? 'saved in draft' : 'saving'}
          </p>
        )}
      </div>
      {!isOn && <button className="btn-outline-base">Save to draft</button>}
    </div>
  );
}