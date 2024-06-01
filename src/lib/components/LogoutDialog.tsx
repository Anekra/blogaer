import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogTrigger,
  DialogClose
} from './ui/dialog';
import { Icon } from '@iconify/react/dist/iconify.js';
import { DropdownMenuItem } from './ui/dropdown-menu';
import logout from '../actions/logout';

export default function LogoutDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild className="bg-transparent p-2 focus:bg-transparent">
        <DropdownMenuItem
          className="flex w-full justify-between"
          onSelect={(e) => e.preventDefault()}
        >
          Log out
          <Icon icon="tabler:logout" className="text-xl" />
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className="flex w-fit flex-col gap-8 px-12 py-10">
        <DialogTitle>You sure want to logout?</DialogTitle>
        <div className="flex justify-between gap-4">
          <DialogClose>
            <button className="rounded border border-gray-500 px-4 py-2">
              CANCEL
            </button>
          </DialogClose>
          <DialogClose>
            <button
              className="rounded bg-primary px-6 py-2"
              onClick={() => logout()}
            >
              LOGOUT
            </button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
