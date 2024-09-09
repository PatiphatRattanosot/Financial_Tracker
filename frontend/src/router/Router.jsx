import { createBrowserRouter } from "react-router-dom";
import Financial_Page from "../pages/Financial_Page";
import Layout from "../components/Layout";
import AddFinancial from "../pages/AddFinancial";
import Dashbord from "../pages/dashbord";
import Home from "../pages/Home";
import EditRecord_Page from "../pages/EditRecord_Page";
import IsUser from "../components/NotUser";
import NotAllow from "../pages/NotAllow";
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
        element: <IsUser> <Dashbord /> </IsUser>,
      },
      {
        path: "/financial",
        element: <IsUser> <Financial_Page /> </IsUser>,
      },
      {
        path: "/add",
        element: <IsUser> <AddFinancial /> </IsUser>,
      },{
        path:"/edit/:id",
        element:<IsUser> <EditRecord_Page/> </IsUser>
      },{
        path:"/notAllow",
        element:<NotAllow/>
      }
    ],
  },
]);

export default router;
