import { Dispatch, SetStateAction, SyntheticEvent, useState } from "react"
import { api } from "~/utils/api"
import { type FormEvent } from "react"

interface Props {
    addItem: boolean,
    setAddItem: (addItem: boolean) => void,
}

interface AddItemForm {
    itemName: string,
    itemType: string,
    itemPrice: number,
    isAvailable: boolean,
}

export const AddItemForm = (props: Props) => {
    const addItem = api.dashboard.addItem.useMutation();

    const [itemName, setItemName] = useState('');
    const [itemType, setItemType] = useState('');
    const [itemPrice, setItemPrice] = useState(-1);
    const [isAvailable, setIsAvailable] = useState(false);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        addItem.mutate({
            name: itemName,
            type: itemType,
            price: itemPrice,
            availability: isAvailable,
        });
    }
        
    return (
        <div className="flex w-full items-center flex-col gap-4 rounded-xl bg-black p-4 text-white border border-white">
            <h3 className="text-2xl font-bold">Add Item Form</h3>
            <div className="text-lg">
                Add an item to your menu
            </div>
            <form className="flex flex-col items-center mx-auto gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-row md:gap-4">
                <div className="p-1 flex flex-col">
                <label className="mb-2 text-sm font-medium text-gray-900 dark:text-white">Item Name</label>
                <input name="name" onChange={(e) => setItemName(e.target.value)} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-400 block w-full p-2.5 dark:bg-black dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-300 dark:focus:border-gray-300 dark:shadow-sm-light"  required/>
                </div>
                <div className="p-1 flex flex-col">
                <label className="mb-2 text-sm font-medium text-gray-900 dark:text-white">Item Type</label>
                <input name="type" onChange={(e) => setItemType(e.target.value)} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-400 block w-full p-2.5 dark:bg-black dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-300 dark:focus:border-gray-300 dark:shadow-sm-light"  required/>
                </div>
                <div className="p-1 flex flex-col">
                <label className="mb-2 text-sm font-medium text-gray-900 dark:text-white">Item Price</label>
                <input name="price" onChange={(e) => setItemPrice(Number(e.target.value))} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-400 block w-full p-2.5 dark:bg-black dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-300 dark:focus:border-gray-300 dark:shadow-sm-light"  required/>
                </div>
                <div className="p-1 flex flex-col">
                <label className="mb-2 text-sm font-medium text-gray-900 dark:text-white">Availability</label>
                <input name="availability" onChange={(e) => setIsAvailable(Boolean(e.target.value))} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-400 block w-full p-2.5 dark:bg-black dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-300 dark:focus:border-gray-300 dark:shadow-sm-light"  required/>
                </div>
            </div>
            <div className="flex flex-row gap-4">
            <button type="submit" className="p-4 border border-white rounded-lg hover:bg-green-700">+ Add item</button>
            <button className="p-4 border border-white rounded-lg hover:bg-red-700" onClick={() => props.setAddItem(!props.addItem)}>Cancel</button>
            </div>
            </form>
        </div>
    )
}