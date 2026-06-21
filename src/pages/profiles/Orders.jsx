import { useEffect, useState } from "react";
import useUser from "@/hooks/useUser";
import moneyFormat from "@/utils/money-format.js"

export default function Orders(){
  const {checkout} = useUser()
  const data = checkout.filter((item) => item.idCheckout !== undefined)

  return(
    <div className="w-[95%] pt-1 h-full">
      <h3>Pesanan Saya</h3>
      <div className="w-full flex flex-col gap-6 mt-6">
        {data.map((item, index) => (
          <div 
            key={index}
            className=" w-full border-light bg-white rounded-2xl 
            py-4 px-5">
            <header className="flex w-full justify-between items-center">
              <div>
                <p className="text-h font-semibold">#{item.idCheckout.toUpperCase()}</p>
                <p className="text-xs">{item.date}</p>
              </div>
              <div className="text-(--text-success) text-xs py-1 px-3 
              rounded-full bg-(--accent-bg)">
                {item.status?.merchantStatus}
              </div>
            </header>
            {item.products.map((prod, index) => (
              <main 
                key={index}
                className="border-b-light py-5 flex flex-col gap-3">
                <div className="flex flex-row gap-3">
                  <img 
                    className="w-12 rounded-lg"
                    src={prod.image?.path}
                    alt={prod.image?.alt} 
                  />
                  <div className="flex justify-center gap-0 flex-col">
                    <p className="text-h m-0">{prod.name}</p>
                    <p className="text-xs ">{moneyFormat(prod.price)[0]}</p>
                  </div>
                </div>
              </main>
            ))}
            <footer className="h-12 flex items-center justify-between">
              <div className="flex items-center gap-1">
                <p>Total:</p>
                <p className="text-(--text-high)">{moneyFormat(item.products.reduce((acc, item) => acc + (item.price*item.qty), 0))[0]}</p>
              </div>
            </footer>
          </div>
        ))

        }
      </div>
    </div>
  )
}