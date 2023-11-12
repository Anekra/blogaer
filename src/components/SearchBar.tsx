'use client';

import { Icon } from '@iconify/react/dist/iconify.js';
import React, { useState } from 'react';

function SearchBar() {
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <div
      className={`
        ${searchFocused ? 'justify-end bg-primary-foreground rounded-xl' : ''} 
        flex relative items-center
      `}
    >
      <input
        type="text"
        placeholder="Search"
        className={`${searchFocused ? 'mr-10' : 'pl-10'}
          md:flex hidden rounded-xl md:w-40 transition-[width] focus:border-primary-foreground dark:focus:border-primary-foreground lg:focus:w-[420px] outline-none h-11 bg-background px-2 border border-gray-500`}
        onFocus={() => {
          setSearchFocused(true);
        }}
        onBlur={() => {
          setSearchFocused(false);
        }}
      />
      <button
        className={`${searchFocused ? '' : 'text-black/30'} 
          text-2xl absolute px-2 h-11 xs:rounded-[0_12px_12px_0] box-content`}
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
