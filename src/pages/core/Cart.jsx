import { useEffect, useState } from "react";
import useCart from "../../hooks/useCart";

// component
import MainLayout from "@/components/layouts/MainLayout";
import ProductsCard from "@/components/features/ProductsCard.jsx"

// assets
import Minus from "@/assets/icons/minus-black.svg"
import Plus from "@/assets/icons/plus-black.svg"
import Wishlist from "@/assets/icons/wishlist-mute.svg"
import Delete from "@/assets/icons/delete-mute.svg"
import Promo from "@/assets/icons/promo-code-blue.svg"

export default function Cart(){
  const [cart] = useCart()
  console.log(cart)

  return(
    <MainLayout>
      <div className="w-[83%] mt-5 mb-20 flex flex-col">
        <h4 className="text-h text-2xl mt-4 font-medium">Keranjang Belanja ({cart?.length} item)</h4>
        <div className="w-full min-h-77.25 mt-5 flex flex-row justify-between">
          <main className="w-[66%] min-h-full flex flex-col gap-3 justify-between">
            <section className="w-full min-h-[145px] bg-white rounded-xl border-light flex
            flex-row justify-between items-center px-8">

              <div className="flex items-center h-[100px] justify-between">
                <img 
                  className="w-[96px] h-[100px] rounded-xl"
                  src={null} alt="product" />
                <div className="flex flex-col justify-between h-full ">
                  <p className="text-h font-[500] text-xm">Headphone Wireless Premium</p>
                  <p className="text-xs">Hitam</p>
                  <div className="flex felx-col h-[1.9rem] text-sm w-fit items-center rounded-lg border-light">
                    <div className="w-[2.5rem] flex justify-center items-center">
                      <img src={Minus} alt="decrease" />
                    </div>
                    <p className="text-h flex justify-center items center w-[2.7rem]">2</p>
                    <div className="w-[2.5rem] flex justify-center items-center">
                      <img src={Plus} alt="increase" />
                    </div>
                  </div>
                  <button className="flex items-center gap-2 cursor-pointer">
                    <img 
                      className="w-3 h-3"
                      src={Wishlist} alt="wishlist" />
                    <p className="text-xs">Simpan ke wishlist</p>
                  </button>
                </div>
              </div>

              <div className="flex flex-col h-26 items-end">
                <button>
                  <img src={Delete} alt="delete product" />
                </button>
                <h4 className="text-(--text-high) font-medium flex mt-[30%]">Rp 450.000</h4>
              </div>

            </section>
            
            <section className="w-full h-[145px] py-5 px-6 bg-white rounded-xl border-light flex
            gap-2 flex-col">
              <div className="flex flex-row items-center gap-2">
                <img src={Promo} alt="promo code" />
                <h4>Kode Promo</h4>
              </div>
              <form action="" className="h-[46px] w-full flex justify-between">
                <input 
                  placeholder="Masukan Kode Promo"
                  className="w-[84%] h-full bg-(--input-bg) text-sm pl-4 rounded-xl"
                  type="text" name="code" id="code" />
                <button 
                  type="submit"
                  className="bg-(--main-bg) w-[15%] cursor-pointer h-full rounded-xl text-white text-sm"
                >
                  Terapkan
                </button>
              </form>
              <p className="text-xs">Coba: HEMAT10, BELIMUDAH, atau NEWUSER</p>
            </section>
          </main>
          <aside className="w-[395px] h-[309px] bg-white border-light 
          p-5 rounded-xl flex flex-col">
            <h4 className="text-h font-[600]">Ringkasan Pesananan</h4>
            <div className="flex flex-col border-b-light mt-2 text-sm gap-2 py-2">
              <ul className="flex justify-between items-center">
                <li>Subtotal ({cart?.length} item)</li>
                <li>Rp 450.000</li>
              </ul>
              <ul className="flex justify-between items-center">
                <li>Ongkos Kirim</li>
                <li className="text-(--text-success)">GRATIS</li>
              </ul>              
            </div>
            <ul className="flex justify-between items-center py-2">
              <li className="text-h">Total</li>
              <li className="text-(--text-high)">Rp 450.000</li>
            </ul>
            <button 
              className="w-full cursor-pointer mt-2 h-[48px] rounded-xl flex justify-center items-center 
            bg-(--action-bg) text-(--text-light)">
              <p>Chekout Aman</p>
            </button>
            <div className="flex mt-3 flex-col items-center">
              <p className="text-xs">Pembayaran 100% Aman</p>

            </div>
          </aside>
        </div>
        <div className="flex flex-col gap-2 mt-8">
          <header className="h-13 flex items-center">
            <h3>Kamu mungkin suka ini</h3>
          </header>
          <ProductsCard/>
        </div>
      </div>
    </MainLayout>
  )
}