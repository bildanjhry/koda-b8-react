import { createBrowserRouter, RouterProvider } from "react-router";

//auth
import Login from "@/pages/auth/Login.jsx";
import Register from "@/pages/auth/Register.jsx";
import ForgotPass from "@/pages/auth/ForgotPass.jsx";

// products
import BrowseProduct from "@/pages/Browse-prod.jsx";
import ProductDetails from "@/pages/details/ProductDetails.jsx"

// profiles
import Orders from "@/pages/profiles/Orders.jsx";
import Address from "@/pages/profiles/Address.jsx"
import Wishlist from "@/pages/profiles/Wishlist.jsx"

import Landing from "@/pages/Landing.jsx";

const router = createBrowserRouter([
  {
    path:"/",
    element: <Landing/>
  },
  {
    path:"/login",
    element: <Login/>
  },
  {
    path:"/register",
    element: <Register/>
  },
  {
    path:"/forgot-pass",
    element: <ForgotPass/>
  },
  {
    path:"/browse-product/:id",
    element: <BrowseProduct/>
  },
  {
    path:"/details/:id",
    element: <ProductDetails/>
  },
  {
    path:"/profiles",
    element: <Orders/>
  },
  {
    path:"/profile-address",
    element: <Address/>
  },
  {
    path:"/profile-wishlist",
    element: <Wishlist/>
  },
])

function App() {
  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
