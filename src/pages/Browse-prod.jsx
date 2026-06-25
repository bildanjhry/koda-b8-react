import { Link } from "react-router"
import { Suspense, useEffect, useState, lazy } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";

// component
import MainLayout from "../components/layouts/MainLayout"
const ProductsCard = lazy(() => import("@/components/features/ProductsCard.jsx"))
import SkeletonCard from "@/components/ui/skeleton/SkeletonCards";

// asset
import ArrowRight from "@/assets/icons/bc-arrow-right-mute.svg"
import ActionButton from "@/components/ui/ActionButton";

export default function BrowseProduct() {
  const [brands, setBrands] = useState()
  const [loadMore, setLoadMore] = useState(false)

  useEffect(() => {
    async function getBrands(length, count = 3){
      try{
        const res = await fetch("/data/brands.json")
        const data = await res.json()
        setBrands(data)

      } catch(err){
        // will retry 3 times if error happend
        if(count >= 1) getBrands(count-1)
        return console.error(err.message)
      }
    }
    if(loadMore) getBrands(6)
    else getBrands()

  },[loadMore, setLoadMore,])

  function printStars(rating){
    return Array.from({ length: 5 }).map((_, index) => (
      <FontAwesomeIcon
        key={index}
        icon={solidStar}
        className={classNames(
          {'text-(--text-star)': index < Math.round(rating) },
          {'text-(--text-accent)': index >= Math.round(rating)}
        )}
      />  
    ))
  }

  return (
    <MainLayout>
      <div className="flex flex-col md:mt-3 w-[95%] md:w-[83%]">
        <header className="w-full flex flex-col">
          <div className="h-14 md:h-[6.2rem] w-full flex  flex-col">
            <ul className="h-full flex items-center gap-1 text-sm md:text-md">
              <li>
                <Link to={"/"}>
                Beranda
                </Link>
              </li>
              <li>
                <img src={ArrowRight} alt="breadcrum" className="top-[1px] relative" />
              </li>
              <li>
                <Link to={"/browse-product/all"}>
                Toko
                </Link>
              </li>
              <li>
                <img src={ArrowRight} alt="breadcrum" className="top-[1px] relative" />
              </li>
              <li className="text-h">
                <Link to={"/browse-product/all"}>
                Semua Produk
                </Link>
              </li>
            </ul>
            <h2 className="text-h hidden md:flex">Semua Produk</h2>
          </div>
        </header>
        
        <main className="flex flex-row mt-2 md:mt-0">
          <aside className="hidden md:flex flex-col gap-4 w-[25%]">
            <div className="h-22 my-4 flex flex-col justify-between">
              <h4 className="text-h font-medium">Harga</h4>
              <div className="text-sm w-full flex items-center justify-between">
                <p>Rp 0</p>
                <p>Rp 20.000.000</p>
              </div>
            </div>

            <div className="h-fit w-full">
              <h4 className="text-h font-medium">Merek</h4>
              <ul className="flex flex-col gap-1 mt-2">
                {brands?.map((item, index) => (
                  <li 
                    key={index}
                    className="text-sm flex items-center gap-2">
                    <input type="checkbox" id={`${item.id}`}/>
                    <label 
                      className="cursor-pointer"
                      htmlFor={`${item.id}`}>{item.name}</label>
                  </li>
                ))}
              </ul>
            </div>

            <div className="my-2 flex flex-col">
              <h4 className="text-h font-medium">Rating</h4>
              <ul className="mt-2 flex flex-col gap-1 text-sm">
                <li className="flex items-center gap-2">
                  <input type="radio" name="rating" id="rating-4" value={4}/>
                  <label
                    className="flex gap-2 items-center cursor-pointer"
                    htmlFor="rating-4">
                    <div className="flex gap-0 m-0">
                      {printStars(4)}
                    </div>
                    <p>Ke atas</p>
                  </label>
                </li>
                <li className="flex items-center gap-2">
                  <input type="radio" name="rating" id="rating-3" value={3}/>
                  <label
                    className="flex gap-2 items-center cursor-pointer"
                    htmlFor="rating-3">
                    <div className="flex gap-0 m-0">
                      {printStars(3)}
                    </div>
                    <p>Ke atas</p>
                  </label>
                </li>
                <li className="flex items-center gap-2">
                  <input type="radio" name="rating" id="rating-2" value={2}/>
                  <label
                    className="flex gap-2 items-center cursor-pointer"
                    htmlFor="rating-2">
                    <div className="flex gap-0 m-0">
                      {printStars(2)}
                    </div>
                    <p>Ke atas</p>
                  </label>
                </li>                                
              </ul>
            </div>

            <div className="flex flex-col">
              <h4 className="text-h font-medium">Ketersediaan</h4>
              <div className="flex gap-2 items-center mt-2 text-sm">
                <input className="cursor-pointer" type="checkbox" id="available"/>
                <label className="cursor-pointer" htmlFor="available">Stok Tersedia</label>
              </div>
            </div>

          </aside>

          <div className="flex flex-col w-full md:pl-4">
            <div className="flex justify-between items-center h-9 md:h-12">
              <p>{18} Produk <span className="hidden md:inline">Ditemukan</span></p>
              <div className="flex items-center gap-3">
                <p className="hidden md:flex">Urutkan:</p>
                <select name="sorting" id="" 
                  className="rounded-lg border-none bg-white text-sm pr-5 pl-2 py-2 
                  flex items-center justify-center text-h ">
                  <option value="populer">Paling Populer</option>
                  <option value="populer">Paling Populer</option>
                  <option value="populer">Paling Populer</option>  
                </select>
              </div>
            </div>

            <div className="mt-5">
              <Suspense fallback={<SkeletonCard count={4} total={8}/>}>
                <ProductsCard width={"SMALL"} scroll={"NO_SCROLL"}/>
              </Suspense>
            </div>

            <div className="w-70 md:w-[20rem] my-10 grid mx-auto text-sm md:text-md">
              <ActionButton
                img={false}
                buttonText={'Muat Lebih Banyak (6 Produk lagi)'}
                color={'text-(--text-high)'}
                bg={'bg-white'}
                handleOnclick={ () => setLoadMore(true) }
                order=""
                border={'border-(--border-main)'}
              />
            </div>

          </div>
        </main>
      </div>
    </MainLayout>
  )
}