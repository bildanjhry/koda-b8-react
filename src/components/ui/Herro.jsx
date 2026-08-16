// asset
import ArrowRight from "@/assets/icons/arrow-right-blue.svg"
import HerroBg from "@/assets/bg/herro-bg.png"
import { RiGeminiFill } from "react-icons/ri";
import { FiShoppingCart } from "react-icons/fi";
import Cart from "@/assets/cart.png"
import { Search, Sparkles, ShoppingBag, CheckCircle2, Truck, RotateCcw, ShieldCheck, Carrot, Laptop, Shirt, Droplet, Leaf } from "lucide-react";

export default function Herro(){
  return(
        <section 
        className="relative overflow-hidden h-130 w-[83%] rounded-3xl mt-10 bg-gradient-to-br 
        from-emerald-50 to-emerald-100 grid md:grid-cols-2 items-center">
      {/* decorative leaves */}
      <Leaf className="hidden md:block absolute top-10 left-[46%] w-6 h-6 text-emerald-700/20 -rotate-12" />
      <Leaf className="hidden md:block absolute bottom-14 left-[40%] w-5 h-5 text-emerald-700/20 rotate-12" />
 
      {/* ===== Copy ===== */}
      <div className="relative z-6 px-8 py-14 md:px-12 md:py-16">
        <span className="inline-flex items-center gap-1.5 bg-white text-emerald-700 text-xs font-bold px-3.5 py-2 rounded-full shadow-sm mb-5">
          <Sparkles className="w-3.5 h-3.5" />
          Belanja harian jadi mudah
        </span>
 
        <h1 className="font-extrabold text-3xl sm:text-4xl lg:text-5xl leading-tight tracking-tight text-gray-900 mb-4 max-w-lg">
          Semua kebutuhanmu, <span className="text-orange-600">dari pakaian sampai desktop</span>
        </h1>
 
        <p className="text-gray-600 text-base max-w-sm mb-6">
          Tools, elektronik, fashion, dan lainnya dikirim cepat ke depan pintu.
        </p>
 
        {/* Search */}
        <div className="flex items-center mt-5 bg-white rounded-full shadow-md p-1.5 max-w-md mb-6">
          <select
            className="w-28 shrink-0 bg-transparent text-xs font-semibold text-gray-700 outline-none pl-4 pr-1 py-2.5 cursor-pointer"
            defaultValue="Semua Kategori"
          >
            <option>Semua Kategori</option>
            <option>Makanan Segar</option>
            <option>Elektronik</option>
            <option>Fashion</option>
          </select>
          <span className="w-px h-6 bg-gray-200 shrink-0" />
          <input
            type="text"
            placeholder="Cari produk favoritmu..."
            className="flex-1 min-w-0 outline-none text-sm px-4 py-2.5 bg-transparent placeholder:text-gray-400"
          />
          <button className="shrink-0 flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold px-6 py-2.5 rounded-full transition-colors">
            <Search className="w-4 h-4" />
            Cari
          </button>
        </div>
 
        {/* Social proof */}
        {/* <div className="flex items-center gap-3 mb-6">
          <div className="flex">
            <span className="w-8 h-8 rounded-full border-2 border-white bg-amber-200 flex items-center justify-center text-xs font-bold text-gray-800">R</span>
            <span className="w-8 h-8 rounded-full border-2 border-white bg-emerald-200 flex items-center justify-center text-xs font-bold text-gray-800 -ml-2">D</span>
            <span className="w-8 h-8 rounded-full border-2 border-white bg-rose-200 flex items-center justify-center text-xs font-bold text-gray-800 -ml-2">S</span>
            <span className="w-8 h-8 rounded-full border-2 border-white bg-blue-200 flex items-center justify-center text-xs font-bold text-gray-800 -ml-2">A</span>
          </div>
          <div className="text-xs text-gray-600 leading-snug">
            <p><span className="font-bold text-gray-900">1.204+ pesanan</span> dibuat hari ini</p>
            <p className="text-amber-500 tracking-wide">
              ★★★★★ <span className="text-gray-900 font-bold ml-0.5">4.9</span>
            </p>
          </div>
        </div> */}
 
        {/* Trust chips */}
        <div className="flex flex-wrap gap-5">
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-900">
            <span className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
              <Truck className="w-3.5 h-3.5 text-emerald-700" />
            </span>
            Gratis Ongkir
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-900">
            <span className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
              <RotateCcw className="w-3.5 h-3.5 text-orange-700" />
            </span>
            Retur 30 Hari
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-900">
            <span className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
            </span>
            Pembayaran Aman
          </div>
        </div>
      </div>
 
      {/* ===== Visual ===== */}
      <div className="relative min-h-96 flex items-center justify-center px-8 pb-10 md:pb-0">
        {/* backdrop platform */}
        <div className="absolute w-72 h-72 rounded-full bg-gradient-to-br from-white to-emerald-50 shadow-2xl" />
 
        {/* floor shadow */}
        <div className="absolute bottom-20 w-40 h-3 bg-black/10 blur-sm rounded-full" />
 
        {/* shopping bag */}
        <div className="relative z-10 flex flex-col items-center">
          <div className="relative">
            <img
             width={300}
             className=""
             src={Cart} alt="" />
          </div>
        </div>
 
        {/* floating discount badge */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 z-10 bg-white rounded-2xl shadow-xl px-4 py-2 flex items-center gap-2">
          <span className="font-extrabold text-xl text-orange-600 leading-none">40%</span>
          <span className="text-[11px] font-bold text-gray-500 leading-tight">Diskon<br />Minggu Ini</span>
        </div>
 
        {/* floating category chips */}
        <div className="absolute top-6 left-0 z-10 -rotate-3 bg-emerald-50 rounded-2xl shadow-lg p-3 w-24 flex flex-col items-center gap-1.5 transition-transform duration-200 hover:scale-105 hover:rotate-0">
          <Carrot className="w-6 h-6 text-emerald-700" />
          <span className="text-[11px] font-bold text-gray-900">Segar</span>
        </div>
 
        <div className="absolute bottom-8 left-0 z-10 rotate-2 bg-slate-50 rounded-2xl shadow-lg p-3 w-28 flex flex-col items-center gap-1.5 transition-transform duration-200 hover:scale-105 hover:rotate-0">
          <Laptop className="w-7 h-7 text-slate-700" />
          <span className="text-[11px] font-bold text-gray-900">Elektronik</span>
        </div>
 
        <div className="absolute top-10 right-0 z-10 rotate-3 bg-orange-50 rounded-2xl shadow-lg p-3 w-24 flex flex-col items-center gap-1.5 transition-transform duration-200 hover:scale-105 hover:rotate-0">
          <Shirt className="w-6 h-6 text-orange-700" />
          <span className="text-[11px] font-bold text-gray-900">Fashion</span>
        </div>
 
        <div className="absolute bottom-4 right-6 z-10 -rotate-6 bg-rose-50 rounded-2xl shadow-lg p-3 w-24 flex flex-col items-center gap-1.5 transition-transform duration-200 hover:scale-105 hover:rotate-0">
          <Droplet className="w-6 h-6 text-rose-700" />
          <span className="text-[11px] font-bold text-gray-900">Kecantikan</span>
        </div>
      </div>
    </section>
    // <header id="herro" className=" h-135 mt-10 bg-(--main-bg)/10 flex flex-row w-[95%] md:rounded-2xl overflow-hidden rounded-2xl 
    // md:w-[83%]">
    //   <section className="w-full pl-10 gap-4 md:w-[50%] flex flex-col justify-center h-full">
    //     <div className="bg-white gap-1.5 text-(--main-bg) rounded-full content-cent px-4 py-1.5 shadow-sm w-fit text-sm">
    //       <RiGeminiFill className="text-[9px]"/>
    //       <p>
    //       Belanja Jadi mudah

    //       </p>
    //     </div>
    //     <div className="flex flex-col">
    //       <div className="w-[90%] md:w-[100%] h-full  flex-col justify-center pr-[15%] 
    //           text-h flex gap-4">
    //         <p className="text-[45px] font-semibold leading-14">
    //           Semua kebutuhanmu, dari dapur sampai desktop
    //         </p>
    //         <p className="">
    //           Olahraga, elektronik, fashion, dan lainnya. Pilih dan dikirim cepat ke depan rumah.
    //         </p>
    //       <button
    //       className="rounded-xl flex mt-3 shadow-sm text-sm bg-white h-13 content-cent w-50 "
    //       > <div className="w-[70%] pl-4 flex flex-col justify-center text-start h-full">
    //           <p className="text-xs text-(--text-mute)">Belanja</p>
    //           <p className="">Semua Produk</p>
    //        </div>
    //        <div className="content-cent w-[30%] border-l h-full border-(--border)">
    //           <FiShoppingCart/>
    //        </div>
    //       </button>
    //       </div>
    //     </div>
    //   </section>

    //   <section className="w-[50%] hidden md:flex overflow-hidden relative box-border ">
    //     {/* <img
    //       className="w-full h-full absolute bg-center bg-cover" 
    //       src={HerroBg} alt="herro"/> */}
    //     <div>
    //     </div>
    //   </section>
    // </header>
  )
}