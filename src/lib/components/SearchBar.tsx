'use client';

import { Icon } from '@iconify/react/dist/iconify.js';
import React, { useRef, useState } from 'react';
import { Input } from './ui/input';

export default function SearchBar() {
  const searchRef = useRef<HTMLInputElement>(null);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  return (
    <div
      className="hv-bright relative flex items-center justify-end rounded-lg bg-primary-foreground  p-[2px] px-1"
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget))
          setIsSearchFocused(false);
      }}
    >
      <Input
        ref={searchRef}
        type="search"
        placeholder={`${isSearchFocused ? 'Search' : ''}`}
        className={`${
          isSearchFocused
            ? 'mr-10 flex bg-background md:w-[400px]'
            : 'w-9 bg-transparent'
        } h-fit rounded-lg border-none py-[6px] outline-none transition-all duration-300 focus-visible:ring-0`}
        onBlur={() => searchRef.current?.blur()}
      />
      <button
        className={`${
          isSearchFocused
            ? 'bg-transparent active:text-foreground'
            : 'bg-primary-foreground'
        } absolute box-content rounded-lg p-[6px] text-2xl text-primary`}
        onClick={() => {
          if (!isSearchFocused) {
            searchRef.current?.focus();
            setIsSearchFocused(true);
          }
        }}
      >
        <Icon icon="mingcute:search-2-fill" />
      </button>
    </div>
  );
}
