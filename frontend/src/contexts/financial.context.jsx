import React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import FinancialService from "../services/financial.service";
import { format } from "date-fns";
import { useUser } from "@clerk/clerk-react";
import Swal from "sweetalert2";
// export const FinancialContext = createContext();

// export const FinancialProvider = ({ children }) => {};

// export const userFinancial = () => useContext(FinancialContext);

export const FinancialContext = createContext();

export const FinancialProvider = ({ children }) => {
  const [records, setRecords] = useState([]);
  const [swap, setSwap] = useState(false);
  const { user } = useUser();

  const fetchRecords = async () => {
    if (!user) return;
    try {
      const response = await FinancialService.getAllFinancialByUserId(user.id);

      if (response.status === 200) {
        const formattedRecords = response.data.map((record) => ({
          ...record,
          date: format(new Date(record.date), " dd - MMM - yyyy"),
        }));
        setRecords(formattedRecords);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, [user, swap]);

  const add_Financial = async (financial) => {
    try {
      const response = await FinancialService.addFinancial(financial);

      if (response.status === 200) {
        setRecords((prev) => [...prev, response.data]);
        setSwap(!swap);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Add Financial Record",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Failed to add record",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Error in add_Financial",
        showConfirmButton: false,
        timer: 1500,
      });
      console.error("Error in add_Financial:", error);
    }
  };

  const update_Financial = async (id, newFinancial) => {
    try {
      const response = await FinancialService.updateFinancial(id, newFinancial);
      console.log("response from update_Financial ", response);
      if (response.status === 200) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Update Financial Record",
          showConfirmButton: false,
          timer: 1500,
        });
        setRecords((prev) =>
          prev.map((record) => {
            if (record.id === id) {
              return newFinancial;
            } else {
              return record;
            }
          })
        );
        setSwap(!swap);
      }
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Update Financial Record fail..",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const delete_Financial = async (id) => {
    try {
      const response = await FinancialService.deleteFinancial(id);
      if (response.status === 200) {
        console.log(swap);
        setSwap(!swap);
        setRecords((prev) => prev.filter((record) => record.id !== id));
      }
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Detele Financial Record fail..",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <FinancialContext.Provider
      value={{ records, add_Financial, update_Financial, delete_Financial }}
    >
      {children}
    </FinancialContext.Provider>
  );
};

export const useFinancial = () => useContext(FinancialContext);
