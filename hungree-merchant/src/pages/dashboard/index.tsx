import { type NextPage } from "next";
import { Header } from "~/components/header";
import ItemsTable from "~/components/items-table";
import { useState } from "react";
import { AddItemForm } from "~/components/add-item-form";

const Dashboard: NextPage = () => {
    const [addItem, setAddItem] = useState<boolean>(false);
    return (
        <>
        <Header />
        <main className="flex min-h-screen flex-col items-center bg-black gap-4">
            <div className="flex text-5xl font-extrabold gap-x-4 items-center justify-center w-full py-2">
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
            <div className="px-4">
                { !addItem 
                ? (
                <div className="flex gap-2">
                    <button className="text-white p-4 bg-transparent border border-white rounded-lg" onClick={() => setAddItem(!addItem)}>+ Add a menu item</button>
                    <button className="text-white p-4 bg-transparent border border-white rounded-lg" onClick={() => setAddItem(!addItem)}>Import Items as CSV</button>
                </div>
                )
                : 
                <AddItemForm addItem={addItem} setAddItem={setAddItem} />}
            </div>
            <ItemsTable/>
        </main>
      </>
    )
}

export default Dashboard;