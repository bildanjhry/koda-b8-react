import { Outlet, useLocation, useNavigate, Link } from "react-router";

// hook
import useFetch from "@/hooks/useFetch";
import useUser from "@/hooks/useUser";

// asset
import ArrowRight from "@/assets/icons/bc-arrow-right-mute.svg"
import ArrowRightBlue from "@/assets/icons/bc-arrow-right-blue.svg"

export default function Content({isMobile, initial, user}){
  const {data: menus} = useFetch("/data/sidemenu-profiles.json")
  const {checkout, wishlist} = useUser("user")
  const location = useLocation()
  const path = location.pathname

  return(
    <div className="md:w-[80%] h-full flex flex-row 
      pt-12 pb-12">
      <aside className="w-[256px] h-[80%]">
        <div className="flex flex-col gap-3">
          <div className="rounded-xl bg-white items-center py-3 border-light flex 
                gap-2 flex-col">
            <div className="flex border-b-light w-[90%] py-4 flex-col gap-0 items-center">
              <div className="w-16 h-16 bg-(--accent-bg) rounded-full flex justify-center
                    items-center mb-3">
                <h2 className="text-(--text-high) ">{initial}</h2>
              </div>
              <h4 className="text-h font-bold text-lg">{user?.fullname}</h4>
              <p className="text-xs">{user?.email}</p>
            </div>

            <div className="flex flex-row gap-4 pb-2">
              <div className="flex flex-col gap-0 items-center">
                <h5 className="text-h font-semibold">{checkout.length}</h5>
                <p className="text-sm">Pesanan</p>
              </div>
              <div className="flex flex-col gap-0 items-center">
                <h5 className="text-h font-semibold">{wishlist.length}</h5>
                <p className="text-sm">Wishlist</p>
              </div>
            </div>
          </div>

          <div className="w-full bg-white rounded-xl border-light overflow-hidden">
            <ListSideMenu dataMenu={menus} path={path}/>
          </div>
        </div>
      </aside>

      <main className="w-[75%] flex justify-end">
        <Outlet/>
      </main>

    </div>	
  )
}


function ListSideMenu({dataMenu, path}){
  const navigate = useNavigate()
  
  function handleLogout(){
    window.localStorage.removeItem("user")
    navigate("/")
  }

  return(
    <ul className="w-full flex flex-col">
      {dataMenu?.map((item, index) => (
        <li key={index} className="">
          <Link 
            to={item.path}
            className={`h-13 w-full flex flex-row items-center
            hover:bg-(--accent-bg) justify-between px-4 ${item.path === path && 'bg-(--accent-bg)'}`}>
            <div className="flex flex-row gap-3 items-center">
              <img
                className="w-4 h-4" 
                src={item.path === path ? item.activeIcon : item.icon} alt={item.alt} />
              <p className={`${item.path === path && 'text-(--text-high)'} text-sm`}>{item.name}</p>
            </div>
            <img 
              className="w-3.5 h-3.5"
              src={item.path === path ? ArrowRightBlue : ArrowRight} alt="navigation" />
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