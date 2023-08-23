import {
  BsGoogle,
  BsFacebook,
  BsLinkedin,
  BsDiscord,
  BsGithub,
} from 'react-icons/bs';

export default async function Login() {
  return (
    <main className="flex w-full min-h-screen flex-col items-center justify-evenly">
      <div className="flex flex-col gap-3 bg-[#120D0B] xl:w-[400px] p-6 rounded-xl">
        <div className="w-full">
          <h1 className="text-2xl text-center font-bold">WELCOME</h1>
        </div>
        <form action="" method="post" noValidate>
          <div className="flex flex-col gap-1 px-4 pb-4">
            <label htmlFor="username">Username</label>
            <input
              className="bg-[#120D0B] appearance-none border rounded w-full py-2 px-3 placeholder:text-[#655C5A] font-medium leading-tight focus:outline-none focus:bg-[#D7BDB6] focus:text-[#120D0B] focus:shadow-sm focus:shadow-white focus:placeholder:text-[#120D0B]"
              type="text"
              placeholder="Enter username"
            />
          </div>
          <div className="flex flex-col gap-1 px-4 pb-4">
            <label htmlFor="email">Email</label>
            <div>
              <input
                className="bg-[#120D0B] appearance-none border rounded w-full py-2 px-3 placeholder:text-[#655C5A] font-medium leading-tight focus:outline-none focus:bg-[#D7BDB6] focus:text-[#120D0B] focus:shadow-sm focus:shadow-white focus:placeholder:text-[#120D0B]"
                type="email"
                placeholder="Enter email"
              />
            </div>
          </div>
          <div className="flex flex-col gap-1 px-4 pb-4">
            <label htmlFor="password">Password</label>
            <input
              className="bg-[#120D0B] appearance-none border rounded w-full py-2 px-3 placeholder:text-[#655C5A] font-medium leading-tight focus:outline-none focus:bg-[#D7BDB6] focus:text-[#120D0B] focus:shadow-sm focus:shadow-white focus:placeholder:text-[#120D0B]"
              type="password"
              placeholder="Enter password"
            />
          </div>
          <div className="flex px-4 py-4">
            <button className="w-full h-[46px] bg-[#DA7455] text-[#3A0A00] font-bold rounded-md hover:shadow-sm hover:shadow-white">
              Create Account
            </button>
          </div>
        </form>
        <div className="relative px-4 mt-2">
          <hr className="w-full h-1" />
          <div className="absolute inset-x-0 m-auto -top-[9px] flex justify-center">
            <p className="text-center text-sm bg-[#120D0B] px-1">Login with</p>
          </div>
        </div>
        <div className="flex justify-evenly px-4 py-4">
          <BsGoogle
            size={40}
            className="text-[#8C381F] hover:cursor-pointer hover:text-[#D7BDB6]"
          />
          <BsFacebook
            size={40}
            className="text-[#8C381F] hover:cursor-pointer hover:text-[#D7BDB6]"
          />
          <BsLinkedin
            size={40}
            className="text-[#8C381F] hover:cursor-pointer hover:text-[#D7BDB6]"
          />
          <BsGithub
            size={40}
            className="text-[#8C381F] hover:cursor-pointer hover:text-[#D7BDB6]"
          />
          <BsDiscord
            size={40}
            className="text-[#8C381F] hover:cursor-pointer hover:text-[#D7BDB6]"
          />
        </div>
        <div className="px-4 pt-6">
          <p className="text-[#7F7572] text-center">
            Already have an account?
            <span className="text-[#FA8E6D] hover:cursor-pointer"> Login</span>
          </p>
        </div>
      </div>
    </main>
  );
}
