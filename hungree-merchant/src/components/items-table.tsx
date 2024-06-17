import EditModal from "./edit-modal";
import { useState, useRef } from "react";
import { Pagination } from "./pagination";

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
  data: TableRow[] | undefined;
  pageCount: number | undefined;
  currentPage: number;
  setCurrentPage:(currentPage: number) => void;
  searchTerm: string,
  setSearchTerm: (searchTerm: string) => void;
}

const ItemsTable = ( props: Props ) => {
  const [open, setOpen] = useState(false);
  const [dataRow, setDataRow] = useState<TableRow>();
  const modalRef = useRef<HTMLDialogElement | null>(null);
  const [searchQuery, setSearchQuery] = useState(props.searchTerm);

  const handleEditModal = (item: TableRow) => {
    setOpen(!open);
    setDataRow(item);
  }

  const handleSearch = () => {
    props.setCurrentPage(1);
    props.setSearchTerm(searchQuery);
  }

  const handleClear = () => {
    props.setSearchTerm('');
    setSearchQuery('');
  }

  return (
    !props.data?.length ? 
     <p className="text-3xl font-bold text-white">Nothing to show! Please add items to the menu</p> : ( 
    <>
    <div className="flex flex-row w-5/6 justify-between px-4 items-center">
      <div className="flex items-center w-1/3">
        <input name="search" placeholder="Search for items" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-400 block w-full p-2.5 dark:bg-black dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-300 dark:focus:border-gray-300 dark:shadow-sm-light"  required/>
        <button className="hover:bg-green-700 hover:border rounded-lg border-green-700" onClick={handleSearch}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10 text-gray-300 rounded-lg p-1">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
        </button>
        {props.searchTerm.length > 0 ? 
        <button className="text-white rounded-lg hover:bg-red-700 hover:border hover:border-red-700" onClick={handleClear}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10 text-gray-300 rounded-lg p-1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button> 
        : null}
      </div>
      <Pagination pageCount={props.pageCount} currentPage={props.currentPage} setCurrentPage={props.setCurrentPage} />
    </div>
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
    </>
    )
  )
}

export default ItemsTable