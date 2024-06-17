import { type NextPage } from "next";
import { Header } from "~/components/header";
import ItemsTable from "~/components/items-table";
import { useState } from "react";
import { AddItemForm } from "~/components/add-item-form";
import { api } from "~/utils/api";

const Dashboard: NextPage = () => {
    const [addItem, setAddItem] = useState<boolean>(false);
    const { data } = api.dashboard.getItems.useQuery({
        pageNumber: 0,
    });
    const { data: itemsCount } = api.dashboard.countOfItems.useQuery();
    return (
        <>
        <Header />
        <main className="flex min-h-screen flex-col items-center bg-black gap-4">
            <div className="flex text-5xl font-extrabold gap-x-4 items-center justify-center w-full py-2">
                <h1 className="text-white text-center">Merchant Dashboard</h1>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="flex max-w-xs flex-col items-center gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-blue-700">
                    <h3 className="text-center text-2xl w-full font-bold">Total Items</h3>
                    <div className="flex text-2xl">
                        {itemsCount}
                    </div>
                </div>
                <div className="flex max-w-xs items-center flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-blue-700">
                <h3 className="text-2xl w-full font-bold">Active SKU Count</h3>
                <div className="text-2xl">
                    {data?.filter((item) => item.is_available).length}
                </div>
                </div>
            </div>
            <div className="px-4">
                { !addItem ? (
                <div className="flex gap-2">
                    <button className="text-white p-4 bg-transparent border border-white rounded-lg" onClick={() => setAddItem(!addItem)}>+ Add a menu item</button>
                </div> ) : 
                <AddItemForm addItem={addItem} setAddItem={setAddItem} />}
            </div>
            <ItemsTable data={data} itemsCount={itemsCount} />
        </main>
      </>
    )
}

export default Dashboard;