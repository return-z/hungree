import PhoneInput from 'react-phone-number-input/input'
import AutoComplete from 'react-google-autocomplete'
import { env } from "~/env";
import { useState } from 'react';
import { api } from '~/utils/api';
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Spinner } from './spinner';

export type Coordinates = {
    lat: number,
    long: number,
}

export type OnboardingFormData = {
    name: string,
    location: Coordinates,
    contact: string,
    radius: number,
}

export const OnboardingForm = () => {
    const [error, setError] = useState("");
    const { user } = useUser();
    const router = useRouter();

    const [phoneNumber, setPhoneNumber] = useState<string | undefined>('');
    const [name, setName] = useState('');
    const [radius, setRadius] = useState('');
    const [latLong, setLatLong] = useState<Coordinates>();


    const onboardingForm = api.onboarding.onboardingForm.useMutation({ 
      async onSettled(data, error) {
        if (data?.message) {
          await user?.reload();
          router.push("/dashboard");
        }
        if (error){
          setError(error.message)
        }
      },
    })


    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        if (!latLong || !phoneNumber)
          return
       onboardingForm.mutate({
          name: name,
          contact: phoneNumber,
          lat: latLong.lat,
          long: latLong.long,
          radius: Number(radius),
        });
      }

    return (
    <>
      {onboardingForm.isPending ? <Spinner /> :
        <form className="max-w-sm mx-auto w-full" onSubmit={onSubmit}>
        <div className="p-1">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Merchant Name</label>
        <input name="name"  onChange={(e) => setName(e.target.value)} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-400 block w-full p-2.5 dark:bg-black dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-300 dark:focus:border-gray-300 dark:shadow-sm-light"  required/>
        </div>
        <div className="p-1">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Merchant Contact Number</label>
        <PhoneInput name="contact" value={phoneNumber} onChange={setPhoneNumber} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-black dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required/>
        </div>
        <div className="p-1">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Merchant Location</label>
            <AutoComplete 
                apiKey={env.NEXT_PUBLIC_GOOGLE_API_KEY}
                onPlaceSelected={(place: google.maps.places.PlaceResult) => {
                  if (!place.geometry?.location?.lat() || !place.geometry?.location?.lng())
                    return
                  setLatLong({ lat: place.geometry?.location?.lat() , long: place.geometry?.location?.lng() });
                }}
                options={{
                types: ["establishment"],
                componentRestrictions: { country: "IN" },
                }}
                name="location"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-black dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" 
                required
            />
            </div>
            <div className="p-1">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Merchant Delivery Radius (in km)</label>
            <input name="radius" type="number" onChange={(e) => setRadius(e.target.value)} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-black dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required/>
            </div>
            <div className="flex w-full px-1 py-3">
            <button type="submit" className="border rounded-lg border-white text-white p-2 hover:bg-blue-700">Submit Onboarding Info</button>
            </div>
        </form> } 
        <div className="w-full py-2">
          {onboardingForm.error ? <p className="text-white">Something went wrong! {onboardingForm.error.message}</p> : <p className="text-white">{onboardingForm.data?.message}</p>}
        </div>
    </>
    )
}
