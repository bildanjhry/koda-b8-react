// asset
import Export from "@/assets/icons/export-white.svg"
import Search from "@/assets/icons/search-mute.svg"
import Watch from "@/assets/icons/watch-mute.svg"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

import moneyFormat from "@/utils/money-format"

export default function Orders(){
  const [dataCheckout, setDataCheckout] = useState([])
  const session = useSelector(state => state.session.session)

  useEffect(() => {
    async function getOrderUser(){
      try{
        const API = import.meta.env.VITE_API_URL
        const token = session.token
        const params = new URLSearchParams({
          page:1,
          limit:20
        })
        const result = await fetch(`${API}/users/checkout-histories?${params}`,{
          headers:{
            "Authorization":`Bearer ${token}`
          }
        })
        
        const data = await result.json()
        const userData = data.results.map((item) => {
          return {
            name: item.fullname,
            email: item.email
          }
        })
        const newData = []
        const dataCheckoutUser = data.results.forEach((item) => newData.push(...item.checkout_histories))
        setDataCheckout(newData)

      } catch(err){
        console.error(err.message)
      }
    }
    getOrderUser()
  },[])


  return(
    <div className="px-6 mb-10">
      <header className="flex flex-col gap-5 mt-6">
        <div className="flex justify-between h-10 items-center">
          <div className="flex flex-col justify-center gap-0">
            <p className="text-h text-2xl font-medium">Manajemen Pesanan</p>
          </div>
          <button className="w-[100px] h-full bg-(--main-bg) flex justify-center items-center
            text-white text-sm rounded-xl gap-2">
            <img src={Export} alt="add product" />
            <p>Export</p>
          </button>
        </div> 
        <div className="flex mt-4 items-center gap-2 h-[38px]">
          <button className="w-[102px] bg-(--main-bg) text-white flex justify-center items-center
						rounded-xl h-full text-sm">Semua (8)</button>
          <button className="w-[102px] border-light flex justify-center items-center
						rounded-xl h-full text-sm bg-white">Pending (1)</button>
          <button className="w-[102px] border-light flex justify-center items-center
						rounded-xl h-full text-sm bg-white">Dikemas (1)</button>
          <button className="w-[102px] border-light flex justify-center items-center
						rounded-xl h-full text-sm bg-white">Dikirim (2)</button>
          <button className="w-[102px] border-light flex justify-center items-center
						rounded-xl h-full text-sm bg-white">Terkirim (3)</button>
        </div>
        <form 
          className="bg-white border-light w-full justify-between rounded-lg p-4 
						gap-0 grid grid-cols-[88%_11%] h-19"
          action="">
          <div className="relative h-full w-full text-sm">
            <img 
              className="absolute top-3 left-4"
              src={Search} alt="search" />
            <input
              placeholder="Cari produk atau merk"
              className="h-full rounded-xl w-full bg-(--input-bg) border-light pl-10"
              type="search" name="search" id="" />
          </div>
          <button className="h-full rounded-xl border-light">
            <p className="text-sm">Filter</p>
          </button>
        </form>
        <div className="mt-2 rounded-xl overflow-hidden border-light">
          <table className="rounded-xl">
            <thead>
              <tr className="h-12 text-sm bg-(--input-bg) text-left">
                <th className="pl-4">No. Pesanan</th>
                <th>Pelanggan</th>
                <th>Tanggal</th>
                <th>Item</th>
                <th>Total</th>
                <th>Pembayaran</th>
                <th>Status</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>

              {dataCheckout.length > 0 && dataCheckout.map((item) => (
                <tr 
                key={item.id_checkout}
                className="h-13 bg-white text-sm">
                  <td className="pl-4 text-(--text-high) w-47 text-sm font-semibold">
                    <p>#{item.id_checkout}</p>
                  </td>
                  <td className="flex flex-col justify-end pt-1 text-sm w-60	">
                    <p className="text-h">{item.fullname}</p>
                    <p>{item.email}</p>
                  </td>
                  <td className="text-xs w-33">
                    <p>28 Mei 2026</p>
                  </td>
                  <td className="w-22">
                    <p>{item.products.length}</p>
                  </td>
                  <td className="text-(--text-high) w-44">
                    <p>{moneyFormat(item.total)[0]}</p>
                  </td>
                  <td className="w-40">
                    <p>{item.id_payment}</p>
                  </td>
                  <td className="w-33">
                    <div className="px-2 py-[2.5px] w-fit rounded-full bg-(--success-bg) text-(--text-success) text-xs">
                          Terkirim
                    </div>
                  </td>
                  <td className="w-33">
                    <ul className="flex gap-3 items-center">
                      <li className=" text-xs">
                        <button className="cursor-pointer">
                          <img src={Watch} alt="" />
                        </button>
                      </li>
                      <li className=" text-xs">
                        <button className="cursor-pointer">
                          <img src={null} alt="" />
                        </button>
                      </li>
                    </ul>
                  </td>
                </tr>
              ))}

            </tbody>
          </table>
        </div>			
      </header>
    </div>           
  )
}