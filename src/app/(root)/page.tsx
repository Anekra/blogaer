import CategoriesIcon from '@/lib/components/CategoriesIcon';
import Laptop from '@/lib/components/Laptop';
import StoriesIcon from '@/lib/components/StoriesIcon';
import Image from 'next/image';
import Link from 'next/link';

export default function RootPage() {
  return (
    <main className="flex flex-col pb-8">
      <section className="gradient-background flex w-full flex-col items-center justify-between px-4 pt-20 sm:flex-row sm:gap-6 sm:px-12 xl:px-24">
        <div className="order-2 flex flex-col gap-3 py-4 sm:order-1 sm:gap-6 sm:py-16 xl:w-[500px]">
          <h1 className="pb-3 text-4xl font-bold xl:text-5xl">
            Exploring Thoughts
          </h1>
          <p className="md:w-[300px] xl:w-[400px] xl:text-lg">
            Explore many articles and stories with different categories and
            languages, from the ones who love to share their knowledge, start
            your journey now.
          </p>
          <Link href="/explore" className="w-fit">
            <button className="rounded-xl bg-primary-foreground px-4 py-2 font-bold text-primary">
              EXPLORE
            </button>
          </Link>
        </div>
        <div className="order-1 grow sm:order-2">
          <Laptop />
        </div>
      </section>
      <section className="flex flex-col gap-6 px-4 pt-10 sm:px-12 xl:px-24">
        <div className="flex items-center gap-6">
          <StoriesIcon />
          <h1 className="text-3xl">Stories</h1>
        </div>
        <div className="flex max-w-[360px] flex-col rounded-lg bg-foreground/10 p-2">
          <div className="flex items-center gap-2 pb-2">
            <div className="flex shrink flex-col gap-2">
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 text-clip rounded-[50%]">
                  <Image src="" alt="Cover" width={200} height={100} />
                </div>
                <p>Writer&#39;s Name</p>
              </div>
              <p className="line-clamp-2">
                Story Title Story Title Story Title Story Title Story Title
                Story Title Story Title Story Title
              </p>
            </div>
            <div className="h-auto w-32 shrink-0 text-clip rounded-lg">
              <Image
                src=""
                alt="Story"
                className="object-cover"
                width={200}
                height={100}
              />
            </div>
          </div>
          <p className="place-self-end text-sm">11 Nov 2023</p>
        </div>
      </section>
      <section className="flex flex-col gap-8 px-4 py-10 sm:items-center sm:px-12 xl:px-24">
        <div className="flex items-center gap-2">
          <CategoriesIcon />
          <h1 className="text-3xl">Categories</h1>
        </div>
        <div className="flex w-fit flex-wrap place-items-center gap-5 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          <div className="flex items-center justify-center rounded-xl bg-foreground/10 p-4 sm:h-[200px] sm:w-[200px]">
            <p className="text-center xs:text-2xl">Software Development</p>
          </div>
          <div className="flex items-center justify-center rounded-xl bg-foreground/10 p-4 sm:h-[200px] sm:w-[200px]">
            <p className="text-center xs:text-2xl">Natural Science</p>
          </div>
          <div className="flex items-center justify-center rounded-xl bg-foreground/10 p-4 sm:h-[200px] sm:w-[200px]">
            <p className="xs:text-2xl">Health</p>
          </div>
          <div className="flex items-center justify-center rounded-xl bg-foreground/10 p-4 sm:h-[200px] sm:w-[200px]">
            <p className="xs:text-2xl">Culinary</p>
          </div>
          <div className="flex items-center justify-center rounded-xl bg-foreground/10 p-4 sm:h-[200px] sm:w-[200px]">
            <p className="xs:text-2xl">Lifestyle</p>
          </div>
          <div className="flex items-center justify-center rounded-xl bg-foreground/10 p-4 sm:h-[200px] sm:w-[200px]">
            <p className="xs:text-2xl">Fashion</p>
          </div>
          <div className="flex items-center justify-center rounded-xl bg-foreground/10 p-4 sm:h-[200px] sm:w-[200px]">
            <p className="xs:text-2xl">Technology</p>
          </div>
          <div className="flex items-center justify-center rounded-xl bg-foreground/10 p-4 sm:h-[200px] sm:w-[200px]">
            <p className="xs:text-2xl">Traveling</p>
          </div>
          <div className="flex items-center justify-center rounded-xl bg-foreground/10 p-4 sm:h-[200px] sm:w-[200px]">
            <p className="xs:text-2xl">DIY</p>
          </div>
        </div>
        <div className="flex justify-center">
          <Link
            href="/categories"
            className="text-secondary-foreground underline"
          >
            See all categories
          </Link>
        </div>
      </section>
    </main>
  );
}
