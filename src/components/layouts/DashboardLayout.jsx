import { Link } from "react-router"
import { useLocation } from "react-router"

// component
import Logo from "@/components/ui/Logo.jsx"

// asset
import Cross from "@/assets/icons/cross-black.svg"
import Notif from "@/assets/icons/notif-mute.svg"
import Dashboard from "@/assets/icons/dashboard-accent.svg"
import DashboardWhite from "@/assets/icons/dashboard-white.svg"

import Box from "@/assets/icons/box-accent.svg"
import BoxWhite from "@/assets/icons/box-white.svg"

import Cart from "@/assets/icons/cart-accent.svg"
import CartWhite from "@/assets/icons/cart-white.svg"

import Customers from "@/assets/icons/customers-mute.svg"
import CustomersWhite from "@/assets/icons/customers-white.svg"

import Settings from "@/assets/icons/settings-mute.svg"

export default function DashboardLayout({children}){
  const url = useLocation().pathname

  const sideMenu = [
    {
      id:"1da",
      name:"Dashboard",
      icon:[DashboardWhite, Dashboard],
      path:"/dashboard"
    },
    {
      id:"2pr",
      name:"Produk",
      icon:[BoxWhite, Box],
      path:"/products"
    },
    {
      id:"3pe",
      name:"Pesanan",
      icon:[CartWhite, Cart],
      path:"/orders"
      
    },
    {
      id:"4pe",
      name:"Pelanggan",
      icon:[CustomersWhite, Customers],
      path:"/customers"
      
    },
    {
      id:"5pe",
      name:"Pengaturan",
      icon:[Settings, Settings],
      path:"/settings"
    },  

  ]

  return(
    <div className="w-full flex flex-row min-h-screen justify-between">
      <aside className="flex flex-col w-60 px-2 bg-(--primary-bg) text-(--text-accent)">
        <div className="border-b-(--accent-border) h-16 gap-1 flex items-center">
          <Logo scheme={"dark"}/>
          <p className="text-white">Admin</p>
        </div>
        <ul className="flex flex-col mt-4">
          {sideMenu.map((item) => (
            <li key={item.id}>
              <Link
                className={"flex gap-3 items-center h-11 hover:bg-(--accent-bg) rounded-xl pl-4"+ 
                ` ${item.path === url && 'bg-(--main-bg) hover:bg-(--main-bg)'}`}
                to={item.path}
              >
                <img 
                  className="w-[18px]"
                  src={item.path === url ? item.icon[0] : item.icon[1]} alt="menu" />
                <p className={"text-sm" + ` ${item.path === url && 'text-white'}`}>{item.name}</p>
              </Link>
            </li>
          ))}
        </ul>
        <div>

        </div>
      </aside>
      <main className="flex flex-col w-[84.5%]">

        <nav className="flex justify-between items-center px-6 bg-white h-16">
          <div className="flex items-center gap-2">
            <button>
              <img src={Cross} alt="" />
            </button>
            <p>Admin</p>
          </div>
          <div className="flex items-center gap-4">
            <button>
              <img src={Notif} alt="" />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full flex justify-center items-center 
              bg-(--accent-bg)">
                <p className="text-(--text-high)">A</p>
              </div>
              <p>Admin</p>
            </div>
          </div>
        </nav>

        <div>
          {children}
        </div>
        
      </main>
    </div>
  )
}