'use client';

import logout from '@/lib/actions/logout';
import React from 'react';

export default function Logout() {
  return (
    <div className="flex h-full w-full justify-center p-12">
      <button
        className="rounded bg-amber-700 px-6 py-3 text-3xl"
        onClick={() => logout()}
      >
        LOGOUT
      </button>
    </div>
  );
}
