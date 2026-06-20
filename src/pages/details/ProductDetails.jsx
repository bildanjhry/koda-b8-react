import { Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import moneyFormat from "@/utils/money-format";

// component
import MainLayout from "@/components/layouts/MainLayout";
import SubmitButton from "@/components/ui/SubmitButton.jsx"
import ActionButton from "@/components/ui/ActionButton.jsx"
import ProductsCard from "@/components/features/ProductsCard.jsx"

// hook
import useFetch from "@/hooks/useFetch";
import useUser from "@/hooks/useUser";

// asset
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import Plus from "@/assets/icons/plus-black.svg"
import ArrowRight from "@/assets/icons/bc-arrow-right-mute.svg"
import Minus from "@/assets/icons/minus-black.svg"
import Cart from "@/assets/icons/cart-orange.svg"
import Wishlist from "@/assets/icons/wishlist-mute.svg"
import Delivery from "@/assets/icons/delivery-blue.svg"
import Return from "@/assets/icons/return.svg"
import Safe from "@/assets/icons/safe-blue.svg"

export default function ProductDetails(){
  const [prodVariant, setProdVariant] = useState("")
  const [quantity, setQuantity] = useState(1)
  const { category, slugs } = useParams()
  const { user, cart: userCart, setterCart } = useUser()
  const { dataBySlugs : data, dataByCategory} = 
  useFetch("/data/products.json", category || '', slugs || '')
  const navigate = useNavigate()

  function handleRatingStars(rating){
    return Array.from({ length: 5 }).map((_, index) => (
      <FontAwesomeIcon
        key={index}
        icon={solidStar}
        className={`${index < Math.round(rating) ? 'text-(--text-star)' : 'text-(--text-light)'}`}
      />  
    ))
  }

  function handleDecreastQty(){
    if(quantity > 1) setQuantity(quantity-1)
  }

  function handleIncreastQty(){
    setQuantity(quantity+1)
  }

  function addToCart(){
    try{
      if(!user.id) throw new Error("Anda harus login dahulu")
      if(!prodVariant) throw new Error("Silahkan pilih varian")

      setterCart({
        ...data,
        variants: prodVariant,
        cartId:data.id+prodVariant+quantity,
        qty:quantity
      })
    } catch(err){
      alert(err.message)
    }
  }

  function addToWishlist(){

  }

  return(
    <MainLayout>
      <div className="w-[83%] flex flex-col mt-3">
        <div className="h-[4.2rem] w-full flex items-center">
          <ul className="h-full flex items-center gap-1">
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
            <li>
              <Link to={"/browse-product/all"}>
                Electronics
              </Link>
            </li>
            <li>
              <img src={ArrowRight} alt="breadcrum" className="top-[1px] relative" />
            </li>                        
          </ul>
        </div>
        <div className="flex flex-row h-fit">
          <section className="w-[48%] flex flex-col">
            <div className="rounded-xl overflow-hidden h-[604px] relative">
              { data.discount &&
                <div className="px-4 py-1 rounded-full bg-(--info-bg) text-light flex absolute 
                justify-center left-2 top-2">
                  {data.discount}
                </div>
              }
              <img 
                className="w-full h-full bg-cover bg-center"
                src={data.image?.path} alt={data.image?.alt} />
            </div>
            <div className="mt-4">
              <ul className="flex flex-row gap-3">
                <li className="w-16 h-16 rounded-lg overflow-hidden">
                  <button
                    type="button"
                    onClick={null}
                    className="h-full w-full">
                    <img src={data.image?.path} alt={data.image?.alt} />
                  </button>
                </li>
                <li className="w-16 h-16 rounded-lg overflow-hidden">
                  <button
                    type="button"
                    onClick={null}
                    className="h-full w-full">
                    <img src={data.image?.path} alt={data.image?.alt} />
                  </button>
                </li>
              </ul>
            </div>
          </section>

          <section className="w-[52%] flex justify-end">
            <div className="w-[96%] h-full flex flex-col gap-3">
              <div className="flex gap-1 items-center m-0">
                <p>{data.brand}</p>
                <p>·</p>
                <p>{data?.cat?.name}</p>
              </div>

              <h2 className="leading-1 m-0 text-h">{data.name}</h2>

              <div className="flex flex-row items-center gap-2">
                <div className="flex flex-row">
                  { handleRatingStars(data.rating) }
                </div>
                <p>{data.rating}</p>
                <p>({data.ratingTotal})</p>
                <div className="bg-(--success-bg) ml-4 w-130px h-20px px-3 py-1 flex flex-row 
                text-sm text-(--text-success) gap-1">
                  <p className="">Stok tersedia</p>
                  <p>({data.stocks})</p>
                </div>
              </div>

              <div className="w-full h-[120px] bg-(--accent-bg) rounded-lg mt-2 px-3 flex flex-col justify-center">
                <div className="flex flex-row gap-3 items-center">
                  <h1 className="text-(--text-high)">{moneyFormat(data?.price)[0]}</h1>
                  <p className="text-lg"><s>{moneyFormat(data?.discountPrice)[0]}</s></p>
                  <div className="text-light text-sm bg-(--info-bg) rounded-full flex px-3 py-1">
                    <p>Hemat {data?.discount?.slice(1,(data.discount.length))}</p>
                  </div>
                </div>
                <p className="text-sm text-(--text-success)">
                  Kamu hemat {moneyFormat(data?.discountPrice - data?.price)[0]}</p>
              </div>

              <div className="flex flex-col mt-3">
                <div className="flex flex-row gap-2 ">
                  <p className="text-h">Warna:</p>
                  <p 
                    className="text-(--text-high)">{prodVariant.charAt(0).toUpperCase() + prodVariant.slice(1)}</p>
                </div>
                <div className="flex flex-row gap-3 w-[50%] mt-2 text-sm">
                  {data?.variants?.map((item, index) => (
                    <div className="relative" key={index}>
                      <input 
                        className="absolute hidden top-4 left-3 peer"
                        type="radio" name={`color`} 
                        onChange={(e) => setProdVariant(e.target.value)}
                        id={`${item.toLowerCase()}`} 
                        value={`${item.toLowerCase()}`} 
                      />
                      <label 
                        className="border-(--border) border rounded-lg cursor-pointer 
                        h-[2.2rem] flex justify-center peer-checked:border-(--text-high)
                        peer-checked:text-(--text-high) items-center px-3"
                        htmlFor={`${item.toLowerCase()}`}>{item}</label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2 mt-4">
                <p className="text-h">Jumlah</p>
                <div className="flex items-center gap-3">
                  <div className="flex w-fit h-[38px] justify-center items-center rounded-xl border-light">
                    <button
                      className="w-[3.7rem] flex cursor-pointer justify-center items-center"
                      onClick={handleDecreastQty}
                    >
                      <img src={Minus} alt="decrease qty" />
                    </button>
                    <p className="w-7 text-center text-sm text-h">{quantity}</p>
                    <button
                      className="w-[3.7rem] flex cursor-pointer justify-center items-center"
                      onClick={handleIncreastQty}
                    >
                      <img src={Plus} alt="increase qty" />
                    </button>
                  </div>
                  <p className="text-sm">Stok: {data.stocks} pcs</p>
                </div>
              </div>

              <div className="mt-3 grid grid-cols-[43%_43%_9%] w-full justify-between">
                <ActionButton 
                  img={Cart} 
                  buttonText={"Tambah ke keranjang"} 
                  color={`text-(--text-action)`} 
                  bg={"bg-[transparent]"} 
                  handleOnclick={addToCart}
                  order={"left-to-right"}
                  border={"border-(--action-border)"}
                />
                <SubmitButton img={null} buttonText={"Beli Sekarang"} order={"right-to-left"}/>
                <ActionButton 
                  img={Wishlist} 
                  buttonText={""}
                  color={""}
                  bg={"bg-[transparent]"}
                  handleOnclick={addToWishlist}
                  order={""}
                  border={"border-light"}
                />
              </div>

              <div className="flex  mt-3 w-full justify-between">
                <div className="flex flex-col items-center justify-center gap-1 h-[73px] 
                w-[195px] bg-(--content-deep-bg) rounded-lg text-xs">
                  <img src={Delivery} alt="delivery" />
                  <p className="text-h">Gratis Ongkir</p>
                  <p>Min. Rp 100.000</p>
                </div>
                <div className="flex flex-col items-center justify-center gap-1 h-[73px] 
                w-[195px] bg-(--content-deep-bg) rounded-lg text-xs">
                  <img src={Safe} alt="delivery" />
                  <p className="text-h">Pembayaran Aman</p>
                  <p>SSL Terenkripsi</p>
                </div>
                <div className="flex flex-col items-center justify-center gap-1 h-[73px] 
                w-[195px] bg-(--content-deep-bg) rounded-lg text-xs">
                  <img src={Return} alt="delivery" />
                  <p className="text-h">Retur 30 Hari</p>
                  <p>Gratis retur</p>
                </div>                                
              </div>
            </div>
          </section>
        </div>

        <div className="my-20">
          <div className="w-full bg-[white] rounded-lg h-fit flex flex-col">
            <nav className="flex w-full h-[55px] gap-1 border-b-light text-sm">
              <button className="border-b-2 border-(--main-border) flex px-6 justify-center items-center">
                <p className="text-(--text-high)">Deskripsi</p>
              </button>
              <button className="flex px-6 justify-center items-center">
                <p className="">Spesifikasi</p>
              </button>
              <button className=" flex px-6 justify-center items-center">
                <p className="">Ulasan</p>
              </button>
            </nav>
            <div className="min-h-[5rem] w-full flex justify-end items-center">
              <article className="w-[98%]">
                  Headphone wireless dengan teknologi noise-cancelling terdepan. Nikmati musik favoritmu tanpa gangguan dengan kualitas suara yang memukau.
              </article>
            </div>
          </div>
          
          <div className="mb-8 w-full mt-10">
            <header className="flex items-center justify-between mt-2">
              <section className="h-[5rem] flex flex-row items-center gap-2">
                <div className="flex flex-row justify-start 
                w-fit h-full items-center gap-3">
                  <h3 className="">Produk Terkait</h3>
                </div>
              </section>
            </header>

            {/* <ProductsCard/> */}
          </div> 

        </div>
      </div>
    </MainLayout>
  )
}