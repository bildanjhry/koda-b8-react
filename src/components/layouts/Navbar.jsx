import { Link } from "react-router"
import { useContext } from "react"

// custom hook
import useFetch from "@/hooks/useFetch.js"
import useUser from "@/hooks/useUser"
import { UserContext } from "@/hooks/context/UserContext"

// assets
import location from "@/assets/icons/location-white.svg"
import hamMenu from "@/assets/icons/ham-menu-black.svg"
import notif from "@/assets/icons/notif-mute.svg"
import profile from "@/assets/icons/profile-mute.svg"
import wishlist from "@/assets/icons/wishlist-mute.svg"
import Cart from "@/assets/icons/cart-mute.svg"
import search from "@/assets/icons/search-white.svg"

// component
import Logo from "@/components/ui/Logo"
import AuthNavbar from "@/components/ui/Auth"

export default function Navbar() {
  const { user, userName } = useUser()
  const [globalCart] = useContext(UserContext)

  const {data: categories} = useFetch("/data/categories.json")

  function handleSearch(e){
    e.preventDefault()
    try{
      const inputData = new FormData(e.target).get("search")
      if(inputData) window.location.herf = "/browse-product"
    } catch(err){
      console.error(err.message)
    }
  }

  return (
    <div className="flex flex-col w-full h-fit fixed top-0 justify-center 
      border-b-light items-center bg-white z-10">

      <section className="main-bg hidden md:flex justify-center w-full">
        <div className="h-7 text-[12px] flex flex-row justify-between 
				items-center w-[83%] text-light large:w-315">
          <div className="w-fit flex gap-1 items-center">
            <img src={location} alt="location" />
            <p>Kirim ke: Jakarta Selatan</p>
          </div>
          <div className="flex flex-row justify-between w-[32%] ">
            <p className="text-light">
							📞 0800-1234-5678 (Gratis)
            </p>
            <p className="text-light">
							🚀 Gratis ongkir di atas Rp 100.000
            </p>
          </div>
        </div>
      </section>

      <section className="w-full h-16 flex justify-center border-b-light ">
        <div className="w-[95%] md:w-[83%] h-full flex gap-3 border-b-light items-center 
				justify-self-center large:w-315">
          <Logo />
          <div id="search" className="w-full md:w-[45%]">
            <form id="search-input" 
              onSubmit={(e) => handleSearch(e)}
              action="" className="h-11 md:h-10 flex">
              <input 
                id="search"
                type="search" 
                name="search"
                placeholder="Cari produk, merek, kategori..."
                className="rounded-l-lg h-full w-[90%]
                input-bg pl-4 text-sm border-light"/>
              <button 
                type="submit"
                className="main-bg flex justify-center items-center rounded-r-lg 
                h-full w-[15%] md:w-[10%]">
                <img src={search} alt="search" />
              </button>
            </form>
          </div>
          <div className="h-full fixed w-fit md:flex items-center">
            { !user.id ?
              <div className="flex items-center justify-end w-55">
                <AuthNavbar/>
              </div>
              :
              <ul className="h-full flex gap-2 items-center">
                <li>
                  <Link to={""} className="w-10 h-10 cursor-pointer 
                  flex justify-center items-center">
                    <img src={notif} alt="notification" />
                  </Link>
                </li>
                <li>
                  <Link to={"/my-profiles"} className="h-10 min-w-10 justify-center 
                  cursor-pointer flex items-center gap-1">
                    <img src={profile} alt="profile" />
                    <p className="text-h text-sm">{userName}</p>
                  </Link>
                </li>
                <li>
                  <Link to={"/my-profiles/wishlist"} className="h-10 w-10 cursor-pointer 
                  flex items-center justify-center">
                    <img src={wishlist} alt="wishlist" />
                  </Link>
                </li>
                <li>
                  <Link to={"/cart"} className="h-10 w-10 cursor-pointer flex items-center 
								  justify-center relative">
                    {globalCart?.length >= 1 && 
									<div className="rounded-full bg-(--info-bg) flex items-center justify-center text-light 
									text-[11px] absolute top-0 left-7 z-2 px-1.5 py-px">
									  {globalCart.length}
									</div>}
                    <img src={Cart} alt="cart" />
                  </Link>
                </li>
              </ul> 
            }
          </div>
        </div>
      </section>

      <section className="h-10.25 flex items-center gap-5 large:w-315 w-[95%] md:w-[83%] justify-self-center ">
		    <div className="flex gap-1 items-center h-full px-1 ">
          <img src={hamMenu} alt="category menu list" />
          <select name="cateogry" id="category" className="text-h text-sm">
            <option value=""id="category">Semua Kategori</option>
          </select>
        </div>		
        <ul className="w-full h-full gap-5 text-sm hidden md:flex">
          {categories.map((item, index) =>(
            <li key={index}>
              <Link to={""} className="px-1 flex gap-2 items-center h-full">
                <span>{item.iconText}</span>
                <p>{item.name}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

    </div>
  )
}