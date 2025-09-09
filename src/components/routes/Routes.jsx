import { createBrowserRouter } from "react-router-dom";
import Login from "../authentication/login/Login";
import Signup from "../authentication/signup/Signup";
import AddItems from "../dashboard/admin/addItems/AddItems";
import AdminHome from "../dashboard/admin/adminHome/AdminHome";
import ManageItems from "../dashboard/admin/manageItems/ManageItems";
import UpdateItem from "../dashboard/admin/updateItem/UpdateItem";
import AllUsers from "../dashboard/allUsers/AllUsers";
import Cart from "../dashboard/cart/Cart";
import Payment from "../dashboard/payment/payment/Payment";
import PaymentHistory from "../dashboard/payment/paymentHistory/PaymentHistory";
import UserHome from "../dashboard/user/userHome/UserHome";
import Home from "../home/home/Home";
import Dashboard from "../layout/dashboard/Dashboard";
import Main from "../layout/Main";
import Menu from "../pages/menu/Menu";
import Order from "../pages/order/Order";
import ViewItem from "../pages/order/viewItem/viewItem";
import AdminRoute from "./adminRoute/AdminRoute";
import PrivateRoute from "./privateRoute/PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/menu",
        element: <Menu></Menu>,
      },
      {
        path: "/order/:category",
        element: <Order></Order>,
      },

      {
        path: "viewItem/:id",
        element: <ViewItem></ViewItem>,
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_baseURL}/menu/${params.id}`),
      },

      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signup",
        element: <Signup></Signup>,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      // {
      //   path: "userHome",
      //   element: <UserHome></UserHome>,
      // },
      {
        path: "cart",
        element: <Cart></Cart>,
      },
      {
        path: "users",
        element: <AllUsers></AllUsers>,
      },

      {
        path: "payment",
        element: <Payment></Payment>,
      },

      {
        path: "paymentHistory",
        element: <PaymentHistory></PaymentHistory>,
      },
      {
        path: "userHome",
        element: <UserHome></UserHome>,
      },

      //admin routes
      {
        path: "adminHome",
        element: (
          <AdminRoute>
            <AdminHome></AdminHome>
          </AdminRoute>
        ),
      },
      {
        path: "addItems",
        element: (
          <AdminRoute>
            <AddItems></AddItems>
          </AdminRoute>
        ),
      },
      {
        path: "manageItems",
        element: (
          <AdminRoute>
            <ManageItems></ManageItems>
          </AdminRoute>
        ),
      },

      {
        path: "updateItem/:id",
        element: (
          <AdminRoute>
            <UpdateItem></UpdateItem>
          </AdminRoute>
        ),
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_baseURL}/menu/${params.id}`),
      },
    ],
  },
]);
