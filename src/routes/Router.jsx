import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";

import RootLayout from "../layouts/RootLayout";
import ProductsLayout from "../layouts/ProductsLayout";
import Compare from "../pages/Compare";
import Wishlist from "../pages/Wishlist";
import Products from "../pages/Products";
import Home from "../pages/Home";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import ProductDetails from "../pages/ProductDetails";
import CategoryList from "../pages/CategoryList";
import NotFound404 from "../pages/NotFound404";

export const route = createBrowserRouter([
  { path: "*", element: <Navigate to="/404" /> },
  { path: "/404", element: <NotFound404 /> },

  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "wishlist", element: <Wishlist /> },
      { path: "cart", element: <Cart /> },
      { path: "checkout", element: <Checkout /> },
      { path: "compare", element: <Compare /> },


      {
        path: "products",
        element: <ProductsLayout />,
        children: [
          { index: true, element: <Products /> },
          { path: ":category", element: <Products /> },
          { path: "details/:id", element: <ProductDetails /> }  
        ]
      }
    ]
  }
]);
