import { auth } from "@/lib/auth";

export default async function UserDashboardPage() {
  const session = await auth()
  return (
    <div className="flex gap-6 px-6 pb-20 pt-[92px]">
      <section>{session?.user.username.toString()} test</section>
    </div>
  );
}
