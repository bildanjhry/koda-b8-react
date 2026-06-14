import { useEffect, useState } from "react"
import { Link } from "react-router"
import moneyFormat from "@/utils/money-format.js"

// asset
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";

export default function Card({count = 4}){
  const [datas, setDatas] = useState([])

  useEffect(() => {
    async function getProducts(){
      const apiUrl = "/data/products.json"
      const res = await fetch(apiUrl)
      const data = await res.json()
      setDatas(data)
    }
    getProducts()
  },[])

  function handleRatingStars(rating){
    return Array.from({ length: 5 }).map((_, index) => (
      <FontAwesomeIcon
        key={index}
        icon={solidStar}
        className={`${index < Math.round(rating) ? 'text-(--text-star)' : 'text-(--text-light)'}`}
      />  
    ))
  }

  return(
    <div className={`grid ${count === 2 ? 'grid-cols-2' : 'grid-cols-4'} gap-3`}>
      {datas?.map((item, index) => (
        <Link
          key={index}
          to={`/details/${item.id}`} 
          className="bg-(--container-bg) border-light rounded-xl h-[420px] overflow-hidden">
          <header className="w-full h-[70%] overflow-hidden relative">
            <img 
              className="h-[100%] w-[100%] object-cover"
              src={item.image} alt="product" />
          </header>
          <main className="flex flex-col pl-5 gap-1 mt-2">
            <p className="text-xs">{item.brand}</p>
            <p className="text-h font-[500]">{item.name}</p>
            <div className="flex items-center text-sm">
              { handleRatingStars(item.rating)}
              <p className="pl-2">{item.rating}</p>
              <p className="pl-1">({item.ratingTotal})</p>
            </div>
            <div className="flex flex-row gap-2 mt-1 items-center">
              <p className="text-(--text-high) text-lg font-[600]">{moneyFormat(item?.price)[0]}</p>
              <p className="text-sm"><s>{moneyFormat(item?.discountPrice)[0]}</s></p>
            </div>
          </main>
        </Link>
      ))}
    </div>
  )
}