import useUser from "@/hooks/useUser";
import { useContext, useState } from "react";
import moneyFormat from "@/utils/money-format.js"

import { UserContext } from "@/hooks/context/UserContext";

// component
import MainLayout from "@/components/layouts/MainLayout";
import ProductsCard from "@/components/features/ProductsCard.jsx"
import EmptyCart from "@/components/ui/templates/EmptyCart";

// assets
import Minus from "@/assets/icons/minus-black.svg"
import Plus from "@/assets/icons/plus-black.svg"
import Wishlist from "@/assets/icons/wishlist-mute.svg"
import Delete from "@/assets/icons/delete-mute.svg"
import Promo from "@/assets/icons/promo-code-blue.svg"
import { useLocation, useNavigate } from "react-router";

export default function Cart(){
  const {cart, setCart, bio, address} = useUser()
  const [globalCart, setGlobalCart] = useContext(UserContext)
  const navigate = useNavigate()
  const location = useLocation()

  function handleDelete(id){
    const filteredItem = globalCart.filter((item) => item.cartId !== id)
    setCart(filteredItem)
    setGlobalCart(() => filteredItem)
  }

  function handleCheckout(){
    try{
      if(address.length < 1){
        throw new Error("/my-profiles/address")
      }
      if(bio.phone === ""){
        throw new Error("/my-profiles/settings")
      }
      navigate("/checkout")

    }catch(err){
      navigate(err.message, {state:location.pathname})
    }
  }

  return(
    <MainLayout>
      <div className="w-[83%] mt-5 mb-20 flex flex-col">
        <h4 className="text-h text-2xl mt-4 font-medium">
          Keranjang Belanja ({cart?.length} item)
        </h4>

        { cart.length > 0 ?
          <div className="w-full min-h-77.25 mt-5 flex flex-row justify-between">
            <main className="w-[66%] min-h-full flex flex-col gap-3 justify-between">
              {globalCart.map((item, index) => (
                <section 
                  key={index}
                  className="w-full min-h-36.25 bg-white rounded-xl border-light flex
                  flex-row justify-between items-center px-7">

                  <div className="flex items-center h-25 gap-6 justify-between">
                    <img 
                      className="w-24 h-full rounded-xl overflow-hidden"
                      src={item.image?.path} alt={item.image?.alt} />
                    <div className="flex flex-col justify-between h-full ">
                      <p className="text-h font-medium text-xm">{item.name}</p>
                      <p className="text-xs">{item?.variants?.charAt(0).toUpperCase() + item?.variants?.slice(1)}</p>
                      <div className="flex felx-col h-[1.9rem] text-sm w-fit items-center 
                          rounded-lg border-light">
                        <div className="w-10 flex justify-center items-center">
                          <img src={Minus} alt="decrease" />
                        </div>
                        <p className="text-h flex justify-center items center w-[2.7rem]">{item.qty}</p>
                        <div className="w-10 flex justify-center items-center">
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
                    <button 
                      className="cursor-pointer"
                      onClick={() => {handleDelete(item.cartId)}}>
                      <img src={Delete} alt="delete product" />
                    </button>
                    <h4 className="text-(--text-high) font-medium flex mt-[40%]">
                      {moneyFormat(item.price)[0]}
                    </h4>
                  </div>

                </section> 

              ))}

              <section className="w-full h-36.25 py-5 px-6 bg-white rounded-xl border-light flex
            gap-2 flex-col">
                <div className="flex flex-row items-center gap-2">
                  <img src={Promo} alt="promo code" />
                  <h4>Kode Promo</h4>
                </div>
                <form action="" className="h-11.5 w-full flex justify-between">
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

            <aside className="w-98.75 h-77.25 bg-white border-light 
               p-5 rounded-xl flex flex-col">
              <h4 className="text-h font-semibold">Ringkasan Pesananan</h4>
              <div className="flex flex-col border-b-light mt-2 text-sm gap-2 py-2">
                <ul className="flex justify-between items-center">
                  <li>Subtotal ({globalCart.reduce((acc, item) =>  acc + parseInt(item.qty), 0)} item)</li>
                  <li>{moneyFormat(globalCart.reduce((acc, item) =>  acc + item.price * item.qty, 0))[0]}</li>
                </ul>
                <ul className="flex justify-between items-center">
                  <li>Ongkos Kirim</li>
                  <li className="text-(--text-success)">GRATIS</li>
                </ul>              
              </div>
              <ul className="flex justify-between items-center py-2">
                <li className="text-h">Total</li>
                <li className="text-(--text-high)">{moneyFormat(globalCart.reduce((acc, item) =>  acc + item.price * item.qty, 0))[0]}</li>
              </ul>
              <button 
                onClick={handleCheckout}
                className="w-full cursor-pointer mt-2 h-12 rounded-xl flex justify-center items-center 
                bg-(--action-bg) text-(--text-light)">
                <p>Chekout Aman</p>
              </button>
              <div className="flex mt-4 flex-col items-center text-center gap-2">
                <p className="text-xs">🔒 Pembayaran 100% Aman</p>
                <p className="text-xs">Metode: Transfer Bank · Virtual Account · Kartu Kredit · e- Wallet</p>
              </div>
            </aside>
          </div> :
          <EmptyCart/>
        }
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