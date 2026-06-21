/* eslint-disable indent */
import { createBrowserRouter, RouterProvider} from "react-router";

// hook
import UserProvider from "@/hooks/context/UserProvider";
import CheckoutProvider from "./hooks/context/CheckoutProvider";

//auth
import Login from "@/pages/auth/Login.jsx";
import Register from "@/pages/auth/Register.jsx";
import ForgotPass from "@/pages/auth/ForgotPass.jsx";

// products
import BrowseProduct from "@/pages/Browse-prod.jsx";
import ProductDetails from "@/pages/details/ProductDetails.jsx";

// profiles
import Orders from "@/pages/profiles/Orders.jsx";
import ProfileLayout from "@/components/layouts/ProfileLayout.jsx"
import Address from "@/pages/profiles/Address.jsx"
import Wishlist from "@/pages/profiles/Wishlist.jsx"
import ProfileSettings from "@/pages/profiles/ProfileSettings.jsx";
import PaymentMethod from "@/pages/profiles/Payment-method.jsx";

// core
import Cart from "@/pages/core/Cart";
import CheckoutLayout from "@/components/layouts/CheckoutLayout";
import CheckoutDelivery from "@/pages/core/checkout/Deliver.jsx";
import Payment from "@/pages/core/checkout/Payment";
import Confirm from "@/pages/core/checkout/Confirm";
import Landing from "@/pages/Landing.jsx";
import CompleteCheckout from "./components/ui/CompleteCheckout";

// admin
import Dashboard from "@/pages/admin/Dashboard.jsx";
import Customers from "@/pages/admin/Customers.jsx";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import Products from "@/pages/admin/Products.jsx";
import Settings from "@/pages/admin/Settings.jsx";
import CustomersOrders from "@/pages/admin/Orders.jsx"

// protected route
import ProtectedRoute from "@/routes/ProtectedRoute";


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
    path:"/browse-product/:slugs",
    element: <BrowseProduct/>
  },
  {
    path:"/details/:category/:slugs",
    element: <ProductDetails/>
  },
  {
    path:"/cart",
    element:(
      <ProtectedRoute>
        <Cart/>
      </ProtectedRoute>
    )
  },
  
  // my profiles family trees
  {
    path:"/my-profiles",
    element: (
      <ProtectedRoute>
        <ProfileLayout/>
      </ProtectedRoute> 
    ),
    children:[{
      index:true,
      element:<Orders/> // first child
    },
    {
      path:"address",
      element: <Address/>
    },
    {
      path:"wishlist",
      element: <Wishlist/>
    },
    {
      path:"settings",
      element: <ProfileSettings/>
    },
    {
      path:"payment-method",
      element: <PaymentMethod/>
    },
    ]
  },

  // checkout family tress
  {
    path:"/checkout",
    element: (
     <ProtectedRoute>
      <CheckoutProvider>
        <CheckoutLayout/>
      </CheckoutProvider>
     </ProtectedRoute> 
    ),
    children: [{
      index: true,
      element: <CheckoutDelivery/> // first child
    },
    {
      path:"payment",
      element: <Payment/>
    },
    {
      path:"confirmation",
      element: <Confirm/>
    },
    ]
  },
  
  {
    path:"/checkout-complete",
    element: <CompleteCheckout/>
  },

  // admin family trees
  {
    path:"/dashboard",
    element: <DashboardLayout/>,
    children:[{
      index:true,
      element: <Dashboard/> // first child
    },
    {
      path:"customers",
      element: <Customers/>
    },
    {
      path:"Products",
      element: <Products/>
    },
    {
      path:"orders",
      element: <CustomersOrders/>
    }, 
    {
      path:"settings",
      element: <Settings/>
    },       
    ]
  },    

])

function App() {
  return (
    <UserProvider>
      <RouterProvider router={router}/>
    </UserProvider>
  )
}

export default App
