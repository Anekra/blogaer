import CategoriesIcon from '@/components/CategoriesIcon';
import Laptop from '@/components/Laptop';
import StoriesIcon from '@/components/StoriesIcon';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex w-screen flex-col">
      <section className="gradient-background flex flex-col pt-20 px-4 sm:px-12 xl:px-24 sm:flex-row sm:gap-6 items-center justify-between w-full">
        <div className="flex flex-col sm:order-1 order-2 gap-3 sm:gap-10 py-4 sm:py-16 xl:w-[500px]">
          <h1 className="xl:text-5xl text-4xl font-bold">Exploring Thoughts</h1>
          <p className="xl:text-lg xl:w-[400px] pb-2 md:w-[300px]">
            Create your own stories. Share your expertise with others. And
            explore many stories, insights, and experiences.
          </p>
          <Link href="/explore" className="w-fit">
            <button className="bg-primary-foreground text-primary px-4 py-2 font-bold rounded-xl">
              EXPLORE
            </button>
          </Link>
        </div>
        <div className="flex-grow sm:order-2 order-1">
          <Laptop />
        </div>
      </section>
      <section className="flex flex-col gap-6 pt-10 px-4 sm:px-12 xl:px-24">
        <div className="flex gap-6 items-center">
          <StoriesIcon />
          <h1 className="text-3xl">Stories</h1>
        </div>
        <div className="flex flex-col bg-foreground/10 p-2 max-w-[360px] rounded-lg">
          <div className="flex items-center gap-2 pb-2">
            <div className="flex flex-col gap-2 flex-shrink">
              <div className="flex gap-2 items-center">
                <div className="w-10 h-10 rounded-[50%] overflow-clip">
                  <img
                    src="https://images.unsplash.com/photo-1693225113452-8ab5cf5f6e7f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y3liZXJwdW5rJTIwaGVsbWV0fGVufDB8fDB8fHww"
                    alt="Profile"
                    className="h-full w-auto object-cover"
                  />
                </div>
                <p>Writer's Name</p>
              </div>
              <p className="line-clamp-2">Story Title Story Title Story Title Story Title Story Title Story Title Story Title Story Title</p>
            </div>
            <div className="w-32 h-auto rounded-lg overflow-clip flex-shrink-0">
              <img
                src="https://images.unsplash.com/photo-1519791883288-dc8bd696e667?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Story"
                className="object-cover"
              />
            </div>
          </div>
          <p className="place-self-end text-sm">11 Nov 2023</p>
        </div>
      </section>
      <section className="flex flex-col sm:items-center gap-8 py-10 px-4 sm:px-12 xl:px-24">
        <div className="flex gap-2 items-center">
          <CategoriesIcon />
          <h1 className="text-3xl">Categories</h1>
        </div>
        <div className="sm:grid flex flex-wrap sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 place-items-center w-fit">
          <div className="bg-foreground/10 flex items-center justify-center rounded-xl sm:w-[200px] sm:h-[200px] p-4">
            <p className="xs:text-2xl text-center">Software Development</p>
          </div>
          <div className="bg-foreground/10 flex items-center justify-center rounded-xl sm:w-[200px] sm:h-[200px] p-4">
            <p className="xs:text-2xl text-center">Natural Science</p>
          </div>
          <div className="bg-foreground/10 flex items-center justify-center rounded-xl sm:w-[200px] sm:h-[200px] p-4">
            <p className="xs:text-2xl">Health</p>
          </div>
          <div className="bg-foreground/10 flex items-center justify-center rounded-xl sm:w-[200px] sm:h-[200px] p-4">
            <p className="xs:text-2xl">Culinary</p>
          </div>
          <div className="bg-foreground/10 flex items-center justify-center rounded-xl sm:w-[200px] sm:h-[200px] p-4">
            <p className="xs:text-2xl">Lifestyle</p>
          </div>
          <div className="bg-foreground/10 flex items-center justify-center rounded-xl sm:w-[200px] sm:h-[200px] p-4">
            <p className="xs:text-2xl">Fashion</p>
          </div>
          <div className="bg-foreground/10 flex items-center justify-center rounded-xl sm:w-[200px] sm:h-[200px] p-4">
            <p className="xs:text-2xl">Technology</p>
          </div>
          <div className="bg-foreground/10 flex items-center justify-center rounded-xl sm:w-[200px] sm:h-[200px] p-4">
            <p className="xs:text-2xl">Traveling</p>
          </div>
          <div className="bg-foreground/10 flex items-center justify-center rounded-xl sm:w-[200px] sm:h-[200px] p-4">
            <p className="xs:text-2xl">DIY</p>
          </div>
        </div>
        <div className="flex justify-center">
          <Link
            href="/categories"
            className="underline text-secondary-foreground"
          >
            See all categories
          </Link>
        </div>
      </section>
    </main>
  );
}
