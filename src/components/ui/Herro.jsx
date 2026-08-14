// asset
import ArrowRight from "@/assets/icons/arrow-right-blue.svg"
import HerroBg from "@/assets/bg/herro-bg.png"
import { RiGeminiFill } from "react-icons/ri";
import { FiShoppingCart } from "react-icons/fi";

export default function Herro(){
  return(
    <header id="herro" className=" h-130 mt-10 bg-(--main-bg)/10 flex flex-row w-[95%] md:rounded-2xl overflow-hidden rounded-2xl 
    md:w-[83%]">
      <section className="w-full pl-20 gap-4 md:w-[50%] flex flex-col justify-center h-full">
        <div className="bg-white gap-1.5 text-(--main-bg) rounded-full content-cent px-4 py-1.5 shadow-sm w-fit text-sm">
          <RiGeminiFill className="text-[9px]"/>
          <p>
          Belanja Jadi mudah

          </p>
        </div>
        <div className="flex flex-col">
          <div className="w-[90%] md:w-[100%] h-full  flex-col justify-center pr-[15%] 
              text-h flex gap-4">
            <p className="text-[45px] font-semibold leading-14">
              Semua kebutuhanmu, dari dapur sampai desktop
            </p>
            <p className="">
              Olahraga, elektronik, fashion, dan lainnya. Pilih dan dikirim cepat ke depan rumah.
            </p>
          <button
          className="rounded-xl flex mt-3 shadow-sm text-sm bg-white h-13 content-cent w-50 "
          > <div className="w-[70%] pl-4 flex flex-col justify-center text-start h-full">
              <p className="text-xs text-(--text-mute)">Belanja</p>
              <p className="">Semua Produk</p>
           </div>
           <div className="content-cent w-[30%] border-l h-full border-(--border)">
              <FiShoppingCart/>
           </div>
          </button>
          </div>
        </div>
      </section>

      <section className="w-[50%] hidden md:flex overflow-hidden relative box-border ">
        {/* <img
          className="w-full h-full absolute bg-center bg-cover" 
          src={HerroBg} alt="herro"/> */}
        <div>
        </div>
      </section>
    </header>
  )
}