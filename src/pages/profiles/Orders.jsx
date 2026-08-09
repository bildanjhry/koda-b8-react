import { LuShoppingBag } from "react-icons/lu";
import useUser from "@/hooks/useUser";
import moneyFormat from "@/utils/money-format.js"
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Orders() {
  const { checkout } = useUser()
  const [data, setData] = useState({})
  const session = useSelector(state => state.session.session)

  useEffect(() => {
    async function getDataCheckout(count = 3) {
      try {
        const API = import.meta.env.VITE_API_URL
        const token = session.token
        const id = session.id
        const response = await fetch(`${API}/users/${id}/checkout-histories`)
        const data = await response.json()
        if (!data.succes) {
          throw new Error(data.message)
        }

        setData(data.results[0])

      } catch (err) {
        if (count < 1) {
          console.error(err.message)
          return
        }
        getDataCheckout(count -= 1)
      }
    }
    if (session.token) getDataCheckout()
  }, [])

  return (
    <div className="w-[95%] pt-1 h-full">
      <h3>Pesanan Saya</h3>
      <div className="w-full flex flex-col-reverse gap-6 mt-6">
        { data.checkout_histories && data?.checkout_histories.map((item, index) => (
          <div
            key={index}
            className=" w-full border-light bg-white rounded-2xl 
            py-4 px-5">
            <header className="flex w-full justify-between items-center">
              <div>
                <p className="text-h font-semibold">#{item.id_order}</p>
                <p className="text-xs">{item.date}</p>
              </div>
              <div className="text-(--text-success) text-xs py-1 px-3 
              rounded-full bg-(--accent-bg)">
                {item.status_order}
              </div>
            </header>

            {item?.products.map((prod, index) => (
              <main
                key={index}
                className="border-b-light py-5 flex flex-col gap-3">
                <div className="flex flex-row gap-3">
                  <img
                    className="w-12 rounded-lg"
                    src={`${import.meta.env.VITE_API_URL}/${prod?.image}`}
                    alt={prod.alt}
                  />
                  <div className="flex justify-center gap-0 flex-col">
                    <p className="text-h m-0">{prod.name}</p>
                    <p className="text-[12px] ">×{prod.quantity} · {moneyFormat(prod.price)[0]}</p>
                  </div>
                </div>
              </main>
            ))}

            <footer className="h-12 flex items-center justify-between">
              <div className="flex items-center gap-1">
                <p>Total:</p>
                <p className="text-(--text-high)">{moneyFormat(item.subtotal)[0]}</p>
              </div>
            </footer>
          </div>
        ))
        }

        {data.checkout_histories && data?.checkout_histories.length < 1 &&
          <div className="w-full rounded-xl border-light h-88 mt-2 
          flex flex-col gap-3 justify-center items-center">
            <LuShoppingBag size={66} />
            <h2>Kamu tidak punya pesanan apa-apa</h2>
          </div>}
      </div>
    </div>
  )
}