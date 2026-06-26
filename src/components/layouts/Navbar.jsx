import { Link } from "react-router"

// hook
import useFetch from "@/hooks/useFetch.js"

// assets
import location from "@/assets/icons/location-white.svg"
import hamMenu from "@/assets/icons/ham-menu-black.svg"
import { CiSearch } from "react-icons/ci";

// component
import Logo from "@/components/ui/Logo"
import ProfileNavbar from "@/components/features/ProfileNavbar"

export default function Navbar() {
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
      shadow-md items-center bg-white z-10">

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

      <section className="w-full h-16 flex justify-center border-b-light items-center ">
        <div className="w-[95%] md:w-[83%] h-full large:w-315 flex gap-3  items-center 
				justify-self-center">
          <Logo />
          <div id="search" className="w-full md:w-[45%] ">
            <form id="search-input" 
              onSubmit={(e) => handleSearch(e)}
              action="" className="h-11 md:h-10 flex w-full">
              <input 
                id="search"
                type="search" 
                name="search"
                placeholder="Cari produk, merek, kategori..."
                className="rounded-l-lg h-full w-[90%]
                input-bg pl-4 text-sm md:border-light"/>
              <button 
                type="submit"
                className=" flex justify-center items-center rounded-r-lg 
                h-full w-[15%] md:w-[10%] bg-(--input-bg)">
                <CiSearch className="font-bold text-h text-xl"/>
              </button>
            </form>
          </div>

          <div className="hidden md:flex">
            <ProfileNavbar/>
          </div>

        </div>
      </section>

      <section className="h-15 py-2 md:py-0 md:h-10.25 bg-(--content-bg) md:bg-white  flex items-center gap-5 
      overflow-scroll md:pl-0 md:overflow-hidden large:w-315 w-full px-[2%] md:px-0 md:w-[83%] justify-self-center ">
		    <div className="md:flex hidden gap-1 items-center h-full px-1 ">
          <img src={hamMenu} alt="category menu list" />
          <select name="cateogry" id="category" className="text-h text-sm">
            <option value=""id="category">Semua Kategori</option>
          </select>
        </div>		
        <ul className="w-full h-full gap-2 md:gap-5 text-sm flex">
          {categories.map((item, index) =>(
            <li key={index} className="shrink-0">
              <Link to={""} className="md:px-0 px-4 flex gap-2 bg-white rounded-lg md:w-fit items-center h-full">
                <span className="">{item.iconText}</span>
                <p className="">{item.name}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

    </div>
  )
}