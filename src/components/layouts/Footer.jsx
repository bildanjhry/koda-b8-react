import { Link } from "react-router"

// component
import Logo from "../ui/Logo"

//asset
import Delivery from "@/assets/icons/delivery-blue.svg"
import Safe from "@/assets/icons/safe-blue.svg"
import Return from "@/assets/icons/return.svg"
import Support from "@/assets/icons/support-blue.svg"
import { LuFacebook } from "react-icons/lu";
import { LuInstagram } from "react-icons/lu";
import { LuTwitter } from "react-icons/lu";
import { LuYoutube } from "react-icons/lu";

export default function Footer() {
  return (
    <div className="w-full primary-bg h-123 flex mt-auto flex-col items-center">
      <section className="w-full h-26.25 border-b-accent flex justify-center ">
        <ul className="w-[83%] flex justify-between large:w-315">
          <li className="flex gap-2 items-center">
            <div className="accent-bg rounded-full flex justify-center items-center h-10 w-10">
              <img src={Delivery} alt="" />
            </div>
            <div className="text-light text-sm">
              <p>Gratis Ongkir</p>
              <p className="text-(--text-accent) text-xs">Pembelian diatas Rp 100.000</p>
            </div>
          </li>
          <li className="flex gap-2 items-center">
            <div className="accent-bg rounded-full flex justify-center items-center h-10 w-10">
              <img src={Safe} alt="" />
            </div>
            <div className="text-light text-sm">
              <p>Pembayaran Aman</p>
              <p className="text-(--text-accent) text-xs">SSL terenkripsi 256-bit</p>
            </div>
          </li>
          <li className="flex gap-2 items-center">
            <div className="accent-bg rounded-full flex justify-center items-center h-[40px] w-[40px]">
              <img src={Return} alt="" />
            </div>
            <div className="text-light text-sm">
              <p>Pengembalian Mudah</p>
              <p className="text-(--text-accent) text-xs">30 Hari pengembalian gratis</p>
            </div>
          </li>
          <li className="flex gap-2 items-center">
            <div className="accent-bg rounded-full flex justify-center items-center h-[40px] w-[40px]">
              <img src={Support} alt="" />
            </div>
            <div className="text-light text-sm">
              <p>Dukungan 24/7</p>
              <p className="text-(--text-accent) text-xs">Bantuan kapan saja</p>
            </div>
          </li>
        </ul>
      </section>

      <section className="w-full h-84.5 border-b-accent flex justify-center">
        <ul className="flex w-[83%] large:w-315 gap-2 justify-between items-center">
          <li className="w-60 h-60.5 flex flex-col gap-5">
            <Logo scheme={"dark"}/>
            <p className="text-sm text-accent">Platform belanja online terpercaya dengan ribuan produk pilihan. Belanja mudah, 
              aman, dan menyenangkan.
            </p>
            <ul className="flex gap-3 items-center text-white text-[13px]">
              <li className="flex justify-center accent-bg items-center w-8 h-8 rounded-full">
                <LuFacebook/>
              </li>
              <li className="flex justify-center accent-bg items-center w-8 h-8 rounded-full">
                <LuInstagram/>
              </li>
              <li className="flex justify-center accent-bg items-center w-8 h-8 rounded-full">
                <LuTwitter/>
              </li>
              <li className="flex justify-center accent-bg items-center w-8 h-8 rounded-full">
                <LuYoutube/>
              </li>
            </ul>
          </li>
          <li className="w-60 h-60.5 flex flex-col gap-3">
            <p className="text-white">Layanan</p>
            <ul className="flex flex-col gap-2.5 text-(--text-accent) text-sm">
              <li>
                <Link to={""}>Tentang Kami</Link>
              </li>
              <li>
                <Link to={""}>Karir</Link>
              </li>
              <li>
                <Link to={""}>Blog</Link>
              </li>
              <li>
                <Link to={""}>Program Afiliasi</Link>
              </li>
              <li>
                <Link to={""}>Jual di Belimudah</Link>
              </li>
            </ul>
          </li>
          <li className="w-60 h-60.5 flex flex-col gap-3">
            <p className="text-white">Bantuan</p>
            <ul className="flex flex-col gap-2.5 text-(--text-accent) text-sm">
              <li>
                <Link to={""}>Cara Belanja</Link>
              </li>
              <li>
                <Link to={""}>Kebijakan Pelanggan</Link>
              </li>
              <li>
                <Link to={""}>Lacak Pesanan</Link>
              </li>
              <li>
                <Link to={""}>FAQ</Link>
              </li>
              <li>
                <Link to={""}>Hubungi Kami</Link>
              </li>
            </ul>
          </li>
          <li className="w-60 h-60.5 flex flex-col gap-3">
            <p className="text-white">Kontak</p>
            <ul className="flex flex-col gap-2.5 text-(--text-accent) text-sm pl-4">
              <li className="list-image-[url(/icons/location-accent.svg)]">
                <Link to={""} className="relative bottom-0.5">
                Jl. Sudirman No. 1, Jakarta Selatan, DKI Jakarta 12190
                </Link>
              </li>
              <li className="list-image-[url(/icons/phone-accent.svg)]">
                <Link to={""} className="relative bottom-0.5">
                0800-1234-5678 (Gratis)
                </Link>
              </li>
              <li className="list-image-[url(/icons/mail-accent.svg)]">
                <Link to={""} className="relative bottom-0.5">
                bantuan@belimudah.id
                </Link>
              </li>
              <li>
              </li>
            </ul>
            <div className="w-full relative bottom-2 h-32 p-3 rounded-xl bg-(--secondary-bg) flex flex-col gap-2">
              <p className="text-white text-xs">Newsletter</p>
              <form action="" className="w-full flex flex-col gap-2 h-20">
                <input 
                  placeholder="Email Kamu"
                  className="w-full h-10 border border-slate-400 text-xs text-white rounded-lg 
                  pl-3 bg-(--input-footer-bg)"
                  type="email" name="email" id="email" />
                <button 
                  type="submit"
                  className="bg-(--main-bg) text-white rounded-lg flex items-center 
                  h-10 w-full justify-center text-xs"
                >
                  Langganan
                </button>
              </form>
            </div>
          </li>
        </ul>
      </section>

      <section className="flex items-center justify-between h-12 w-[90%] md:w-[83%] justify-self-center">
        <p className="text-(--text-footer-bottom) text-xs">© 2026 BeliMudah. Seluruh hak cipta dilindungi.</p>
        <ul className="flex items-center gap-3 text-xs">
          <li>Kebijakan Privasi</li>
          <li>Syarat & Ketentuan</li>
          <li>Admin</li>
        </ul>
      </section>
    </div>
  )
}