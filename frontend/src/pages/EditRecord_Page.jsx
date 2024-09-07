import React from "react";
import { useState, useEffect  } from "react";
import { useParams ,useNavigate} from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { useFinancial } from "../contexts/financial.context";
import FinancialService from "../services/financial.service";
import Swal from 'sweetalert2'
function EditRecord_page() {
    const { user } = useUser();
    const { update_Financial } = useFinancial();
    const { id } = useParams();
    const navigate = useNavigate();
    const [financial, setFinancial] = useState({
        description: "",
        amount: "",
        category: "",
        date: "",
        paymentMethod: "",
        userId: "",
    });

    useEffect(() => {
        const getFinancialById = async () => {
            try {
                const response = await FinancialService.getByFinancialId(id);
                const data = response.data;
                
                const formattedDate = data.date ? new Date(data.date).toISOString().split('T')[0] : "";
                
                setFinancial({
                    ...data,
                    date: formattedDate
                });
                
            } catch (error) {
                console.error("Error fetching financial data:", error);
            }
        };
        getFinancialById();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFinancial({ ...financial, [name]: value });
    };

    const handleClick = async () => {
        try {
            const updatedFinancial = { ...financial, userId: user.id };
            console.log("Updated financial:", updatedFinancial);
            
            await update_Financial(id,updatedFinancial);
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Your work has been saved",
                showConfirmButton: false,
                timer: 1500
              });
            navigate("/dashbord")
            setTimeout(() => {
                window.location.reload();
              }, 500);
          } catch (error) {
            console.error("Error in handleClick:", error);
            Swal.fire({
                position: "center",
                icon: "error",
                title: error?.response?.data?.message || "An error occurred",
                showConfirmButton: false,
                timer: 1500
              });
            
          }
    };

    const categories = [
        "Food",
        "Transport",
        "Entertainment",
    ];

    const paymentMethods = [
        "Credit Card",
        "Debit Card",
        "PayPal",
    ];

    return (
        <div className="card bg-base-100 p-6 w-full max-w-md mx-auto">
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
                        placeholder=""
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
                        Update Record
                    </button>
                </div>
            </label>
        </div>
    );
}

export default EditRecord_page;
