export default function RecentOrders({ orders }) {
  return (
    <div className="bg-white p-5 rounded-2xl border border-gray-200 h-full">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Recent Orders
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b text-left text-sm text-gray-500">
              <th className="pb-3">Order No</th>
              <th className="pb-3">Expected</th>
              <th className="pb-3">Scanned</th>
              <th className="pb-3">Status</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr
                key={order.saleOrderNo}
                className="border-b border-gray-100"
              >
                <td className="py-3">
                  {order.saleOrderNo}
                </td>

                <td className="py-3">
                  {order.expectedCount}
                </td>

                <td className="py-3">
                  {order.scannedCount}
                </td>

                <td className="py-3">
                  {order.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}