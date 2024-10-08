import BackBtn from '@/lib/components/buttons/BackBtn';
import RegisterForm from '@/lib/components/forms/RegisterForm';
import LogoIcon from '@/lib/components/icons/LogoIcon';

export default function Register() {
  return (
    <main className="radial-background relative flex min-h-screen items-center justify-center py-6">
      <BackBtn className="md:text-5xl" />
      <div className="absolute">
        <LogoIcon className="h-[150px] w-[180px] text-primary-foreground brightness-75" />
      </div>
      <div className="glass-form flex w-[400px] flex-col gap-3 px-10 py-6">
        <div className="w-full">
          <h1 className="text-center text-2xl font-bold">WELCOME</h1>
        </div>
        <RegisterForm />
      </div>
    </main>
  );
}
