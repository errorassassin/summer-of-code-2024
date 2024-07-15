import React, { useState } from "react";
import * as ReactDOM from "react-dom/client";
import { Toaster, toast } from "react-hot-toast";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import "./index.css";
import LoginPage from "./pages/login/LoginPage";
import RegisterPage from "./pages/register/RegisterPage";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../src/components/Navbar';
import axios from 'axios';

import AdminDashboard from "./pages/admin/dashboard/AdminDashboard";
import AnalyticsPage from "./pages/admin/analytics/AnalyticsPage";
import AdminProductsPage from "./pages/admin/products/ProductsPage";
import CashierDashboard from "./pages/cashier/dashboard/CashierDashboard";
import CustomersPage from './pages/customers/CustomersPage';
import Cart from "./pages/cashier/cart/Cart";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.headers['Content-Type'] = 'application/json';
axios.defaults.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 403) {
      window.location.href = '/';
      toast.error('Please login again...');
    }
    return Promise.reject(error);
  }
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/admin",
    element: <>
      <Navbar role="admin" />
      <div className="container pt-[56px] md:pb-[12px] min-h-full">
        <Outlet />
      </div>
    </>,
    children: [
      {
        path: "",
        element: <AdminDashboard />,
      },
      {
        path: "customers",
        element: <CustomersPage />,
      },
      {
        path: "analytics",
        element: <AnalyticsPage />,
      },
      {
        path: "products",
        element: <AdminProductsPage />,
      },
      {
        path: "profile",
        element: <div>Profile</div>,
      },
    ]
  },
  {
    path: "/cashier",
    element: <>
      <Navbar role="cashier" />
      <div className="container pt-[56px] pb-[12px] min-h-full flex flex-col">
        <Outlet />
      </div>
    </>,
    children: [
      {
        path: "",
        element: <CashierDashboard />,
      },
      {
        path: "customers",
        element: <CustomersPage />,
      },
      {
        path: "profile",
        element: <div>Profile</div>,
      },
      {
        path: "cart",
        element: <Cart />,
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <Toaster position='top-center' />
  </React.StrictMode>
);

export { toast }
