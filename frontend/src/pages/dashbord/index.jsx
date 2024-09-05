import React from "react";
import { useFinancial } from "../../contexts/financial.context";
import { useUser } from "@clerk/clerk-react";
import AddFinancial from "../AddFinancial";
function index() {
  const { user } = useUser();
  const { records } = useFinancial();
  return (
    <div className="max-w-screen-2x1 container mx-auto xl:px-24 px-4">
      <div className="text-4xl md:text-3xl md:leading-snug font-bold my-2 ">
        Welcome {user?.firstName} ! Here are you financial:
      </div>

      <div className="overflow-x-auto flex mr-4">
        <AddFinancial />
        <table className="table table-xs">
          <thead>
            <tr>
              <th>Financial ID</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Category</th>
              <th>Payment Method</th>
            </tr>
          </thead>
          <tbody>
            {records &&
              records.map((record) => (
                <tr key={record.id}>
                  <td>{record.id}</td>
                  <td>{record.description}</td>
                  <td>{record.amount}</td>
                  <td>{record.date}</td>
                  <td>{record.category}</td>
                  <td>{record.paymentMethod}</td>
                </tr>
              ))}
          </tbody>
          <tfoot>
            <tr>
              <th>Financial ID</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Category</th>
              <th>Payment Method</th>
            </tr>
          </tfoot>
        </table>
      </div>
      <div className="">Total Monthly: 0000 ฿</div>
    </div>
  );
}

export default index;
