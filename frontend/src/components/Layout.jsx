import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useEffect, useState } from "react";
import { FinancialProvider } from "../contexts/financial.context";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
function Layout() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.querySelector("html")?.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <FinancialProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar theme={theme} setTheme={setTheme} />
        <main className="flex-grow my-12">
          <Outlet />
        </main>
        <Footer theme={theme} />
      </div>
    </FinancialProvider>
  );
}

export default Layout;
