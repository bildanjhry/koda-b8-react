import { Link } from "react-router"
import { useContext, useEffect } from "react"
import { UserContext } from "@/hooks/context/UserContext"
import { HiOutlineHome } from "react-icons/hi2";
import AuthNavbar from "@/components/ui/Auth"
import { useSelector } from "react-redux";

// hook
import useUserDetails from "@/hooks/useUserDetails";

// asset
import notif from "@/assets/icons/notif-mute.svg"
import profile from "@/assets/icons/profile-mute.svg"
import wishlist from "@/assets/icons/wishlist-mute.svg"
import Cart from "@/assets/icons/cart-mute.svg"

export default function ProfileNavbar(){
  const { userProfile } = useUserDetails()
  const sessionUser = useSelector(state => state.session.session)
  const [ globalCart, setGlobalCart ] = useContext(UserContext)

  useEffect(() => {
      async function getDataCart(){
      try{
        // const API = 'http://localhost:8081'
        const API = import.meta.env.VITE_API_URL
        const response = await fetch(`${API}/carts/user/${sessionUser.id}`, {
          headers:{
            "Authorization":`Bearer ${sessionUser.token}`
          }
        })
        const data = await response.json()
        if(!data.success){
          throw new Error(data.message)
        }
        setGlobalCart(data.result?.order_items)

      } catch(err){
        console.error(err.message)
      }
    }
    getDataCart()
  },[])
  
  return(
    <div className="h-full w-full md:w-fit flex items-center ">
      { !sessionUser.id ?
        <div className="flex items-center h-full justify-center md:justify-end w-full md:w-55">
          <AuthNavbar/>
        </div>
        :
        <ul className="h-full w-full justify-between md:justify-start px-6 md:px-0 md:w-fit flex gap-2 items-center">
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
              <p className="text-h text-sm hidden md:flex">{userProfile.username}</p>
            </Link>
          </li>
          <li className="visible md:hidden">
            <Link to={"/"} className="h-12 w-12  justify-center 
            cursor-pointer flex items-center gap-1">
              <HiOutlineHome size={30}/>
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
  )
}