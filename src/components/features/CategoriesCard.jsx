import { Link } from "react-router"

// component
import ArrowRightButton from "@/components/ui/ArrowLeftButton"

// custom hook
import useFetch from "@/hooks/useFetch"

export default function CategoriesCard(){
  const {data: categories} = useFetch("/data/categories.json")

  return(
    <div className="w-full flex flex-col gap-0 md:gap-3 mt-2 md:mt-4 mb-5 md:mb-8">
      <header className="flex gap-5 md:gap-0 md:justify-between w-full h-20 items-center">
        <h3 className="hidden md:flex">Belanja Berdasarkan Kategori</h3>
        <p className="visible md:hidden text-h text-md">Belanja Berdasarkan Kategori</p>
        <ArrowRightButton/>
      </header>

      <main className="flex flex-row gap-3 overflow-y-scroll md:overflow-auto w-full h-fit">
        {categories?.filter((val) => val.status !== "navbar").map((item, index) => (
          <Link 
            to={"/browse-product/"+item.name}
            key={index}
            className="rounded-lg shrink-0 items-center pt-2 flex flex-col border-light gap-2 
						bg-(--container-bg) w-49.5 h-34.5">
            <img 
              className="w-14 rounded-lg h-14"
              src={item.image?.path} alt={item.image?.alt} />
            <p className="text-h tex-sm leading-3 pt-3 text-sm ">{item.name}</p>
            <p className="text-sm">{item.total} Produk</p>
          </Link>
        ))}
      </main>
    </div>
  )
}