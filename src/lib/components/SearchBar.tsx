'use client';

import { Icon } from '@iconify/react/dist/iconify.js';
import React, { useRef, useState } from 'react';

export default function SearchBar() {
  const searchRef = useRef<HTMLInputElement>(null);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  return (
    <div
      className="relative flex items-center justify-end rounded-lg bg-primary-foreground p-[2px]"
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget))
          setIsSearchFocused(false);
      }}
    >
      <input
        ref={searchRef}
        type="text"
        placeholder={`${isSearchFocused ? 'Search' : ''}`}
        className={`${
          isSearchFocused
            ? 'mr-9 flex bg-background md:w-[400px]'
            : 'w-9 bg-transparent'
        } rounded-lg p-[6px] outline-none transition-all duration-300`}
        onBlur={() => searchRef.current?.blur()}
      />
      <button
        className={`${
          isSearchFocused ? 'bg-transparent active:text-foreground' : 'bg-primary-foreground'
        } absolute box-content rounded-lg p-[6px] text-2xl text-primary`}
        onClick={() => {
          if (!isSearchFocused) {
            searchRef.current?.focus();
            setIsSearchFocused(true);
          }
          console.log('test');
        }}
      >
        <Icon icon="mingcute:search-2-fill" />
      </button>
    </div>
  );
}
