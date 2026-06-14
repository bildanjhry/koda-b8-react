// component
import Logo from "../ui/Logo"

//asset
import Delivery from "@/assets/icons/delivery-blue.svg"
import Safe from "@/assets/icons/safe-blue.svg"
import Return from "@/assets/icons/return.svg"
import Support from "@/assets/icons/support-blue.svg"

export default function Footer() {
  return (
    <div className="w-full primary-bg h-[492px] flex mt-auto flex-col">
      <section className="w-full h-[105px] border-b-accent flex justify-center ">
        <ul className="w-[83%] flex justify-between">
          <li className="flex gap-2 items-center">
            <div className="accent-bg rounded-full flex justify-center items-center h-[40px] w-[40px]">
              <img src={Delivery} alt="" />
            </div>
            <div className="text-light text-sm">
              <p>Gratis Ongkir</p>
              <p className="text-(--text-accent)">Pembelian diatas Rp 100.000</p>
            </div>
          </li>
          <li className="flex gap-2 items-center">
            <div className="accent-bg rounded-full flex justify-center items-center h-[40px] w-[40px]">
              <img src={Safe} alt="" />
            </div>
            <div className="text-light text-sm">
              <p>Gratis Ongkir</p>
              <p className="text-(--text-accent)">Pembelian diatas Rp 100.000</p>
            </div>
          </li>
          <li className="flex gap-2 items-center">
            <div className="accent-bg rounded-full flex justify-center items-center h-[40px] w-[40px]">
              <img src={Return} alt="" />
            </div>
            <div className="text-light text-sm">
              <p>Gratis Ongkir</p>
              <p className="text-(--text-accent)">Pembelian diatas Rp 100.000</p>
            </div>
          </li>
          <li className="flex gap-2 items-center">
            <div className="accent-bg rounded-full flex justify-center items-center h-[40px] w-[40px]">
              <img src={Support} alt="" />
            </div>
            <div className="text-light text-sm">
              <p>Gratis Ongkir</p>
              <p className="text-(--text-accent)">Pembelian diatas Rp 100.000</p>
            </div>
          </li>
        </ul>
      </section>
      <section className="w-full h-[338px] border-b-accent flex justify-center">
        <ul className="flex w-[83%] gap-2 justify-between items-center">
          <li className="w-[15rem] h-[242px] accent-bg flex flex-col gap-4">
            <Logo scheme={"dark"}/>
            <p className="text-sm text-accent">Platform belanja online terpercaya dengan ribuan produk pilihan. Belanja mudah, 
              aman, dan menyenangkan.
            </p>
            <ul className="flex gap-2 items-center">
              <li className="flex justify-center accent-bg items-center w-[32px] h-[32px] rounded-full">
                <img src={null} alt="" />
              </li>
              <li className="flex justify-center accent-bg items-center w-[32px] h-[32px] rounded-full">
                <img src={null} alt="" />
              </li>
              <li className="flex justify-center accent-bg items-center w-[32px] h-[32px] rounded-full">
                <img src={null} alt="" />
              </li>
              <li className="flex justify-center accent-bg items-center w-[32px] h-[32px] rounded-full">
                <img src={null} alt="" />
              </li>
            </ul>
          </li>
          <li className="w-[15rem] accent-bg h-[242px]">
            <div></div>
          </li>
          <li className="w-[15rem] accent-bg h-[242px]">
            <div></div>
          </li>
          <li className="w-[15rem] accent-bg h-[242px]">
            <div></div>
          </li>
        </ul>
      </section>
      <section></section>
    </div>
  )
}