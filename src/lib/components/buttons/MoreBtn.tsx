import { MoreVerticalIcon } from 'lucide-react';
import React from 'react';

export default function MoreBtn() {
  return (
    <button className="flex items-center rounded-full p-1 text-xl font-bold hover:bg-foreground hover:text-background focus:outline-none">
      <MoreVerticalIcon />
    </button>
  );
}
