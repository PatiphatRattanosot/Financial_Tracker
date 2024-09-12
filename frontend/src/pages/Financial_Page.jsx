import { useEffect, useState } from "react";
import { useFinancial } from "../contexts/financial.context";
import Swal from "sweetalert2";
function Financial_Page() {
  const { records, delete_Financial } = useFinancial();
  const [financial, setFinancial] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const getFinancial = async () => {
      try {
        setFinancial(records);
      } catch (error) {
        console.error("Error fetching financial data:", error);
      }
    };

    getFinancial();
  }, [records]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = financial.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(financial.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDelete = async (id) => {
    try {
      await delete_Financial(id);

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Financial Record Delete",
        text: "Delete " + id + " successfully!",
        showConfirmButton: true,
      }).then(() => {
        // window.location.reload();
      });
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Restaurant Delete",
        text: error?.response?.data?.message || error.message,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  const columns = [
    { label: "ID", key: "id" },
    { label: "Amount", key: "amount" },
    { label: "Category", key: "category" },
    { label: "User ID", key: "userId" },
    { label: "Description", key: "description" },
    { label: "Date", key: "date" },
    { label: "Payment Method", key: "paymentMethod" },
  ];
  return (
    <div className="overflow-x-auto">
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
              {currentItems.length > 0 ? (
                currentItems.map((item) => (
                  <tr key={item.id}>
                    {columns.map((col) => (
                      <td
                        key={col.key}
                        className="px-6 py-4 whitespace-nowrap text-sm font-medium"
                      >
                        {item[col.key] || "N/A"}
                      </td>
                    ))}
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium ">
                      <a href={`/edit/${item.id}`} className="btn btn-info">
                        Edit
                      </a>
                      <a
                        onClick={() => handleDelete(item.id)}
                        className="btn btn-error ml-4"
                      >
                        Delete
                      </a>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={columns.length + 1}
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
                <th className="px-6 py-3"></th>
              </tr>
            </tfoot>
          </table>
        </div>
        <div className="flex justify-center mt-4 ">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="btn btn-secondary mr-2"
          >
            Previous
          </button>
          <span className="text-sm">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="btn btn-secondary ml-2"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Financial_Page;
