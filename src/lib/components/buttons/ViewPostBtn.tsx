import { useSession } from '@/lib/contexts/SessionContext';
import { getSlugOrIdFromPath } from '@/lib/utils/helper';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

export default function ViewPostBtn() {
  const slug = getSlugOrIdFromPath(usePathname());
  const { session } = useSession();
  const username = session?.username;
  return (
    <Link href={`/blog/${username}/${slug}`}>
      <button className="btn-p-outline-a">View Post</button>
    </Link>
  );
}
