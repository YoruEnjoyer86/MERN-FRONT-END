import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Home from "./pages/home/home";
import Profile from "./pages/profile/profile";
import Favorites from "./pages/favorites/favorites";
import Shopping_Cart from "./pages/shopping_cart/shopping_cart";
import Add_product_to_database from "./pages/add_product_to_database/add_product_to_database";
import Order_completed from "./pages/order_completed/order_completed";
import Register from "./pages/Register/Register";
import App from "./components/App/App";
import Test from "./pages/test/test";

const app = <App />;

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "profile",
    element: <Profile />,
  },
  {
    path: "favorites",
    element: <Favorites />,
  },
  {
    path: "shopping_cart",
    element: <Shopping_Cart />,
  },
  {
    path: "add_product_to_database",
    element: <Add_product_to_database />,
  },
  {
    path: "order_completed",
    element: <Order_completed />,
  },
  {
    path: "register",
    element: <Register />,
  },
  {
    path: "test",
    element: <Test />,
  },
]);

const a = 1;

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App>
      <RouterProvider router={router} />
    </App>
  </React.StrictMode>
);
