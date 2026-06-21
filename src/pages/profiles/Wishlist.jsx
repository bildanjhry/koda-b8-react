// component
import ProductsCard from "@/components/features/ProductsCard.jsx"
import useUser from "@/hooks/useUser"

import { MdOutlineFavoriteBorder } from "react-icons/md";


export default function Wishlist(){
  const { wishlist } = useUser()
  return(
    <div className="w-[95%] pt-1 h-fit">
      <h3>Wishlist ({wishlist.length})</h3>
      <div className="
        py-4  w-full 3xl:w-full">
        <ProductsCard count={2} params={"WISHLIST"}/>
      </div>
      <div className="w-full border-light rounded-xl flex flex-col h-88 gap-3 items-center justify-center">
        <MdOutlineFavoriteBorder size={66}/>
        <h2>Kamu belum punya wishlist produk</h2>
      </div>
	  </div>
  )
}