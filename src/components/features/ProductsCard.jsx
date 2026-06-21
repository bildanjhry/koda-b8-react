import { Link } from "react-router"
import classNames from "classnames";
import moneyFormat from "@/utils/money-format.js"
import useFetch from "@/hooks/useFetch";

// componets
import RenderStars from "@/components/ui/RenderStars";

export default function Card({count = 4, width = "large"}){
  const {data : products} = useFetch("/data/products.json")

  return(
    <div className={classNames(
      `grid gap-3`,
      {'grid-cols-2' : count === 2},
      {'grid-cols-4': count === 4}
    )}>

      {products?.map((item, index) => (
        <Link
          key={index}
          to={`/details/${item.cat?.id}/${item.slugs}`} 
          className="bg-(--container-bg) border-light rounded-xl h-105 overflow-hidden">
          <header className="w-full h-[70%] overflow-hidden relative">
            <img 
              className="h-full w-full object-cover"
              src={item.image?.path} alt={item.image?.alt} />
          </header>
          <main className="flex flex-col pl-5 gap-1 mt-2  ">
            <p className={classNames(
              {"text-xs": width === "small"},
              "text-xs"
            )}>{item.brand}</p>
            <p className={classNames(
              "text-h font-medium",
              {"text-[14px]": width === "small"}
            )}>{item.name}</p>
            <div className="flex items-center text-sm">
              <RenderStars rating={item.rating} width={width}/>
              <p className="pl-2">{item.rating}</p>
              <p className="pl-1">({item.ratingTotal})</p>
            </div>
            <div className="flex flex-row gap-2 mt-1 items-center">
              <p className="text-(--text-high) text-lg font-semibold">{moneyFormat(item?.price)[0]}</p>
              <p className="text-xs relative top-px"><s>{moneyFormat(item?.discountPrice)[0]}</s></p>
            </div>
          </main>
        </Link>
      ))}
    </div>
  )
}