type Table = {
  item_uuid: string;
  created_at: Date;
  merchant_uuid: string | null;
  item_name: string | null;
  item_price: number | null;
  is_available: boolean | null;
  item_type: string | null;
}[] | undefined;

interface Props {
  data: Table
}

const ItemsTable = ( props: Props ) => {
  const handleRowClick = () => {
    
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
          </tr>
        </thead>
        <tbody>
          {props.data?.map((item, idx) => (
              <tr className="border-b border-gray-200 dark:border-gray-700" onClick={handleRowClick}>
                <td className="px-4 py-3 font-medium text-gray-900 dark:text-gray-100">{item.item_name}</td>
                <td className="px-4 py-3 text-gray-700 dark:text-gray-400">{item.item_type}</td>
                <td className="px-4 py-3 text-gray-700 dark:text-gray-400">{item.item_price}</td>
                <td className="px-4 py-3 text-green-600 dark:text-green-400">{item.is_available ? <p className="text-green-500">Active</p> : <p className="text-yellow-500">Inactive</p>}</td>
              </tr>
          ))}
        </tbody>
      </table>
    </div>
    )
  )
}

export default ItemsTable