import { type NextPage } from "next";
import { Header } from "~/components/header";
import ItemsTable from "~/components/items-table";

const dashboard: NextPage = () => {
    return (
        <>
        <Header />
        <main className="flex min-h-screen flex-col items-center bg-black p-4">
            <div className="flex text-4xl font-extrabold gap-x-4 items-center justify-center w-full py-2">
                <h1 className="text-white text-center">Merchant Dashboard</h1>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-blue-700">
                <h3 className="text-2xl items-center w-full font-bold">Items</h3>
                <div className="text-lg">
                    Click here to sign in to your Hungree Merchant Dashboard
                </div>
                </div>
                <div className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-blue-700">
                <h3 className="text-2xl items-center w-full font-bold">SKU Count</h3>
                <div className="text-lg">
                    Click here to sign in to your Hungree Merchant Dashboard
                </div>
                </div>
            </div>
            <ItemsTable/>
        </main>
      </>
    )
}

export default dashboard;