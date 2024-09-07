import React from "react";
import { useFinancial } from "../../contexts/financial.context";
import { useUser } from "@clerk/clerk-react";
import AddFinancial from "../AddFinancial";
import Financial_Page from "../Financial_Page";
function index() {
  const { user } = useUser();
  return (
    <div className="max-w-screen-2x1 container mx-auto xl:px-24 px-4">
      <div className="items-center justify-center">
        <div className="text-4xl md:text-3xl md:leading-snug font-bold my-2 text-center">
          Welcome <span className="text-rose-700">{user?.firstName}</span> ! Here are your financials
        </div>
      </div>


      <div className="overflow-x-auto mr-4 space-x-4 ">
        <AddFinancial />
        <Financial_Page />
      </div>

      <div className="">Total Monthly: 0000 ฿</div>
    </div>
  );
}

export default index;
