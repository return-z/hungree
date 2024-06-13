import { SignOutButton, SignInButton, UserButton, useUser } from "@clerk/nextjs";

export const Header = () => {
    const { user } = useUser();
    return (
        <div className="flex flex-row bg-black justify-between text-white gap-4">
        <button className="flex flex-row items-center p-4 gap-4">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-12 fill-green-400 stroke-none">
          <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
        </svg>
        <h1 className="text-5xl font-extrabold ">Hungree</h1>
        </button>
        {user ? (
        <div className="flex flex-row gap-4">
          <div className="flex items-center">
          <SignOutButton>
            <button className="rounded-lg p-2 border font-light border-white hover:bg-blue-700">Sign Out</button>
          </SignOutButton>
          </div>
          <div className="flex p-4 align-center">
            <UserButton />
          </div>
        </div> ) : (
          <div className="flex items-center p-4">
          <SignInButton>
            <button className="rounded-lg p-2 border font-light border-white hover:bg-blue-700">Sign In</button>
          </SignInButton>
          </div>
        )}
      </div>
    )
}