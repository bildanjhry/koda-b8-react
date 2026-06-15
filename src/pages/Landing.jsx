import { useEffect, useState } from "react"

// component
import MainLayout from "@/components/layouts/MainLayout.jsx"
import Herro from "@/components/ui/Herro.jsx"
import CategoriesCard from "@/components/features/CategoriesCard.jsx"
import ProductsCard from "@/components/features/ProductsCard.jsx"
import ArrowRightButton from "@/components/ui/ArrowLeftButton.jsx"
import InfoCards from "@/components/ui/InfoCards"

// asset
import Flash from "@/assets/icons/flash-white.svg"
import Watch from "@/assets/icons/watch-black.svg"
import Escalate from "@/assets/icons/escalate-blue.svg"

export default function Landing(){
  const [time, setTime] = useState({
    hours:5,
    minutes:21,
    seconds:38
  })

  useEffect(() => { // counting times
    const interval = setInterval(() => {
      setTime(prev => ({
        ...prev,
        seconds: prev.seconds - 1
      }));
    }, 1000);

    return () => clearInterval(interval)
  })

  return (
    <MainLayout>
      <div className="w-full flex flex-col items-center">
        <Herro/>

        <div className="w-[83%] flex flex-col justify-center items-center ">
          <CategoriesCard/>
          <div className="mb-8 w-full">
            <header className="flex items-center justify-between mt-4">
              <section className="h-[5rem] flex flex-row items-center gap-3">
                <div className="rounded-lg bg-(--info-bg) text-light flex jusity-center 
                w-[117px] h-[32px] items-center gap-1 px-2">
                  <img src={Flash} alt="" />
                  <p className="text-sm">Flash Deals</p>
                </div>
                <div className="flex flex-row items-center gap-2">
                  <img src={Watch} alt="" />
                  <p className="text-h">Berakhir dalam: 0{time.hours} : {time.minutes} : {time.seconds}</p>
                </div>
              </section>
              <section>
                <ArrowRightButton/>
              </section>
            </header>
            <ProductsCard/>
          </div>
          <InfoCards/>
          <div className="mb-8 w-full">
            <header className="flex items-center justify-between mt-2">
              <section className="h-[5rem] flex flex-row items-center gap-2">
                <div className="flex flex-row justify-start 
                w-fit h-full items-center gap-3">
                  <img src={Escalate} alt="new product" />
                  <h3 className="">Produk Terbaru</h3>
                </div>
              </section>
              <section>
                <ArrowRightButton/>
              </section>
            </header>
            <ProductsCard/>
          </div>   

          <div className="mb-8 w-full">
            <header className="flex items-center justify-between mt-2">
              <section className="h-20 flex flex-row items-center gap-2">
                <div className="flex flex-row justify-start 
                w-fit h-full items-center gap-3">
                  <h3 className="">Produk Unggulan</h3>
                </div>
              </section>
              <section>
                <ArrowRightButton/>
              </section>
            </header>
            <ProductsCard/>
          </div>            

        </div>
      </div>
    </MainLayout>
  )
}