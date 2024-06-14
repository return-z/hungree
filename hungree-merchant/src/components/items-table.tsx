import { api } from "~/utils/api"

export default function ItemsTable() {
    const { data } = api.dashboard.getItems.useQuery();
    console.log(data);
    return (
      <div className="px-4 w-full">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800">
              <th className="px-4 py-3 font-medium text-gray-700 dark:text-gray-300">Item</th>
              <th className="px-4 py-3 font-medium text-gray-700 dark:text-gray-300">Type</th>
              <th className="px-4 py-3 font-medium text-gray-700 dark:text-gray-300">Price</th>
              <th className="px-4 py-3 font-medium text-gray-700 dark:text-gray-300">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-200 dark:border-gray-700 even:bg-gray-50 dark:even:bg-gray-850">
              <td className="px-4 py-3 font-medium text-gray-900 dark:text-gray-100">McVeggie</td>
              <td className="px-4 py-3 text-gray-700 dark:text-gray-400">Burger</td>
              <td className="px-4 py-3 text-gray-700 dark:text-gray-400">230</td>
              <td className="px-4 py-3 text-green-600 dark:text-green-400">Active</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }