import { Link } from "react-router"
import FashionSale from "@/assets/bg/fashion-sale.png"
import ElectronicsSale from "@/assets/bg/electronics-sale.png"

export default function InfoCards(){
  return(
    <div className="w-full grid mt-5 md:mt-7 shrink-0 md:grid-cols-2 grid-cols-1 mb-10 gap-3 overflow-hidden justify-between text-light">
      <section className="flex flex-col justify-center shrink-0 overflow-hidden relative h-44 rounded-xl">
        <img 
          className="absolute h-full w-full bg-cover shrink-0 bg-center rounded-xl"
          src={FashionSale} alt="fashion sale" />
        <div className="flex flex-col gap-2 pl-6 z-2 h-full justify-center [background:var(--gradient-info-1-bg)]">
          <p className="text-sm font-light">Fashion Wanita</p>
          <h3 className="text-light">Diskon s/d 50%</h3>
          <Link
            to={"/browse-product/all"}
            className="rounded-md flex justify-center text-sm items-center w-35.25 h-7.5 border"
          >
            <p>Belanja Sekarang</p>
          </Link>
        </div>
      </section>

      <section className="flex relative overflow-hidden flex-col justify-center h-44 rounded-xl">
        <img 
          className="absolute h-full w-full bg-center bg-contain rounded-xl"
          src={ElectronicsSale} alt="fashion sale" />
        <div className="flex flex-col gap-2 pl-6 z-2 justify-center h-full [background:var(--gradient-info-2-bg)]">
          <p className="text-sm font-light">Elektronik Pilihan</p>
          <h3 className="text-light">Harga Terbaik</h3>
          <Link
            to={"/browse-product/all"}
            className="rounded-md flex justify-center text-sm items-center w-35.25 h-7.5 border"
          >
            <p>Lihat Produk</p>
          </Link>
        </div>
      </section>
    </div>
  )
}