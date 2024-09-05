import React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import FinancialService from "../services/financial.service";
import { useUser } from "@clerk/clerk-react";
import { Children } from "react";

// export const FinancialContext = createContext();

// export const FinancialProvider = ({ children }) => {};

// export const userFinancial = () => useContext(FinancialContext);

export const FinancialContext = createContext();

export const FinancialProvider = ({ children }) => {
  const [records, setRecords] = useState([]);
  const { user } = useUser();

  const fetchRecords = async () => {
    if (!user) return;
    try {
      const response = FinancialService.getAllFinancialByUserId(user.id);
      console.log(response);
      if (response.status === 200) {
        console.log("asdasdasdasdasdas");
        setRecords(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, [user]);

  const add_Financial = async (financial) => {
    try {
      const response = await FinancialService.addFinancial(financial);
      if (response.status === 200) {
        setRecords((prev) => [...prev, response.data]);
      }
    } catch (error) {}
  };

  const update_Financial = async (id, newFinancial) => {
    try {
      const response = await FinancialService.updateFinancial(id, newFinancial);
      if (response.status === 200) {
        setRecords((prev) =>
          prev.map((record) => {
            if (record.id === id) {
              return newFinancial;
            } else {
              return record;
            }
          })
        );
      }
    } catch (error) {}
  };

  const delete_Financial = async (id) => {
    try {
      const response = FinancialService.deleteFinancial(id);
      if (response.status === 200) {
        setRecords((prev) => prev.filter((record) => record.id !== id));
      }
    } catch (error) {}
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
