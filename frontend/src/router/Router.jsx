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
        element:  <Dashbord />,
      },
      {
        path: "/financial",
        element: <Financial_Page /> ,
      },
      {
        path: "/add",
        element:  <AddFinancial /> ,
      },{
        path:"/edit/:id",
        element:<EditRecord_Page/>
      },{
        path:"/notAllow",
        element:<NotAllow/>
      }
    ],
  },
]);

export default router;
