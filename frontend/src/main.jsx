import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import Home from "./routes/home";

import Account from "./routes/account";
import Login from "./routes/login"
import Logout from "./routes/logout"
import Callback from "./routes/callback"
import Register from "./routes/register"

import Biddings from "./routes/biddings";
import Listings from "./routes/listings";
import Item from "./routes/item";
import Items from "./routes/items";
import NewItem from "./routes/newItem";
import Notification from "./routes/notification";
import SellerItem from "./routes/selleritem"
import GetProfile from "./routes/getProfile"

const routes = [
  { path: "/", element: <Home /> },
  { path: "/home", element: <Home /> },

  { path: "/account", element: <Account /> },
  { path: "/login", element: <Login /> },
  { path: "/logout", element: <Logout /> },
  { path: "/register", element: <Register /> },
  { path: "/callback", element: <Callback /> },

  { path: "/newItem", element: <NewItem /> },
  { path: "/listings", element: <Listings /> },
  { path: "/biddings", element: <Biddings /> },
  { path: "/notification", element: <Notification /> },
  { path: "/items/:id", element: <Item /> },
  { path: "/items", element: <Items /> },
  { path: "/items/:id/edit", element: <SellerItem /> },

  { path: "/getProfile", element: <GetProfile /> },
];

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);