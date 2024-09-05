import React from "react";
import { useState } from "react";
import FinancialService from "../services/financial.service";
import { useUser } from "@clerk/clerk-react";
import { useFinancial } from "../contexts/financial.context";
function AddFinancial() {
  const [financial, setfinancial] = useState({
    description: "",
    amount: "",
    category: "",
    date: "",
    paymentMethod: "",
  });

  const { add_Financial } = useFinancial;
  const { user } = useUser();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setfinancial({ ...financial, [name]: value });
  };

  const handleClick = async (e) => {
    try {
      const response = FinancialService.addFinancial(financial);
      console.log(response);
      if (response.status === 200) {
        alert("200");
      }
    } catch (error) {
      alert(error?.data?.message || "err");
    }
  };

  const categories = [
    "Food",
    "Transport",
    "Entertainment",
    // Add more categories as needed
  ];

  const paymentMethods = [
    "Credit Card",
    "Debit Card",
    "PayPal",
    // Add more payment methods as needed
  ];

  return (
    <div className="card bg-base-100 shadow-xl p-6 w-full max-w-md mx-auto">
      <label>
        <div className="mb-4">
          <label htmlFor="amount" className="block text-gray-700">
            Amount
          </label>
          <input
            type="text"
            id="amount"
            name="amount"
            value={financial.amount}
            onChange={handleChange}
            className="input input-bordered w-full mt-1"
            placeholder="Amount"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="category" className="block text-gray-700">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={financial.category}
            onChange={handleChange}
            className="select select-bordered w-full mt-1"
          >
            <option value="" disabled>
              Select Category
            </option>
            {categories.map((category) => (
              <option key={category} value={category.toLowerCase()}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700">
            Description
          </label>
          <input
            type="text"
            id="description"
            name="description"
            value={financial.description}
            onChange={handleChange}
            className="input input-bordered w-full mt-1"
            placeholder="Description"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="date" className="block text-gray-700">
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={financial.date}
            onChange={handleChange}
            className="input input-bordered w-full mt-1"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="paymentMethod" className="block text-gray-700">
            Payment Method
          </label>
          <select
            id="paymentMethod"
            name="paymentMethod"
            value={financial.paymentMethod}
            onChange={handleChange}
            className="select select-bordered w-full mt-1"
          >
            <option value="" disabled>
              Select Payment Method
            </option>
            {paymentMethods.map((method) => (
              <option
                key={method}
                value={method.toLowerCase().replace(/\s+/g, "-")}
              >
                {method}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-end">
          <button onClick={handleClick} className="btn btn-primary">
            Add Record
          </button>
        </div>
      </label>
    </div>
  );
}

export default AddFinancial;
