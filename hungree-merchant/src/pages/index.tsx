import Head from "next/head";
import Link from "next/link";
import { type NextPage } from "next";

import { api } from "~/utils/api";
import { SignInButton, SignOutButton } from "@clerk/nextjs";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Header } from "~/components/header";

const Home : NextPage = () => {
  return (
    <>
      <Head>
        <title>Hungree Merchant Portal</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-center bg-black">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
            <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
              Hungree Merchant Portal
            </h1>
          <div className="grid grid-cols-1 gap-4">
            <SignInButton>
            <button
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-blue-700"
            >
              <h3 className="text-2xl items-center w-full font-bold">Sign In</h3>
              <div className="text-lg">
                Click here to sign in to your Hungree Merchant Dashboard
              </div>
            </button>
            </SignInButton>
          </div>
        </div>
      </main>
    </>
  );
}

export default Home;
