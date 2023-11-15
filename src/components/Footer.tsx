import React from 'react';
import GooglePlayIcon from './GooglePlayIcon';
import Link from 'next/link';

function Footer() {
  return (
    <footer className="bottom-0 flex w-screen items-center justify-between gap-2 px-2 py-4 shadow-[0_-0.5px_2px_#334041] dark:shadow-[0_-0.5px_2px_#ffffff] sm:px-12">
      <div className="flex">
        <button className="flex items-center gap-1 rounded-xl border border-black/20 p-2 transition-transform hover:shadow-[0_2px_4px_0_rgb(0,0,0,0.9)] active:translate-y-[4px] active:shadow-none dark:border-white/20 dark:hover:shadow-[0_2px_4px_0_rgb(255,255,255,0.9)] dark:hover:active:shadow-none">
          <GooglePlayIcon />
          <div className="flex flex-col items-start gap-1 leading-none">
            <h3 className="text-[8px] sm:text-[10px]">GET IT ON</h3>
            <h3 className="text-start text-[11px] font-bold sm:text-lg sm:tracking-widest">
              Google Play
            </h3>
          </div>
        </button>
      </div>
      <div className="flex gap-2 text-xs xs:text-sm sm:text-base lg:gap-6">
        <p>© Blogaer</p>
        <Link href="/terms" className="text-secondary-foreground underline">
          Terms
        </Link>
        <Link href="/privacy" className="text-secondary-foreground underline">
          Privacy
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
