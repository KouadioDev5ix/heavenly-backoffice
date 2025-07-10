import { Children } from "react";
import { createHashRouter, Navigate } from "react-router-dom";
import Login from "../Pages/Login/Login";
import BaseLayout from "../Layout/BaseLayout";
import Users from "../Pages/Users/Users";
import Products from "../Pages/Products/Products";
import Customers from "../Pages/Customers/Customers";
import Orders from "../Pages/Orders/Orders";
import Settings from "../Pages/Settings/Settings";
import Dashboard from "../Pages/Dashboard/Dashboard";
import userIsConnected from "../Utils/AuthGuard";
import ForgortPassword from "../Pages/ForgortPassword/ForgortPassword";

const RoutesGuard = () => {
  return userIsConnected() ? (
    <BaseLayout />
  ) : (
    <Navigate to="/authentification" />
  );
};

export const AppRouter = createHashRouter([
  // {
  //   path: "/authentification",
  //   element: userIsConnected() ? <Navigate to="/" /> : <Login />,
  // },

  {
    path: "/mot-de-pass-oublié",
    element: <ForgortPassword />,
  },
  {
    path: "/authentification",
    element: <Login />,
  },

  // {
  //   path: "/mot-de-pass-oublié",
  //   element: userIsConnected() ? <Navigate to="/" /> : <ForgortPassword />,
  // },

  {
    path: "/",
    element: <RoutesGuard />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/utilisateur",
        element: <Users />,
      },
      {
        path: "/produits",
        element: <Products />,
      },
      {
        path: "/clients",
        element: <Customers />,
      },
      {
        path: "/commandes",
        element: <Orders />,
      },
      {
        path: "/parametrage",
        element: <Settings />,
      },
    ],
  },
]);
