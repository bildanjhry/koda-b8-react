import MainLayout from "@/components/layouts/MainLayout";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";

// asset
import ArrowRight from "@/assets/icons/bc-arrow-right-mute.svg"
import ArrowRightBlue from "@/assets/icons/bc-arrow-right-blue.svg"

export default function Orders(){
  const [initial, setInitial] = useState()
  const [user, setUser] = useState()
  const [dataMenu, setDataMenu] = useState()
  const location = useLocation()
  const path = location.pathname

  useEffect(() => {
    function getUser(){
      const user = JSON.parse(window.localStorage.getItem("user"))
      if(user) setUser(user)
      setInitial(user.fullname[0].toUpperCase())
    }
    getUser()

  },[])

  useEffect(() => {
    async function getSideMenu(count = 3){
      try{
        const res = await fetch("/data/sideMenuProfiles.json")
        const data = await res.json()
        console.log(data)
        setDataMenu(data)
      } catch(err){
        // will retry 3 times if error happend
        if(count >= 1) getSideMenu(count-1)
        return console.error(err.message)
      }
    }

    getSideMenu()
  },[])


  return (
    <MainLayout>
      <div className="w-[80%] h-[100vh] flex flex-row 
        pt-12">
        <aside className="w-[256px] h-[80%]">
          <div className="flex flex-col gap-3">
            <div className="rounded-xl bg-white items-center py-3 border-light flex 
            gap-2 flex-col">
              <div className="flex border-b-light w-[90%] py-4 flex-col gap-0 items-center">
                <div className="w-[64px] h-[64px] bg-(--accent-bg) rounded-full flex justify-center
                items-center mb-3">
                  <h2 className="text-(--text-high) ">{initial}</h2>
                </div>
                <h4 className="text-h font-[700] text-lg">{user?.fullname}</h4>
                <p className="text-xs">{user?.email}</p>
              </div>

              <div className="flex flex-row gap-4 pb-2">
                <div className="flex flex-col gap-0 items-center">
                  <h5 className="text-h font-[600]">{user?.checkout.length}</h5>
                  <p className="text-sm">Pesanan</p>
                </div>
                <div className="flex flex-col gap-0 items-center">
                  <h5 className="text-h font-[600]">{user?.wishlist.length}</h5>
                  <p className="text-sm">Wishlist</p>
                </div>
              </div>
            </div>

            <div className="w-full bg-white rounded-xl border-light overflow-hidden">
              <ListSideMenu dataMenu={dataMenu}/>
            </div>

          </div>

        </aside>
        <main>
        </main>
      </div>
    </MainLayout>
  )
}

function ListSideMenu({dataMenu}){

  return(
    <ul className="w-full flex flex-col">
      {dataMenu?.map((item, index) => (
        <li key={index} className="">
          <Link 
            to={item.path}
            className="h-[52px] w-full flex flex-row items-center
            hover:bg-(--accent-bg) justify-between px-4">
            <div className="flex flex-row gap-3 items-center">
              <img
                className="w-[16px] h-[16px]" 
                src={item.icon} alt="my orders" />
              <p className=" text-sm">{item.name}</p>
            </div>
            <img 
              className="w-[14px] h-[14px]"
              src={ArrowRight} alt="" />
          </Link>
        </li>
      ))}
      <li className="border-t border-(--border)">
        <button
          className="h-[52px] w-full flex flex-row items-center 
          hover:bg-(--accent-bg) justify-between px-4 cursor-pointer">
          <div className="flex flex-row gap-3 items-center">
            <img
              className="w-[16px] h-[16px]" 
              src={"/images/profilesMenu/out-red.svg"} alt="my orders" />
            <p className="text-(--text-info) text-sm">Keluar</p>
          </div>
        </button>
      </li>
    </ul>
  )
}