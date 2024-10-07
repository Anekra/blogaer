import React from 'react';
import SearchBar from '../../widgets/SearchBar';
import { usePathname } from 'next/navigation';
import { Link } from 'next-view-transitions';
import { useTheme } from 'next-themes';
import PostPreviewDrawer from '../../post/PostPreviewDrawer';
import { useSession } from '@/lib/contexts/SessionContext';
import ProfileDropdown from '../../dropdown/ProfileDropdown';
import { getSlugOrIdFromPath } from '@/lib/utils/helper';
import SaveAndPublishBtn from '../../buttons/SaveAndPublishBtn';
import CreatePostBtn from '../../buttons/CreatePostBtn';
import ViewPostBtn from '../../buttons/ViewPostBtn';
import AutosaveSwitch from '../../widgets/AutosaveSwitch';
import ThemeSwitch from '../../widgets/ThemeSwitch';

export default function NavItems({ isAtTheTop }: { isAtTheTop: boolean }) {
  const currentPath = usePathname();
  const slug = getSlugOrIdFromPath(currentPath);
  const slugs = slug.split('-');
  const postId = slugs[slugs.length - 1];
  const { session } = useSession();
  const { setTheme, resolvedTheme } = useTheme();

  return (
    <nav className="flex items-center justify-between gap-6 md:grow">
      {(currentPath === `/blog/post/edit/draft/${postId}` ||
        currentPath === '/blog/post/create') && <AutosaveSwitch />}
      <div className="hidden items-center justify-end justify-self-end md:flex md:grow md:gap-4">
        {(currentPath === '/home' || currentPath === '/blog/explore') && (
          <SearchBar />
        )}
        {session ? (
          <div className="flex items-center gap-4">
            {(currentPath === '/blog/post/create' ||
              currentPath === `/blog/post/edit/draft/${postId}`) && (
              <React.Fragment>
                <PostPreviewDrawer />
              </React.Fragment>
            )}
            {(currentPath === '/home' ||
              currentPath === `/blog/post/published`) && <CreatePostBtn />}
            {currentPath === `/blog/post/edit/published/${slug}` && (
              <React.Fragment>
                <ViewPostBtn />
                <SaveAndPublishBtn />
              </React.Fragment>
            )}
            <ProfileDropdown />
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <div className="flex h-8 w-16 items-center justify-between">
              <ThemeSwitch
                width="w-16"
                padding="p-1"
                transform="translate-x-[130%]"
                setTheme={setTheme}
                resolvedTheme={resolvedTheme}
              />
            </div>
            <Link href="/login">
              <button
                className={`${
                  isAtTheTop && currentPath === '/'
                    ? 'btn-outline-root'
                    : 'btn-outline-base'
                }`}
              >
                <span>LOGIN</span>
              </button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
