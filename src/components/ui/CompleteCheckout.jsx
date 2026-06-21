import { Link } from "react-router"

import MainLayout from "@/components/layouts/MainLayout.jsx"

// asset
import Check from "@/assets/icons/success-check-green.svg"
import Delivery from "@/assets/icons/delivery-blue.svg"
import ArrowRight from "@/assets/icons/arrow-right-blue.svg"
import Box from "@/assets/icons/box-white.svg"

export default function CompleteCheckout(){
  return(
    <MainLayout>
      <div className="mt-12 mb-24 flex flex-col items-center justify-center w-[50%]">
        <header className="flex flex-col gap-1 items-center">
          <div className="w-24 h-24 rounded-full flex justify-center items-center mb-6 bg-(--success-bg)">
            <img src={Check} alt="" />
          </div>
          <h2 className="text-h leading-3">Pesanan Berhasil! 🎉</h2>
          <p>Terima kasih telah berbelanja di BeliMudah. Pesananmu sedang diproses.</p>
        </header>

        <main className="flex flex-col gap-7 mt-6 w-full">
          <section className="px-6 py-5 bg-white flex flex-col border-light rounded-2xl">
            <header className="border-b-light pb-4 flex w-full text-sm justify-between items-center">
              <div className="flex flex-col justify-center">
                <p>Nomer Pesanan</p>
                <h5 className="text-(--text-high) font-bold">#90832MKH</h5>
              </div>
              <div className="flex flex-col  items-end">
                <p>Total Pembayaran</p>
                <h5 className="text-h font-semibold">Rp 450.000</h5>
              </div>
            </header>
            <main className="mt-4">
              <ul className="flex flex-col gap-2">
                <li className="flex gap-3 items-start h-10 ">
                  <img 
                    className="mt-0.5"
                    src={Delivery} alt="" />
                  <div className="flex flex-col ">
                    <p className="text-sm text-h">JNE Reguler</p>
                    <p className="text-xs">Estimasi tiba: </p>
                  </div>
                </li>
                <li className="flex gap-3 items-start h-10 ">
                  <img 
                    className="mt-0.5"
                    src={Delivery} alt="" />
                  <div className="flex flex-col ">
                    <p className="text-sm text-h">JNE Reguler</p>
                    <p className="text-xs">Estimasi tiba: </p>
                  </div>
                </li>								
              </ul>
            </main>
          </section>

          <section className="flex flex-col gap-4 px-6 py-5 bg-white rounded-2xl border-light">
            <h4 className="text-h text-lg font-semibold">Status Pesanan</h4>
            <ul className="flex flex-col gap-4">

              <li className="flex gap-4 items-center">
                <div className="rounded-full h-9 w-9 flex justify-center items-center bg-(--success-bg)">
                  <img 
                    className="w-4"
                    src={Check} alt="" />
                </div>
                <div className="flex items-center w-full justify-between">
                  <div className="flex flex-col justify-center text-sm">
                    <p className="text-h">Pesanana Diterima</p>
                    <p className="text-xs">Baru Saja</p>
                  </div>
                  <div className="px-3  rounded-full text-(--text-success) bg-(--success-bg)">
										✓
                  </div>
                </div>
              </li>

              <li className="flex gap-4 items-center">
                <div className="rounded-full h-9 w-9 flex justify-center items-center bg-(--success-bg)">
                  <img 
                    className="w-4"
                    src={Check} alt="" />
                </div>
                <div className="flex items-center w-full justify-between">
                  <div className="flex flex-col justify-center text-sm">
                    <p className="text-h">Pesanana Diterima</p>
                    <p className="text-xs">Baru Saja</p>
                  </div>
                  <div className="px-3  rounded-full text-(--text-success) bg-(--success-bg)">
										✓
                  </div>
                </div>
              </li>

              <li className="flex gap-4 items-center">
                <div className="rounded-full h-9 w-9 flex justify-center items-center bg-(--success-bg)">
                  <img 
                    className="w-4"
                    src={Check} alt="" />
                </div>
                <div className="flex items-center w-full justify-between">
                  <div className="flex flex-col justify-center text-sm">
                    <p className="text-h">Pesanana Diterima</p>
                    <p className="text-xs">Baru Saja</p>
                  </div>
                  <div className="px-3  rounded-full text-(--text-success) bg-(--success-bg)">
										✓
                  </div>
                </div>
              </li>

            </ul>
          </section>

          <section className="grid grid-cols-3 gap-3 justify-between
					items-center h-[50px] w-full">
            <button className="flex items-center justify-center px-4 gap-2 h-full text-white 
						rounded-xl bg-(--main-bg) cursor-pointer">
              <img src={Box} alt="" />
              <p>Lacak Pesanan</p>
            </button>

            <button className="flex items-center justify-center px-8 box-border  h-full border-light 
						rounded-xl cursor-pointer">
              <p>Lihat Riwayat Pesanan</p>
            </button>

            <Link 
              to={"/browse-product/all"}
              className="flex items-center justify-center gap-2 h-full rounded-xl cursor-pointer">
              <p className="text-(--text-high)">Lanjut Belanja</p>
              <img src={ArrowRight} alt="" />
            </Link>
						
          </section>

        </main>
      </div>
    </MainLayout> 
  )
}