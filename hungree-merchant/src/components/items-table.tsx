import EditModal from "./edit-modal";
import { useState, useRef } from "react";

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
  data: TableRow[] | undefined
}

const ItemsTable = ( props: Props ) => {
  const [open, setOpen] = useState(false);
  const [dataRow, setDataRow] = useState<TableRow>();
  const modalRef = useRef<HTMLDialogElement | null>(null);

  const handleEditModal = (item: TableRow) => {
    setOpen(!open);
    setDataRow(item);
  }

  return (
    !props.data?.length ? 
     <p className="text-3xl font-bold text-white">Nothing to show! Please add items to the menu</p> : (  
    <div className="p-4 w-5/6">
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="bg-blue-700 dark:bg-slate-700">
            <th className="px-4 py-3 font-medium text-gray-700 dark:text-gray-300">Item</th>
            <th className="px-4 py-3 font-medium text-gray-700 dark:text-gray-300">Type</th>
            <th className="px-4 py-3 font-medium text-gray-700 dark:text-gray-300">Price</th>
            <th className="px-4 py-3 font-medium text-gray-700 dark:text-gray-300">Status</th>
            <th className="px-4 py-3 font-medium text-gray-700 dark:text-gray-300"></th>
          </tr>
        </thead>
        <tbody>
          {props.data?.map((item, idx) => (
              <tr key={idx} className="border rounded-lg border-gray-200 dark:border-gray-700">
                <td className="px-4 py-3 font-medium text-gray-900 dark:text-gray-100">{item.item_name}</td>
                <td className="px-4 py-3 text-gray-700 dark:text-gray-400">{item.item_type}</td>
                <td className="px-4 py-3 text-gray-700 dark:text-gray-400">{item.item_price}</td>
                <td className="px-4 py-3 text-green-600 dark:text-green-400">{item.is_available ? <p className="text-green-500">Active</p> : <p className="text-yellow-500">Inactive</p>}</td>
                <td className="px-4 py-3 text-gray-700 dark:text-gray-400">
                  <button onClick={() => handleEditModal(item)}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                  </svg>
                  </button>
                </td>
              </tr>
          ))}
        </tbody>
      </table>
      <EditModal open={open} dataRow={dataRow} setOpen={setOpen} ref={modalRef} />
    </div>
    )
  )
}

export default ItemsTable