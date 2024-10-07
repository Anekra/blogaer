import BackBtn from '@/lib/components/buttons/BackBtn';

export default async function UserDashboardPage() {
  return (
    <main className="flex min-h-screen gap-6 px-6 pb-20 pt-[92px]">
      <section>
        <div className="flex w-[700px] items-center gap-4 overflow-hidden">
          <BackBtn />
          <p className="h-full w-[700px] break-words">profile</p>
        </div>
      </section>
    </main>
  );
}
