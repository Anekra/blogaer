import React from 'react';
import GooglePlayIcon from './GooglePlayIcon';
import Link from 'next/link';

function Footer() {
  return (
    <footer className="bottom-0 flex gap-2 w-screen items-center justify-between py-4 px-2 sm:px-12 shadow-[0_-0.5px_2px_#334041] dark:shadow-[0_-0.5px_2px_#ffffff]">
      <div className="flex">
        <button className="flex items-center gap-1 border border-black/20 dark:border-white/20 p-2 rounded-xl hover:shadow-[0_2px_4px_0_rgb(0,0,0,0.9)] dark:hover:shadow-[0_2px_4px_0_rgb(255,255,255,0.9)] transition-transform active:translate-y-[4px] active:shadow-none dark:hover:active:shadow-none">
          <GooglePlayIcon />
          <div className="flex flex-col items-start gap-1 leading-none">
            <h3 className="text-[8px] sm:text-[10px]">GET IT ON</h3>
            <h3 className="text-start text-[11px] font-bold sm:text-lg sm:tracking-widest">
              Google Play
            </h3>
          </div>
        </button>
      </div>
      <div className="flex lg:gap-6 gap-2 text-xs xs:text-sm sm:text-base">
        <p>© Blogaer</p>
        <Link href="/terms" className="underline text-secondary-foreground">Terms</Link>
        <Link href="/privacy" className="underline text-secondary-foreground">Privacy</Link>
      </div>
    </footer>
  );
}

export default Footer;
