import { Outlet, useLocation } from "react-router"
import useUser from "@/hooks/useUser"
import moneyFormat from "@/utils/money-format.js"
import classNames from "classnames"

// component
import MainLayout from "@/components/layouts/MainLayout.jsx"
import { useContext, useEffect, useState } from "react"
import { CheckoutContext } from "@/hooks/context/UserContext"

export default function CheckoutLayout(){
  return(
    <MainLayout>
      <div className="w-[83%] min-h-40 mt-5 mb-15 flex flex-col gap-4 items-center">
        <Header/>
        <main className="w-full box-border mt-4 flex flex-row justify-between 
				 min-h-67.75 relative">
          <div className="w-[70%] flex flex-col py-10 px-10 bg-white rounded-2xl border-light">
            <Outlet/>
          </div>
          <Aside/>
        </main>
      </div>
    </MainLayout>
  )
}

function Header() {
  const location = useLocation()
  const [step, setStep] = useState(location?.state?.step || 1)

  useEffect(() => {
    function getStep(){
      setStep(location?.state?.step)
    }
    getStep()
  },[location])

  return(
    <header className="flex items-center gap-2 h-30">
      <div className="flex flex-col items-center gap-2 ">
        <div className={classNames(
          `w-10 h-10 rounded-full flex justify-center items-center bg-(--main-bg)`,
          {'bg-green-500' : step > 1},
        )}>
          <p className={classNames(
            "text-white",
          )}>1</p>
        </div>
        <p className={classNames(
          "text-(--text-high) text-xs",
          {"text-gray-500": step > 1 }
        )}>Pengiriman</p>
      </div>
      <span className={classNames(
        {"border w-37 relative bottom-3 border-green-600": step > 1 },
        "w-37 border border-(--border) relative bottom-3",
      )}></span>
      <div className="flex flex-col items-center gap-2 ">
        <div className={classNames(
          "w-10 h-10 rounded-full text-sm flex justify-center items-center bg-(--content-deep-bg)",
          {"bg-(--main-bg)": step === 2},
          {"bg-green-500": step > 2},
        )}>
          <p className={classNames(
            {"text-white" : step === 2},
            {"text-white" : step > 2},
          )}>2</p>
        </div>
        <p className={classNames(
          "text-xs",
          {"text-(--text-high)" : step == 2}
        )}>Pembayaran</p>
      </div>
      <span className={classNames(
        "w-37 border border-(--border) relative bottom-3",
        {"border-green-600" : step > 2}

      )}></span>
      <div className="flex flex-col items-center gap-2">
        <div className={classNames(
          "w-10 h-10 rounded-full text-sm flex justify-center items-center bg-(--content-deep-bg)",
          {"bg-(--main-bg) text-white": step > 2}
        )}>
          <p>3</p>
        </div>
        <p className={classNames(
          "text-xs",
          { "text-(--text-high)" : step > 2}
        )}>Konfirmasi</p>
      </div>
    </header>		
  )
}

function Aside(){
  const { cart } = useUser()

  return (
    <aside className="w-88 min-h-67.75 max-h-fit sticky top-35 border-light bg-white 
      flex flex-col px-6 py-5 rounded-2xl gap-2">
      <h4>Rinkasan Pesanan</h4>
      <div className="py-3 flex flex-col gap-2 border-b-light">
        { cart.map((item, index) => (
          <div 
            key={index}
            className="flex justify-between">
            <img
              className="w-10 h-10 rounded-xl" 
              src={item.image?.path} alt={item.image?.path} />
            <div className="flex w-[82%] justify-between items-center text-xs">
              <p>{item.name}</p>
              <p>x{item.qty}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="w-full flex flex-col gap-2 py-3  border-b-light">
        <ul className="flex justify-between items-center">
          <li>Subtotal</li>
          <li>{moneyFormat(cart.reduce((acc, item) => acc + (item.price * item.qty),0))[0]}</li>
        </ul>
        <ul className="flex justify-between items-center">
          <li>Ongkir</li>
          <li className="text-(--text-success)">Gratis</li>
        </ul>
      </div>
      <div>
        <ul className="flex justify-between items-center mb-5">
          <li className="text-(--text-h)">Total</li>
          <li className="text-(--text-high) font-semibold">{moneyFormat(cart.reduce((acc, item) => acc + (item.price * item.qty),0))[0]}</li>
        </ul>
        <p className="text-center relative  text-xs">🔒 Pembayaran aman dan terenkripsi</p>
      </div>
    </aside>
  )
}