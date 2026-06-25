import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { useParams } from "react-router";
import moneyFormat from "@/utils/money-format";

// component
import MainLayout from "@/components/layouts/MainLayout";
import ActionButton from "@/components/ui/ActionButton.jsx"
import ProductsCard from "@/components/features/ProductsCard.jsx"
import RenderStars from "@/components/ui/RenderStars";

// hook
import useFetch from "@/hooks/useFetch";
import useUser from "@/hooks/useUser";

// asset
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
  const [errorData, setErrorData] = useState({
    error:false,
    code:"",
    message:""
  })
  const { category, slugs } = useParams()
  const { user, setterCart } = useUser()
  const { dataBySlugs : data } = 
  useFetch("/data/products.json", category || '', slugs || '')
  const navigate = useNavigate()

  function handleDecreastQty(){
    if(quantity > 1) setQuantity(quantity-1)
  }

  function handleIncreastQty(){
    setQuantity(quantity+1)
  }

  function buttonActions(code){
    try{
      // guard clause
      if(!user.id) {
        const err = new Error("Unauthorized")
        err.code = "AUTH_REQUIRED"
        err.status = 401

        throw err
      }
      if(!prodVariant) {
        const err = new Error("Silahkan Pilih Varian")
        err.code = "EMPTY_REQUIRED_VALUE"
        err.status = 401

        throw err
      }

      const dataProduct = {
        ...data,
        variants: prodVariant,
        cartId:data.id+prodVariant+quantity,
        qty:quantity
      }

      switch(code) {
      case "ADD_TO_CART":
        setterCart(dataProduct)
        break;
      case "BUY_NOW":
        navigate("/checkout", {state:{code:"BUY_NOW", prod:dataProduct }})
        break;
      case"ADD_TO_WISHLIST":
        break;
      default:
        return
      }

    } catch(err){
      if(err.code === "AUTH_REQUIRED"){
        navigate("/login", { state:{origin: location.pathname}})
      }
      if(err.code === "EMPTY_REQUIRED_VALUE"){
        setErrorData({
          error:true,
          code:err.code,
          message:err.message
        })
      }
      console.error(err.message)
    }
  }

  return(
    <MainLayout>
      <div className="w-[95%] md:w-[83%] flex flex-col mt-3">

        <div className="h-[4.2rem] w-full flex items-center">
          <ul className="h-full flex items-center gap-1 text-sm">
            <li>
              <Link to={"/"}>
                Beranda
              </Link>
            </li>
            <li>
              <img src={ArrowRight} alt="breadcrum" className="top-xp relative" />
            </li>
            <li>
              <Link to={"/browse-product/all"}>
                Toko
              </Link>
            </li>
            <li>
              <img src={ArrowRight} alt="breadcrum" className="top-xp relative" />
            </li>
            <li>
              <Link to={"/browse-product/all"}>
                Electronics
              </Link>
            </li>
            <li>
              <img src={ArrowRight} alt="breadcrum" className="top-xp relative" />
            </li>                        
          </ul>
        </div>

        <div className="flex flex-col md:flex-row h-fit">
          <section className="w-full md:w-[48%] flex flex-col">
            <div className="rounded-xl overflow-hidden md:h-151 w-full relative">
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

          <section className="w-full md:w-[52%] md:mt-0 mt-10 flex justify-end">
            <div className="md:w-[96%] w-full h-full flex flex-col gap-0">
              <div className="flex gap-1 items-center m-0 text-sm">
                <p>{data.brand}</p>
                <p>·</p>
                <p>{data?.cat?.name}</p>
              </div>

              <h2 className="leading-8 m-0 text-h">{data.name}</h2>

              <div className="flex flex-row items-center gap-2">
                <div className="flex flex-row">
                  <RenderStars rating={data.rating}/>
                </div>
                <p>{data.rating}</p>
                <p>({data.ratingTotal})</p>
                <div className="bg-(--success-bg) ml-4 w-130px h-20px px-3 py-1 flex flex-row 
                text-sm text-(--text-success) gap-1">
                  <p className="">Stok tersedia</p>
                  <p>({data.stocks})</p>
                </div>
              </div>

              <div className="w-full h-30 bg-(--accent-bg) rounded-lg mt-6 px-3 flex flex-col justify-center">
                <div className="flex flex-col items-start md:flex-row md:gap-3 md:items-center relative">
                  <h1 className="text-(--text-high)">{moneyFormat(data?.price)[0]}</h1>
                  { data?.discountPrice > 0 && 
                   <p className="text-lg relative bottom-2 md:bottom-0"><s>{moneyFormat(data?.discountPrice)[0]}</s></p> }
                  <div className="text-light absolute md:static right-0 top-3 text-sm bg-(--info-bg) rounded-full md:flex px-3 py-1">
                    <p>Hemat {data?.discount?.slice(1,(data.discount.length))}</p>
                  </div>
                </div>
                <p className="text-sm text-(--text-success)">
                  Kamu hemat {moneyFormat(data?.discountPrice - data?.price)[0]}</p>
              </div>

              <div className="flex flex-col mt-5">
                <div className="flex flex-row gap-2 ">
                  <p className="text-h">Warna:</p>
                  <p 
                    className="text-(--text-high)">{prodVariant.charAt(0).toUpperCase() + prodVariant.slice(1)}</p>
                </div>
                <div className="flex flex-row gap-3 w-full mt-2 text-sm items-center">
                  {data?.variants?.map((item, index) => (
                    <div className="relative" key={index}>
                      <input 
                        className="absolute hidden top-4 left-3 peer"
                        type="radio" name={`color`} 
                        onChange={(e) => {
                          if(e.target.checked && errorData.error){
                            setErrorData({
                              error:false,
                              code:"",
                              message:""
                            })
                          }
                          setProdVariant(e.target.value)
                        }}
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
                  { errorData.error &&
                  <div className="w-full text-sm">
                    <p className="text-red-500">*{errorData.message}</p>
                  </div>
                  }
                </div>
              </div>

              <div className="flex flex-col gap-2 mt-6">
                <p className="text-h">Jumlah</p>
                <div className="flex items-center gap-3">
                  <div className="flex w-fit h-9.5 justify-center items-center rounded-xl border-light">
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

              <div className="mt-7 hidden md:grid grid-cols-[43%_43%_9%] w-full justify-between">
                <ActionButton 
                  img={Cart} 
                  buttonText={"Tambah ke keranjang"} 
                  color={`text-(--text-action)`} 
                  bg={"bg-[transparent]"} 
                  handleOnclick={() => {buttonActions("ADD_TO_CART")}}
                  order={"left-to-right"}
                  border={"border-(--action-border)"}
                />
                <ActionButton 
                  img={null} 
                  buttonText={"Beli Sekarang"} 
                  color={`text-white`} 
                  bg={"bg-(--action-bg)"} 
                  handleOnclick={() => {buttonActions("BUY_NOW")}}
                  order={"left-to-right"}
                  border={"border-(--action-border)"}
                />
                <ActionButton 
                  img={Wishlist} 
                  buttonText={""}
                  color={""}
                  bg={"bg-[transparent]"}
                  handleOnclick={() => {buttonActions("ADD_TO_WISHLIST")}}
                  order={""}
                  border={"border-light"}
                />
              </div>

              <div className="flex flex-col md:flex-row gap-2 mt-5 w-full justify-between">
                <div className="flex gap-4 md:flex-col items-center justify-center md:gap-1 h-18.25 
                w-full md:w-48.75 bg-(--content-deep-bg) rounded-lg text-xs">
                  <img src={Delivery} alt="delivery" />
                  <p className="text-h">Gratis Ongkir</p>
                  <p className="hidden md:flex">Min. Rp 100.000</p>
                </div>
                <div className="flex gap-4 md:flex-col items-center justify-center md:gap-1 h-18.25 
                w-full md:w-48.75 bg-(--content-deep-bg) rounded-lg text-xs">
                  <img src={Safe} alt="delivery" />
                  <p className="text-h">Pembayaran Aman</p>
                  <p className="hidden md:flex">SSL Terenkripsi</p>
                </div>
                <div className="flex gap-4 md:flex-col items-center justify-center md:gap-1 h-18.25 
                w-full md:w-48.75 bg-(--content-deep-bg) rounded-lg text-xs">
                  <img src={Return} alt="delivery" />
                  <p className="text-h">Retur 30 Hari</p>
                  <p className="hidden md:flex">Gratis retur</p>
                </div>                                
              </div>
            </div>
          </section>
        </div>

        <div className="my-5 mdLmy-20">
          <div className="w-full bg-[white] rounded-lg h-fit flex flex-col">
            <nav className="flex w-full h-13.75 gap-1 border-b-light text-sm">
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
            <div className="min-h-20 w-full flex justify-center md:justify-end items-center">
              <article className="w-[90%] py-5 md:py-2 md:w-[98%]">
                  Headphone wireless dengan teknologi noise-cancelling terdepan. Nikmati musik favoritmu tanpa gangguan dengan kualitas suara yang memukau.
              </article>
            </div>
          </div>
          
          <div className="mb-8 w-full mt-10">
            <header className="flex items-center justify-between mt-2">
              <section className="h-20 flex flex-row items-center gap-2">
                <div className="flex flex-row justify-start 
                w-fit h-full items-center gap-3">
                  <h3 className="">Produk Terkait</h3>
                </div>
              </section>
            </header>

            <ProductsCard/>
          </div> 

        </div>
      </div>
    </MainLayout>
  )
}