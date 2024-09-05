import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useEffect, useState } from "react";

function Layout() {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.querySelector("html")?.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar theme={theme} setTheme={setTheme} />
      <main className="flex-grow my-12">
        <Outlet />
      </main>
      <Footer theme={theme} />
    </div>
  );
}

export default Layout;
