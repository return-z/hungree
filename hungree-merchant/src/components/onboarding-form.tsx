import PhoneInput from 'react-phone-number-input/input'
import AutoComplete from 'react-google-autocomplete'
import { env } from "~/env";
import { useState } from 'react';
import { api } from '~/utils/api';
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

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
    const [location, setLocation] = useState('');
    const [radius, setRadius] = useState('');
    const [latLong, setLatLong] = useState<Coordinates>({ lat: -1, long: -1 });

    const onboardingForm = api.onboarding.onboardingForm.useMutation()

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const formData: OnboardingFormData  = {
          'name': name,
          'location': latLong,
          'contact': phoneNumber ?? '',
          'radius': Number(radius),
        }
        onboardingForm.mutate({
          name: formData.name,
          contact: formData.contact,
          lat: formData.location.lat,
          long: formData.location.long,
          radius: formData.radius,
        })
        if (onboardingForm.data?.message) {
            await user?.reload();
            router.push("/");
          }
          else {
            setError(error);
          }
      }

    return (
    <>
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
                onPlaceSelected={(place) => {
                setLatLong({ lat : place.geometry.location.lat(), long: place.geometry.location.lng() });
                setLocation(place);
                }}
                options={{
                types: ["(regions)"],
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
        </form>  
        <div className="w-full py-2">
          {onboardingForm.error ? <p className="text-white">Something went wrong! {onboardingForm.error.message}</p> : <p className="text-white">{onboardingForm.data?.message}</p>}
        </div>
    </>
    )
}
