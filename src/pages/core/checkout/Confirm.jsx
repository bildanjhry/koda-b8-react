import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import useUser from "@/hooks/useUser";
import moneyFormat from "@/utils/money-format.js"

// component
import CompleteCheckout from "@/components/ui/CompleteCheckout";

// assets
import Safe from "@/assets/icons/safe-blue.svg"
import Lock from "@/assets/icons/lock-white.svg"

export default function Confirm(){
  const [complete, setComplete] = useState(false)
  const location = useLocation()
  const [formCheckout, setFormCheckout] = useState()
  const {address, cart, user} = useUser()

  useEffect(() => {
    function getState(){
      setFormCheckout(location.state)
    }
    getState()
  },[location])

  return(
    <>
      { complete ? 
        <CompleteCheckout/>	
        :
        <div>
          <header>
            <h3>Konfirmasi Pesanan</h3>
          </header>
          <main className="mt-7 flex flex-col gap-5">
            <div className="w-full h-fit p-5 flex flex-col gap-1 bg-(--input-bg) rounded-xl">
              <p className="text-h">Alamat Pengiriman</p>
              <div className="flex items-center gap-2 text-sm mt-1">
                <p>{user.fullname}.</p>
                <p>{address[1].phone}</p>
              </div>
              <p className="text-sm">{address[1].fulladdress}</p>
            </div>

            <div className="w-full h-fit p-5 flex flex-col gap-1 bg-(--input-bg) rounded-xl">
              <p className="text-h">Metode Pengiriman</p>
              <div className="text-sm flex items-center gap-2">
                <p>{formCheckout?.deliveryMethod}</p>
              </div>
            </div>

            <div className="w-full h-fit p-5 flex flex-col gap-1 bg-(--input-bg) rounded-xl">
              <p className="text-h">Produk yang Dipersan</p>
              <ul className="flex flex-col items-center gap-3 mt-4">
                {cart.map((item, index) => (
                  <li
                    key={index}
                    className="flex w-full justify-between h-12 items-center text-sm">
                    <img
                      className="w-12 rounded-lg" 
                      src={item.image?.path} alt={item.image?.alt} />
                    <div className="flex justify-between items-center w-[91%] h-full">
                      <div className="flex flex-col justify-center h-full">
                        <p className="text-h">{item.name}</p>
                        <p>x{item.qty}</p>
                      </div>
                      <h4 className="text-(--text-high) text-md">{moneyFormat(item.price)[0]}</h4>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
					 <div className="w-full bg-(--accent-bg) mt-3 rounded-xl  flex 
						text-xs items-start px-4 gap-3 py-4">
              <img 
                className="w-6"
                src={Safe} alt="safe guarantee" />
              <p>Dengan menekan "Bayar Sekarang", kamu menyetujui Syarat & Ketentuan kami. Pembayaran baru akan
							diproses setelah kamu mengkonfirmasi di langkah ini.</p>
            </div>
            <div className="flex row gap-2 justify-between items-center mt-2">
              <button
                type="button"
                onClick={() => window.location.href = "/checkout-payment" }
                className="rounded-xl cursor-pointer
							text-sm w-[15%] h-13 flex justify-center items-center border-light">
								Kembali
              </button>
              <button 
                type="submit"
                onClick={() => {
                  setComplete(true)
                  window.scrollTo({ top:0 })
                }}
                className="flex gap-2 text-sm text-white bg-(--action-bg) rounded-xl h-13 items-center
									justify-center w-[85%] cursor-pointer">
                <img 
                  className="relative bottom-px"
                  src={Lock} alt="payment step" />
                <p>Bayar {moneyFormat(cart.reduce((acc, item) => acc + item.price * item.qty, 0))[0]} Sekarang</p>
              </button>			
            </div>

          </main>
        </div>
      }
    </>	
  )
}