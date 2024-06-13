"use client";

import * as React from "react";
import { type NextPage } from 'next';
import { Header } from "~/components/header";
import { useUser } from "@clerk/nextjs";
import { OnboardingForm } from '~/components/onboarding-form'

export type Coordinates = {
  lat: number,
  long: number,
}

export type Form = {
  name: any,
  contact: any,
  location: any,
  radius: any,
}

const OnboardingComponent: NextPage = () => {
  const { user } = useUser();

  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col bg-black p-4">
        <div className="flex text-3xl font-extrabold gap-x-4 items-center justify-center w-full py-2">
          <h1 className="text-white text-center">Merchant Onboarding Form</h1>
        </div>
        <div className="flex text-xl items-center justify-center w-full py-2">
          <h1 className="text-white font-sans font-light">Onboarding requirements for <span className="font-mono text-blue-300">{user?.username}</span></h1>
        </div>
        <OnboardingForm />
      </main>
    </>
  );
}

export default OnboardingComponent