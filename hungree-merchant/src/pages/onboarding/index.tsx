"use client";

import * as React from "react";
import { SignOutButton, UserButton, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { completeOnboarding } from "./_actions";
import { type NextPage } from 'next';
import PhoneInput from 'react-phone-number-input/input'
import AutoComplete from 'react-google-autocomplete'
import { env } from "~/env";

const OnboardingComponent: NextPage = () => {
  const [error, setError] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState<string | undefined>();
  const { user } = useUser();
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    const res = await completeOnboarding(formData);
    if (res?.message) {
      await user?.reload();
      router.push("/");
    }
    if (res?.error) {
      setError(res?.error);
    }
  };
  return (
    <>
    <div className="flex flex-row bg-black justify-between text-white gap-4">
      <button className="flex flex-row items-center p-4 gap-4">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-12 fill-green-400 stroke-none">
        <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
      </svg>
      <h1 className="text-5xl font-extrabold ">Hungree</h1>
      </button>
      <div className="flex flex-row gap-4">
        <div className="flex items-center">
        <SignOutButton>
          <button className="rounded-lg p-2 border font-light border-white hover:bg-blue-700">Sign Out</button>
        </SignOutButton>
        </div>
        <div className="flex p-4 align-center">
          <UserButton />
        </div>
      </div>
    </div>
    <main className="flex min-h-screen flex-col bg-black p-4">
      <div className="flex text-3xl font-extrabold gap-x-4 items-center justify-center w-full py-2">
        <h1 className="text-white text-center">Merchant Onboarding Form</h1>
      </div>
      <div className="flex text-xl items-center justify-center w-full py-2">
        <h1 className="text-white font-sans font-light">Onboarding requirements for <span className="font-mono text-blue-300">{user?.username}</span></h1>
      </div>
        <div className="w-full py-2">
          <form className="max-w-sm mx-auto">
            <div className="p-1">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Merchant Name</label>
              <input className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-400 block w-full p-2.5 dark:bg-black dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-300 dark:focus:border-gray-300 dark:shadow-sm-light" required />
            </div>
            <div className="p-1">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Merchant Contact Number</label>
              <PhoneInput value={phoneNumber} onChange={setPhoneNumber} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-black dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
            </div>
            <div className="p-1">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Merchant Location</label>
              <AutoComplete 
                apiKey={env.NEXT_PUBLIC_GOOGLE_API_KEY}
                onPlaceSelected={(place) => {
                  console.log(place);
                }}
                options={{
                  types: ["(regions)"],
                  componentRestrictions: { country: "IN" },
                }}
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-black dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" 
                required 
                />
            </div>
            <div className="p-1">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Merchant Delivery Radius (in km)</label>
              <input type="password" id="repeat-password" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-black dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
            </div>
            <div className="flex w-full px-1 py-3">
            <button type="submit" className="border rounded-lg border-white text-white p-2 hover:bg-blue-700">Submit Onboarding Info</button>
            </div>
          </form>
        </div>
    </main>
    </>
  );
}

export default OnboardingComponent

//      {error && <p className="text-red-600">Error: {error}</p>}