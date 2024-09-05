import { createBrowserRouter } from "react-router-dom";
import Financial_Page from "../pages/Financial_Page";
import AllUser_page from "../pages/AllUser_page";
import Layout from "../components/Layout";
import AddFinancial from "../pages/AddFinancial";
import Dashbord from "../pages/dashbord";
import Home from "../pages/Home";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/dashbord",
        element: <Dashbord />,
      },
      {
        path: "/financial",
        element: <Financial_Page />,
      },
      {
        path: "/user/financial",
        element: <AllUser_page />,
      },
      {
        path: "/add",
        element: <AddFinancial />,
      },
    ],
  },
]);

export default router;
