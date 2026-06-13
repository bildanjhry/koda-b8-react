import { Link } from "react-router"
import { useEffect, useState } from "react"

// assets
import location from "@/assets/icons/location-white.svg"
import hamMenu from "@/assets/icons/ham-menu-black.svg"
import notif from "@/assets/icons/notif-mute.svg"
import profile from "@/assets/icons/profile-mute.svg"
import wishlist from "@/assets/icons/wishlist-mute.svg"
import cart from "@/assets/icons/cart-mute.svg"
import search from "@/assets/icons/search-white.svg"

// component
import Logo from "../ui/Logo"

export default function Navbar({notifActions}) {
  const [userData, setUserData] = useState({})
  const [totalCart, setTotalCart] = useState(0)

  useEffect(() => {
    function getUser(){
      const user = JSON.parse(window.localStorage.getItem("user"))
      setUserData(user)
      setTotalCart(user.cart.length)
    }
    getUser()
  },[setUserData, setTotalCart, notifActions])


  function handleSearch(e){
    e.preventDefault()
    try{
      const inputData = new FormData(e.target).get("search")
      // do search action here
      if(inputData) window.location.herf = "/browse-product"
    } catch(err){
      console.error(err.message)
    }
  }

  return (
    <div className="flex flex-col w-full h-fit fixed top-0 justify-center
		border-b-light items-center bg-white">
      <section className="flex flex main-bg justify-center w-full">
        <div className="h-[28px] text-[12px] flex flex-row justify-between 
				items-center w-[83%] text-light">
          <div className="w-fit flex gap-1 items-center">
            <img src={location} alt="location" />
            <p>Kirim ke: Jakarta Selatan</p>
          </div>
          <div className="flex flex-row justify-between w-[32%]">
            <p className="text-light">
							📞 0800-1234-5678 (Gratis)
            </p>
            <p className="text-light">
							🚀 Gratis ongkir di atas Rp 100.000
            </p>
          </div>
        </div>
      </section>
      <section className="w-full h-[64px] flex justify-center border-b-light ">
        <div className="w-[83%] h-full flex gap-3 border-b-light items-center 
				justify-self-center">
          <Logo />
          <div id="search" className="w-[45%]">
            <form id="search-input" 
              onSubmit={(e) => handleSearch(e)}
              action="" className="h-[40px] flex">
              <input 
                id="search"
                type="search" 
                name="search"
                placeholder="Cari produk, merek, kategori..."
                className="rounded-l-lg h-full w-[90%] input-bg pl-4 text-sm border-light"/>
              <button 
                type="submit"
                className="main-bg flex justify-center items-center rounded-r-lg h-full w-[10%]">
                <img src={search} alt="" />
              </button>
            </form>
          </div>
          <div className="h-full w-fit">
            <ul className="h-full flex gap-2 items-center">
              <li>
                <Link to={""} className="w-[40px] h-[40px] cursor-pointer flex justify-center 
								items-center">
                  <img src={notif} alt="notification" />
                </Link>
              </li>
              <li>
                <Link to={"/profile"} className="h-[40px] min-w-[40px] justify-center cursor-pointer flex items-center 
								gap-1">
                  <img src={profile} alt="profile" />
                  {userData && <p className="text-h text-sm">{userData?.fullname?.split(" ")[0]}</p>}
                </Link>
              </li>
              <li>
                <Link to={"/wishlist"} className="h-[40px] w-[40px] cursor-pointer flex items-center 
								justify-center">
                  <img src={wishlist} alt="wishlist" />
                </Link>
              </li>
              <li>
                <Link to={"/cart"} className="h-[40px] w-[40px] cursor-pointer flex items-center 
								justify-center relative">
                  {totalCart >= 1 && 
									<div className="rounded-full bg-(--info-bg) flex items-center justify-center text-light 
									text-[11px] absolute top-0 left-7 z-2 px-[6px] py-[1px]">
									  {totalCart}
									</div>}
                  <img src={cart} alt="wishlist" />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className="h-[41px] flex items-center gap-5 w-[83%] justify-self-center ">
		    <div className="flex gap-1 items-center h-full px-1 ">
          <img src={hamMenu} alt="category menu list" />
          <select name="cateogry" id="category" className="text-h">
            <option value="" disabled id="category">Semua Kategori</option>
          </select>
        </div>		
        <ul className="w-full h-full flex gap-8 text-sm">
          <li>
            <Link to={""} className="px-1 flex items-center h-full">
              <p><span></span> Elektorik</p>
            </Link>
          </li>
          <li>
            <Link to={""} className="px-1 flex items-center h-full">
              <p><span></span> Elektorik</p>
            </Link>
          </li>
          <li>
            <Link to={""} className="px-1 flex items-center h-full">
              <p><span></span> Elektorik</p>
            </Link>
          </li>
          <li>
            <Link to={""} className="px-1 flex items-center h-full">
              <p><span></span> Elektorik</p>
            </Link>
          </li>
          <li>
            <Link to={""} className="px-1 flex items-center h-full">
              <p><span></span> Elektorik</p>
            </Link>
          </li>
          <li>
            <Link to={""} className="px-1 flex items-center h-full">
              <p><span></span> Elektorik</p>
            </Link>
          </li>
          <li>
            <Link to={""} className="px-1 flex items-center h-full">
              <p><span></span> Elektorik</p>
            </Link>
          </li>
          <li>
            <Link to={""} className="px-1 flex items-center h-full">
              <p><span></span> Elektorik</p>
            </Link>
          </li>					
        </ul>
      </section>
    </div>
  )
}