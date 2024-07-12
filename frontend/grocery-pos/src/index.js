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
import CashierDashboard from "./pages/cashier/dashboard/CashierDashboard";
import CustomersPage from './pages/customers/CustomersPage';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.headers['Content-Type'] = 'application/json';
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 403) {
      toast.error('Please login again...');
      window.location.href = '/';
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
      <div className="container pt-[56px] pb-[20px]">
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
        path: "profile",
        element: <div>Profile</div>,
      },
    ]
  },
  {
    path: "/cashier",
    element: <>
      <Navbar role="cashier" />
      <div className="container pt-[56px] pb-[20px] h-full flex flex-col">
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
