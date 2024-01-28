import { Navigate, useRoutes } from "react-router-dom";
import DefaultLayout from "../layouts";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import Products from '../pages/product';
import MyCart from '../pages/cart'
import ProductDetail from "../pages/product/ProductDetail";

export default function Router() {
  return useRoutes([
    {
      path: "/",
      element: <DefaultLayout />,
      children: [
        { element: <Navigate to="/" replace />, index: true },
        { path: "login", element: <Login /> },
        { path: "signup", element: <Signup /> },
        { path: "products", element: <Products /> },
        { path: "product/:productId", element: <ProductDetail/>},
        { path: "cart", element: <MyCart /> },
      ],
    },
  ]);
}