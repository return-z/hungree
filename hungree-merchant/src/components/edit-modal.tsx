import { MutableRefObject, RefObject, useState, forwardRef, ForwardedRef, useEffect } from "react"
import { type FormEvent } from "react"
import { api } from "~/utils/api";

type TableRow = {
    item_uuid: string;
    created_at: Date;
    merchant_uuid: string | null;
    item_name: string | null;
    item_price: number | null;
    is_available: boolean | null;
    item_type: string | null;
  }

interface Props {
    dataRow: TableRow | undefined;
    open: boolean;
    setOpen: (open: boolean ) => void;
}

const EditModal = forwardRef((props: Props, ref: ForwardedRef<HTMLDialogElement | null>) => {
    const modalRef = ref as MutableRefObject<HTMLDialogElement | null>

    const [itemName, setItemName] = useState<string | undefined>();
    const [itemType, setItemType] = useState<string | undefined>();
    const [itemPrice, setItemPrice] = useState<string | undefined>();
    const [isAvailable, setIsAvailable] = useState<boolean | null | undefined>(false);
    const [itemUuid, setItemUuid] = useState<string | undefined>();

    const ctx = api.useUtils()
    const editItem = api.dashboard.editItem.useMutation({
        onSuccess: () => {
            props.setOpen(!open);
            modalRef.current?.close();
            void ctx.dashboard.getItems.invalidate();
        }
    });

    useEffect(() => {
        setItemName(props.dataRow?.item_name?.toString());
        setItemType(props.dataRow?.item_type?.toString());
        setItemPrice(props.dataRow?.item_price?.toString());
        setIsAvailable(props.dataRow?.is_available);
        setItemUuid(props.dataRow?.item_uuid);
        modalRef.current?.showModal()
    }, [props.open])

    console.log(itemName);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        if (!itemName || !itemType || !itemPrice || isAvailable === undefined || isAvailable === null || !itemUuid)
            return
        event.preventDefault();
        editItem.mutate({
            name: itemName,
            type: itemType,
            price: Number(itemPrice),
            availability: isAvailable,
            itemUuid: itemUuid,
        })
    }

    const handleCancel = () => {
        props.setOpen(!open);
        modalRef.current?.close();
    }

    return (
    <>
    {props.open && <dialog id="editModal" className="backdrop:backdrop-blur bg-black" ref={ref}>
        <div className="flex w-full items-center flex-col gap-4 rounded-xl bg-black p-4 text-white border border-white">
            <h3 className="text-2xl font-bold">Edit Item Form</h3>
            <div className="text-lg">
                Edit an item in your menu
            </div>
            <form className="flex flex-col items-center mx-auto gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-row md:gap-4">
                <div className="p-1 flex flex-col">
                <label className="mb-2 text-sm font-medium text-gray-900 dark:text-white">Item Name</label>
                <input name="name" value={itemName} onChange={(e) => setItemName(e.target.value)} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-400 block w-full p-2.5 dark:bg-black dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-300 dark:focus:border-gray-300 dark:shadow-sm-light"  required/>
                </div>
                <div className="p-1 flex flex-col">
                <label className="mb-2 text-sm font-medium text-gray-900 dark:text-white">Item Type</label>
                <select value={itemType} onChange={(e) => setItemType(e.target.value)} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-400 block w-full p-2.5 dark:bg-black dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-300 dark:focus:border-gray-300 dark:shadow-sm-light"  required>
                    <option>Veg</option>
                    <option>Vegan</option>
                    <option>Dairy</option>
                    <option>Non Veg</option>
                </select>
                </div>
                <div className="p-1 flex flex-col">
                <label className="mb-2 text-sm font-medium text-gray-900 dark:text-white">Item Price</label>
                <input name="price" value={itemPrice} onChange={(e) => setItemPrice(e.target.value)} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-400 block w-full p-2.5 dark:bg-black dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-300 dark:focus:border-gray-300 dark:shadow-sm-light"  required/>
                </div>
                <div className="p-1 flex flex-col justify-center">
                <label className="mb-2 text-sm font-medium text-gray-900 dark:text-white">Availabe?</label>
                <input type="checkbox" name="availability" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-400 block w-full p-2.5 dark:bg-black dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-300 dark:focus:border-gray-300 dark:shadow-sm-light" />
                </div>
            </div>
            <div className="flex flex-row gap-4">
            <button type="submit" className="p-4 border border-white rounded-lg hover:bg-green-700">Confirm Edit</button>
            <button onClick={handleCancel} className="p-4 border border-white rounded-lg hover:bg-red-700">Cancel</button>
            </div>
            </form>
        </div>
        </dialog>}
    </>
    )
})

EditModal.displayName = "EditModal";

export default EditModal;