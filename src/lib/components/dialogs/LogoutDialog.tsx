import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogTrigger,
  DialogClose
} from '@/lib/components/ui/dialog';
import { Icon } from '@iconify/react/dist/iconify.js';
import { DropdownMenuItem } from '@/lib/components/ui/dropdown-menu';
import logout from '@/lib/actions/logout';
import { useSession } from '@/lib/contexts/SessionContext';
import { toast } from '@/lib/components/ui/use-toast';
import { useRouter } from 'next/navigation';

export default function LogoutDialog() {
  const router = useRouter();
  const { setSession } = useSession();
  const handleLogout = async () => {
    const response = await logout();
    if (response) {
      router.push('/');
      setSession(null);
      localStorage.removeItem(`${process.env.NEXT_PUBLIC_SESSION}`);
      toast({
        description: 'Logout successful.',
        duration: 4000,
        className: 'toast-success'
      });
    } else {
      toast({
        description: 'Logout failed',
        duration: 4000,
        className: 'toast-error'
      });
    }
  };
  return (
    <Dialog>
      <DialogTrigger
        asChild
        className="bg-transparent p-2 focus:bg-transparent"
      >
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
          <DialogClose onClick={(e) => e.stopPropagation()}>
            <form action={handleLogout}>
              <button className="rounded bg-primary px-6 py-2" type="submit">
                LOGOUT
              </button>
            </form>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
