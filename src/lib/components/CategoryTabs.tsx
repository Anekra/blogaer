'use client';
import React, { useRef, useState } from 'react';
import { CATEGORIES } from '../constants';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function CategoryTabs() {
  const [scrollValue, setScrollValue] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollEl = scrollRef.current;
  const maxScroll = (scrollEl?.scrollWidth || 0) - (scrollEl?.clientWidth || 0);

  return (
    <div className="relative h-16 pt-3">
      <div
        className={`${
          scrollValue === 0 ? 'opacity-0' : 'opacity-100'
        } absolute left-0 z-[1] flex h-9 w-auto bg-gradient-to-r from-background via-background/60 to-transparent pe-20`}
      >
        <button
          onClick={() => {
            if (scrollEl) {
              scrollEl.scrollLeft -= 100;
            }
          }}
        >
          <ChevronLeft />
        </button>
      </div>
      <div
        ref={scrollRef}
        className="absolute inset-0 flex flex-nowrap gap-2 overflow-x-hidden scroll-smooth pt-3 hover:overflow-x-auto"
        onScroll={() => setScrollValue(scrollEl?.scrollLeft || 0)}
      >
        <button className="btn-s-solid-b">test</button>
        {CATEGORIES.filter((_, i) => i < 15).map((e, i) => {
          return (
            <button key={i} className="btn-s-translucent-b">
              {e}
            </button>
          );
        })}
      </div>
      <div
        className={`${
          maxScroll === scrollValue ? 'opacity-0' : 'opacity-100'
        } absolute right-0 z-[1] flex h-9 w-auto items-center bg-gradient-to-l from-background via-background/60 to-transparent ps-20`}
      >
        <button
          onClick={() => {
            if (scrollEl) {
              scrollEl.scrollLeft += 100;
            }
          }}
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
}
