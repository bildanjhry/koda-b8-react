// asset
import ArrowRight from "@/assets/icons/arrow-right-blue.svg"
import HerroBg from "@/assets/bg/herro-bg.png"

export default function Herro(){
  return(
    <header id="herro" className=" h-105 flex flex-row w-[95%] md:rounded-none rounded-2xl md:w-full [background:var(--gradient-herro-bg)]">
      <section className="w-full md:w-[50%] flex justify-end">
        <div className="w-[90%] md:w-[83%] h-full  flex-col justify-center pr-[15%] 
						text-light flex gap-4">
          <p className="text-[40px] font-semibold leading-10">
						Elektronik pilihan harga spesial
          </p>
          <p className="font-light text-[#FFFFFFCC]">
						Laptop, smartphone, headphone, dan masih banyak lagidengan diskon hingga 40%
          </p>
          <button className="border-none rounded-xl bg-(--content-bg) h-[48px] 
					w-40.75 flex gap-2 justify-center items-center cursor-pointer">
            <p className="text-(--text-high) text-sm">Lihat Promo</p>
            <img src={ArrowRight} alt="promo" />
          </button>
        </div>
      </section>
      <section className="w-[50%] hidden md:flex overflow-hidden relative box-border ">
        <img
          className="w-full h-full absolute bg-center bg-cover" 
          src={HerroBg} alt="herro"/>
        <div>
        </div>
      </section>
    </header>
  )
}