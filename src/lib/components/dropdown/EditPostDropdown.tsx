import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '../ui/dropdown-menu';
import DeletePostDialogContent from '../dialogs/DeletePostDialogContent';
import React from 'react';
import { Link } from 'next-view-transitions';
import { Edit2Icon, MoreVerticalIcon, Trash2Icon } from 'lucide-react';
import { Dialog, DialogTrigger } from '../ui/dialog';

export default function EditPostDropdown({
  postData: { editUrl, postIndex }
}: {
  postData: { editUrl: string; postIndex: number };
}) {
  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex h-fit items-center rounded-full p-1 text-xl font-bold hover:bg-foreground hover:text-background focus:outline-none">
          <MoreVerticalIcon />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <DialogTrigger className="w-full">
                <Link
                  href={editUrl}
                  className="flex h-full w-full items-center gap-3 rounded"
                >
                  <Edit2Icon width={18} /> Edit
                </Link>
              </DialogTrigger>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <DialogTrigger className="flex h-full w-full items-center gap-3 rounded">
                <Trash2Icon width={18} /> Delete
              </DialogTrigger>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeletePostDialogContent postIndex={postIndex} />
    </Dialog>
  );
}
