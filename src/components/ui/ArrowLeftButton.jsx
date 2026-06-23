import { Link } from "react-router"

// asset
import ArrowRight from "@/assets/icons/arrow-right-blue.svg"

export default function ArrowRightButton(){
  return(
    <>
      <Link 
        className="flex gap-2"
        to={"/browse-product/all"}>
        <p className="text-sm text-(--text-high) hidden md:flex">Lihat Semua</p>
        <img src={ArrowRight} alt="see all" />
      </Link>
    </>
  )
}