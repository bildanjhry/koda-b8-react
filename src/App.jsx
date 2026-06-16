import { createBrowserRouter, RouterProvider } from "react-router";

//auth
import Login from "@/pages/auth/Login.jsx";
import Register from "@/pages/auth/Register.jsx";
import ForgotPass from "@/pages/auth/ForgotPass.jsx";

// products
import BrowseProduct from "@/pages/Browse-prod.jsx";
import ProductDetails from "@/pages/details/ProductDetails.jsx";

// profiles
import Orders from "@/pages/profiles/Orders.jsx";
import Address from "@/pages/profiles/Address.jsx"
import Wishlist from "@/pages/profiles/Wishlist.jsx"
import ProfileSettings from "@/pages/profiles/ProfileSettings.jsx";
import PaymentMethod from "@/pages/profiles/Payment-method.jsx";

// core
import Cart from "@/pages/core/Cart";
import CheckoutDelivery from "@/pages/core/checkout/Deliver.jsx";
import Payment from "@/pages/core/checkout/Payment";
import Confirm from "@/pages/core/checkout/Confirm";

// admin
import Dashboard from "@/pages/admin/Dashboard.jsx";
import Customers from "@/pages/admin/Customers.jsx";
import Products from "@/pages/admin/Products.jsx";
import Settings from "@/pages/admin/Settings.jsx";
import CustomersOrders from "@/pages/admin/Orders.jsx"


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
    path:"/my-profiles",
    element: <Orders/>
  },
  {
    path:"/my-address",
    element: <Address/>
  },
  {
    path:"/wishlist",
    element: <Wishlist/>
  },
  {
    path:"/profile-settings",
    element: <ProfileSettings/>
  },
  {
    path:"/payment-method",
    element: <PaymentMethod/>
  },
  {
    path:"/cart",
    element: <Cart/>
  },
  {
    path:"/checkout",
    element: <CheckoutDelivery/>
  },  
  {
    path:"/checkout-payment",
    element: <Payment/>
  },  
  {
    path:"/checkout-confirmation",
    element: <Confirm/>
  }, 
  
  // admin pages
  {
    path:"/dashboard",
    element: <Dashboard/>
  },    
  {
    path:"/customers",
    element: <Customers/>
  },
  {
    path:"/Products",
    element: <Products/>
  },
  {
    path:"/orders",
    element: <CustomersOrders/>
  },
  {
    path:"/settings",
    element: <Settings/>
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
