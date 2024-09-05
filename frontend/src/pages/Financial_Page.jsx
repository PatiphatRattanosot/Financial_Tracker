import { useEffect, useState } from "react";
import FinancialService from "../services/financial.service";

function Financial_Page() {
  const [financial, setFinancial] = useState([]);

  useEffect(() => {
    const getFinancial = async () => {
      try {
        const response = await FinancialService.getAllFinancial();
        console.log(response);
        const formattedData = response.data.map((item) => ({
          ...item,
          date: new Date(item.date).toLocaleDateString(),
          createdAt: new Date(item.createdAt).toLocaleDateString(),
          updatedAt: new Date(item.updatedAt).toLocaleDateString(),
        }));
        setFinancial(formattedData);
      } catch (error) {
        console.error("Error fetching financial data:", error);
      }
    };

    getFinancial();
  }, []);

  // Define table columns based on your data structure
  const columns = [
    { label: "Financial ID", key: "id" },
    { label: "Amount", key: "amount" },
    { label: "Category", key: "category" },
    { label: "User ID", key: "userId" },
    { label: "Description", key: "description" },
    { label: "Date", key: "date" },
    { label: "Payment Method", key: "paymentMethod" },
    { label: "Created At", key: "createdAt" },
    { label: "Updated At", key: "updatedAt" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <div className="overflow-x-auto flex-grow">
        <table className="table w-full table-striped table-bordered">
          <thead>
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {financial.length > 0 ? (
              financial.map((item) => (
                <tr key={item.id}>
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className="px-6 py-4 whitespace-nowrap text-sm font-medium"
                    >
                      {item[col.key] || "N/A"}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-4 text-center text-sm font-medium"
                >
                  No data available
                </td>
              </tr>
            )}
          </tbody>
          <tfoot>
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
export default Financial_Page;
