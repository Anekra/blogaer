import { auth } from '@/lib/auth';

export default async function UserDashboardPage() {
  const session = await auth();

  return (
    <div className="pt-10">
      {session?.user ? JSON.stringify(session.user) : 'no user found'}
    </div>
  );
}
