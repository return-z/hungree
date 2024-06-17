import { type NextPage } from "next";
import { Header } from "~/components/header";
import ItemsTable from "~/components/items-table";
import { useState, useEffect } from "react";
import { AddItemForm } from "~/components/add-item-form";
import { api } from "~/utils/api";
import { Spinner } from "~/components/spinner";

const Dashboard: NextPage = () => {
    const [pageCount, setPageCount] = useState(1);
    const [addItem, setAddItem] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchState, setSearchState] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const ctx = api.useUtils();

    const { data } = api.dashboard.getItems.useQuery({
        pageNumber: currentPage,
        searchTerm: searchTerm,
    });

    const { data: itemsCount } = api.dashboard.countOfAllItems.useQuery({
        searchTerm: searchTerm,
    });

    const { data: activeItemsCount } = api.dashboard.countOfActiveItems.useQuery({
        searchTerm: searchTerm,
    });

    useEffect(() => {
        void ctx.dashboard.getItems.invalidate();
        void ctx.dashboard.countOfAllItems.invalidate();
        void ctx.dashboard.countOfActiveItems.invalidate();
        if (itemsCount)
            setPageCount(Math.ceil(itemsCount._count.item_uuid/10))
    }, [addItem, itemsCount])

    return (
        
        <>
        <Header />
        { data ?
        <>
        <main className="flex min-h-screen flex-col items-center bg-black gap-4">
            <div className="flex text-5xl font-extrabold gap-x-4 items-center justify-center w-full py-2">
                <h1 className="text-white text-center">Merchant Dashboard</h1>
            </div>
            <div className="grid grid-cols-3 gap-4">
                <div className="flex max-w-xs flex-col items-center gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-blue-700">
                    <h3 className="text-center text-2xl w-full font-light">Total Items</h3>
                    <div className="flex text-2xl font-bold">
                        {itemsCount?._count.item_uuid}
                    </div>
                </div>
                <div className="flex max-w-xs items-center flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-blue-700">
                    <h3 className="text-2xl w-full font-light">Active SKU Count</h3>
                    <div className="text-2xl font-bold">
                        {activeItemsCount}
                    </div>
                </div>
                <div className="flex max-w-xs items-center flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-blue-700">
                    <h3 className="text-2xl w-full font-light">Average Item Price</h3>
                    <div className="text-2xl font-bold">
                        {itemsCount?._avg.item_price ? itemsCount?._avg.item_price.toFixed(2) : 0}
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
            <ItemsTable data={data} pageCount={pageCount} currentPage={currentPage} 
            setCurrentPage={setCurrentPage} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </main>
        </> : <Spinner /> }
      </>
    )
}

export default Dashboard;