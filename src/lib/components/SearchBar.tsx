'use client';

import { Icon } from '@iconify/react/dist/iconify.js';
import React, { useState } from 'react';

function SearchBar() {
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <div
      className={`
        ${searchFocused ? 'justify-end rounded-xl bg-primary-foreground' : ''} 
        relative flex items-center
      `}
    >
      <input
        type="text"
        placeholder="Search"
        className={`${searchFocused ? 'mr-10' : 'pl-10'}
          hidden h-11 rounded-xl border border-gray-500 bg-background px-2 outline-none transition-[width] focus:border-primary-foreground dark:focus:border-primary-foreground md:flex md:w-40 lg:focus:w-[420px]`}
        onFocus={() => {
          setSearchFocused(true);
        }}
        onBlur={() => {
          setSearchFocused(false);
        }}
      />
      <button
        className={`${searchFocused ? '' : 'text-black/30'} 
          absolute box-content h-11 px-2 text-2xl xs:rounded-[0_12px_12px_0]`}
      >
        <Icon
          icon="ic:baseline-search"
          className={`
            ${searchFocused ? 'text-background' : 'text-gray-500'}
            text-2xl
          `}
        />
      </button>
    </div>
  );
}

export default SearchBar;
