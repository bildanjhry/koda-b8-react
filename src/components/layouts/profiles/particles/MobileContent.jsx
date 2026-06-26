import { Outlet, useLocation, useNavigate, Link } from "react-router";

// hook
import useFetch from "@/hooks/useFetch";

// component
import ProfileNavbar from "@/components/features/ProfileNavbar";

// asset
import ArrowRight from "@/assets/icons/bc-arrow-right-mute.svg"
import { IoWalletOutline } from "react-icons/io5";
import { LiaBoxOpenSolid } from "react-icons/lia";
import { LiaTruckSolid } from "react-icons/lia";
import { SlStar } from "react-icons/sl";
import { BiEditAlt } from "react-icons/bi";

export default function Content({initial, user}){
  const {data: menus} = useFetch("/data/sidemenu-profiles.json")
  const location = useLocation()
  const path = location.pathname

  return(
    <div className="md:w-[80%] w-full h-fit flex flex-col
       pb-1 my-0 mx-auto relative items-center">
      <aside className="full pb-20 w-[95%]">
        <div className="flex flex-col gap-3">
          <div className="rounded-xl bg-white items-center py-2 border-light flex 
            gap-2 flex-col">
            <div className="flex w-[90%] gap-3 py-4 flex-row h-full items-center">
              <div className="w-22 h-22 bg-(--accent-bg) rounded-full flex justify-center
                items-center mb-3">
                <h2 className="text-(--text-high) ">{initial}</h2>
              </div>

              <div className="flex justify-between h-full w-[70%]">
                <div className="flex flex-col justify-start h-full">
                  <h4 className="text-h font-bold text-2xl">{user?.fullname}</h4>
                  <p className="text-md">{user?.email}</p>
                </div>
                <Link 
                  className=""
                  to={"/"}>
                  <BiEditAlt/>
                </Link>
              </div>
            </div>
          </div>

          <div className="w-full p-4 pb-8 rounded-xl border-light bg-white flex 
            gap-6 flex-col">
            <h4 className="text-h">Pesanan Saya</h4>
            <div className="grid grid-cols-4 justify-between gap-1">
              <Link className="flex flex-col rounded-xl items-center gap-2">
                <div className="w-10 h-10 bg-(--accent-bg) rounded-xl flex 
                justify-center items-center">
                  <IoWalletOutline size={20} className="text-(--text-high)"/>
                </div>
                <p className="text-[10px] text-h">Belum Bayar</p>
              </Link>
              <Link className="flex flex-col rounded-xl items-center gap-2">
                <div className="w-10 h-10 bg-(--accent-bg) rounded-xl flex 
                justify-center items-center">
                  <LiaBoxOpenSolid size={20} className="text-(--text-high)"/>
                </div>
                <p className="text-[10px] text-h">Dikemas</p>
              </Link>
              <Link className="flex flex-col rounded-xl items-center gap-2">
                <div className="w-10 h-10 bg-(--accent-bg) rounded-xl flex 
                justify-center items-center">
                  <LiaTruckSolid size={20} className="text-(--text-high)"/>
                </div>
                <p className="text-[10px] text-h">Dikirim</p>
              </Link>
              <Link className="flex  flex-col rounded-xl items-center gap-2">
                <div className="w-10 h-10 bg-(--accent-bg) rounded-xl flex 
                justify-center items-center">
                  <SlStar size={20} className="text-(--text-high)"/>
                </div>
                <p className="text-[10px] text-h">Beri Nilai</p>
              </Link>
            </div>
            <div className="border-t border-(--border)">

            </div>
          </div>

          <div className="w-full bg-white rounded-xl border-light overflow-hidden">
            <ListSideMenu dataMenu={menus} path={path}/>
          </div>
        </div>
      </aside>

      {/* <main className="w-[75%] flex justify-end">
        <Outlet/>
      </main> */}
      <div className="bg-white fixed bottom-0 w-full h-15 py-1">
        <ProfileNavbar/>
      </div>
    </div>	
  )
}


function ListSideMenu({dataMenu, path}){
  const navigate = useNavigate()
  
  function handleLogout(){
    window.localStorage.removeItem("user")
    navigate("/login")
  }

  return(
    <ul className="w-full flex flex-col">
      {dataMenu?.map((item, index) => (
        <li key={index} className="">
          <Link 
            to={item.path}
            className={`h-13 w-full flex flex-row items-center
            hover:bg-(--accent-bg) justify-between px-4`}>
            <div className="flex flex-row gap-3 items-center">
              <img
                className="w-4 h-4" 
                src={item.icon} alt={item.alt} />
              <p className={`text-sm`}>{item.name}</p>
            </div>
            <img 
              className="w-3.5 h-3.5"
              src={ArrowRight} alt="navigation" />
          </Link>
        </li>
      ))}
      <li className="border-t border-(--border)">
        <button
          onClick={handleLogout}
          className="h-13 w-full flex flex-row items-center 
          hover:bg-(--accent-bg) justify-between px-4 cursor-pointer">
          <div className="flex flex-row gap-3 items-center">
            <img
              className="w-4 h-4" 
              src={"/images/profilesMenu/out-red.svg"} alt="my orders" />
            <p className="text-(--text-info) text-sm">Keluar</p>
          </div>
        </button>
      </li>
    </ul>
  )
}