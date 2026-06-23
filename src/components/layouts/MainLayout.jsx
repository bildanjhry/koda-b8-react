import Navbar from "./Navbar"
import Footer from "./Footer"
import { useEffect } from "react"
import ProfileNavbar from "../features/ProfileNavbar"

export default function MainLayout({children}){

  useEffect(() => {
    window.scrollTo({top:0})
  },[])

  return(
    <div className="relative">
      <Navbar/>
      <main className="mt-32 w-full flex justify-center 
      large:w-380 large:justify-self-center min-h-screen flex-1">
        {children}
      </main>
      <Footer/>
      <div className="h-15 flex fixed z-10 bottom-0 bg-white w-full">
        <ProfileNavbar/>
      </div>
    </div>
  )
}