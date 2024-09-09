import { createBrowserRouter } from "react-router-dom";
import Financial_Page from "../pages/Financial_Page";
import Layout from "../components/Layout";
import AddFinancial from "../pages/AddFinancial";
import Dashbord from "../pages/dashbord";
import Home from "../pages/Home";
import EditRecord_Page from "../pages/EditRecord_Page";
import NotUser from "../components/NotUser";

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
        element: <NotUser> <Dashbord /> </NotUser>,
      },
      {
        path: "/financial",
        element: <NotUser> <Financial_Page /> </NotUser>,
      },
      {
        path: "/add",
        element: <NotUser> <AddFinancial /> </NotUser>,
      },{
        path:"/edit/:id",
        element:<NotUser> <EditRecord_Page/> </NotUser>
      }
    ],
  },
]);

export default router;
