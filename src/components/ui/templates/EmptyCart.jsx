import { Link } from "react-router";

import { FiShoppingCart } from "react-icons/fi";

export default function EmptyCart(){
  return(
    <div 
      className="w-full min-h-135 mt-5 bg-white rounded-xl border-light flex
    flex-col justify-center items-center text-h  px-8">
      <FiShoppingCart size={70}/>
      <h1>Opps..</h1>
      <h4 className="font-medium text-2xl mb-8">Keranjang kamu kosong</h4>
      <Link 
        to={"/browse-product/all"}
        className="w-50 text-sm h-11 flex justify-center items-center rounded-xl bg-(--main-bg) 
			text-white">
				Mulai Belanja
      </Link>
    </div>		
  )
}