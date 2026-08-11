import moneyFormat from "@/utils/money-format.js"
import * as yup from "yup"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"

// assets
import Plus from "@/assets/icons/plus-white.svg"
import Search from "@/assets/icons/search-mute.svg"
import Watch from "@/assets/icons/watch-mute.svg"
import Edit from "@/assets/icons/edit-mute.svg"
import Delete from "@/assets/icons/delete-mute.svg"
import useFetch from "@/hooks/useFetch"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faL, faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { FiUpload } from "react-icons/fi";

import Modal from "@/components/ui/ModalPortal"

const schema = yup.object({
  image:yup.mixed().required("Mohon masukan gambar"),
  title:yup.string().required("Mohon masukan nama produk"),
  price:yup.string().required("Mohon masukan nama produk"),
  description:yup.string().required("Mohon masukan nama produk"),
})

export default function Products() {
  const [products, setProducts] = useState([])
  const [addProduct, setAddproduct] = useState(false)
  const [imageProd, setImageProd] = useState("")
  const [imageFile, setImageFile] = useState("")
  const session = useSelector(state => state.session.session)

  const { register, getValues, formState:{ errors }, handleSubmit, reset } = useForm({
    resolver:yupResolver(schema),
  })

  useEffect(() => {
    async function getDataProducts(count = 3) {
      try {
        const API = import.meta.env.VITE_API_URL
        const params = new URLSearchParams({
          page: 1,
          limit: 30
        })
        const response = await fetch(`${API}/products?${params}`)
        const data = await response.json()
        console.log(data)
        setProducts(data.data)
      } catch (err) {
        if (count < 1) {
          console.error(err.message)
          return
        }
        return getDataProducts(count -= 1)
      }
    }
    getDataProducts()
  }, [])

  function handlePrev(data){
    setImageFile(data.target.files[0])
    setImageProd(URL.createObjectURL(data.target.files[0]))
  }

  async function onSubmit(data) {
    try{
      const API = import.meta.env.VITE_API_URL
      const token = session.token

      const formData = new FormData()
      for (const key in data){
        if(key === "image"){
          formData.append('file', imageFile)
        } else {
          formData.append(key, data[key])
        }
      }

      const response = await fetch(`${API}/products`, {
        method: "POST",
        headers:{
          "Authorization":`Bearer ${token}`
        },
        body: formData
      })

      const dataRes = await response.json()
      if(!dataRes.success){
        throw new Error(dataRes.message)
      }
      alert(dataRes.message)
      reset()
      setImageProd("")
    } catch(err){
      console.error(err.message)
    }
  }


  function onError(errors){
    console.log(errors)
  }


  return (
    <div className="px-6 mb-10">
      { addProduct &&
      <Modal>
        <div className="flex flex-col gap-5 w-120 p-4">
          <h3>Add new Product</h3>
          <form 
          onSubmit={handleSubmit(onSubmit, onError)}
          className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <label htmlFor="image">
                <div className="cursor-pointer overflow-hidden rounded-md w-30 h-30">
                  {imageProd ? 
                  <img
                    src={imageProd}
                    className="h-full w-full object-cover border border-gray-200 rounded-md"
                  /> :
                  <div
                    className="content-cent h-full gap-3 border-dashed flex-col border rounded-md">
                    <FiUpload className="text-2xl" />
                    <p className="text-xs text-center w-[60%]">Upload gambar</p>
                  </div> 
                  }
                </div>
              </label>
              <input
                {...register("image")}
                accept="image/png,image/jpeg,image/jpg"
                onChange={(data) => {handlePrev(data)}}
                className="hidden"
                type="file" id="image" name="image" />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="alt">Name Alt</label>
              <input
                {...register("alt")}
                placeholder="Masukan Alt Produk"
                className="border text-sm rounded-md h-10 pl-4"
                type="text" id="alt" name="alt" />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="title">Name</label>
              <input
                {...register("title")}
                placeholder="Masukan Nama Produk"
                className="border text-sm rounded-md h-10 pl-4"
                type="text" id="title" name="title" />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="price">Harga</label>
              <input
                {...register("price")}
                placeholder="Masukan Harga Produk"
                className="border text-sm rounded-md h-10 pl-4"
                type="text" id="price" name="price" />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="description">Deskripsi</label>
              <textarea
                {...register("description")}
                rows={6}
                className="border text-sm rounded-md p-4"
                type="text" id="description" name="description" />
            </div>
            <button 
            type="submit"
            className="bg-(--main-bg) text-white 
            rounded-md w-full h-10 border-none content-cent cursor-pointer">
              Tambah
            </button>
          </form>
        </div>
      </Modal> }
      <header className="flex flex-col gap-5 mt-6">
        <div className="flex justify-between h-10 items-center">
          <div className="flex flex-col justify-center gap-0">
            <p className="text-h text-2xl font-medium">Manajemen Produk</p>
          </div>
          <button 
          onClick={() => {
            setAddproduct(true)
          }}
          className="w-[159px] h-full bg-(--action-bg) flex justify-center items-center
						text-white text-sm rounded-xl">
            <img src={Plus} alt="add product" />
            <p>Tambah Produk</p>
          </button>
        </div>
        <div>
          <form
            className="bg-white border-light w-full justify-between rounded-lg p-4 
							gap-0 grid grid-cols-[73%_15%_10%] h-19"
            action="">
            <div className="relative h-full w-full text-sm">
              <img
                className="absolute top-3 left-4"
                src={Search} alt="search" />
              <input
                placeholder="Cari produk atau merk"
                className="h-full rounded-xl w-full bg-(--input-bg) border-light pl-10"
                type="search" name="search" id="" />
            </div>
            <select
              className="rounded-xl h-full flex justify-center text-sm pl-4 text-h items-center border-light"
              name="category" id="">
              <option value="">Semua kategori</option>
            </select>
            <button className="h-full rounded-xl border-light">
              <p className="text-sm">Filter</p>
            </button>
          </form>
        </div>

        <div className="mt-1 grid grid-cols-4 gap-3 justify-between">
          <div className="flex flex-col items-center justify-center bg-white border-white border-light 
							rounded-xl h-[90px]">
            <h2 className="text-h leading-4">18</h2>
            <p className="text-sm">Total Produk</p>
          </div>
          <div className="flex flex-col items-center justify-center bg-white border-white border-light 
							rounded-xl h-[90px]">
            <h2 className="text-h leading-4">18</h2>
            <p className="text-sm">Produk Baru</p>
          </div>
          <div className="flex flex-col items-center justify-center bg-white border-white border-light 
							rounded-xl h-[90px]">
            <h2 className="text-h leading-4">18</h2>
            <p className="text-sm">Stok Rendah</p>
          </div>
          <div className="flex flex-col items-center justify-center bg-white border-white border-light 
							rounded-xl h-[90px]">
            <h2 className="text-h leading-4">18</h2>
            <p className="text-sm">Produk Promo</p>
          </div>
        </div>
      </header>

      <main className="w-full mt-4 border-light rounded-xl">
        <div className="rounded-t-xl bg-white items-center h-[46px] p-4">
          <p className="text-sm">18 Produk</p>
        </div>
        <table className="w-full p-4 rounded-b-xl">
          <thead>
            <tr className="bg-(--input-bg) h-[46px] text-sm text-left h-5">
              <td className="pl-4">Produk</td>
              <td className="w">Kategori</td>
              <td className="w">Harga</td>
              <td className="">Stok</td>
              <td>Rating</td>
              <td>Status</td>
              <td>Aksi</td>
            </tr>
          </thead>
          <tbody className="bg-white text-sm">
            {products?.map((item, index) => (
              <tr
                key={index}
                className="h-16.5 border-b-light">
                <td className="flex pl-4 gap-2 items-center h-[66px] w-[290px]">
                  <img
                    className="w-[40px] h-[40px] rounded-lg"
                    src={`${import.meta.env.VITE_API_URL}/${item.image}`} alt="" />
                  <div className="flex flex-col justify-center ">
                    <p className="text-h">{item.title}</p>
                    <p className="text-xs">{item?.brand}</p>
                  </div>
                </td>
                <td className="w-[150px]">
                  <div className="px-2 py-[2.5px] bg-(--accent-bg) w-fit rounded-full text-(--text-high) text-xs">{item?.cat?.name}</div>
                </td>
                <td className="w-[150px]">
                  <ul>
                    <li><p className="text-(--text-high)">{moneyFormat(item.price)[0]}</p></li>
                    <li className="text-xs"><s>{moneyFormat(item?.discountPrice)[0]}</s></li>
                  </ul>
                </td>
                <td className="w-[95px]">
                  <p>{item.stocks}</p>
                </td>
                <td className="w-[145px] h-[66px] flex items-center gap-1 mb-auto">
                  <FontAwesomeIcon
                    key={index}
                    icon={solidStar}
                    className={'text-xs text-(--text-star)'}
                  />
                  <p>{parseFloat(item?.rating).toFixed(1)} <span>({item.reviews})</span></p>
                </td>
                <td className="w-[215px]">
                  <ul className="flex gap-2 items-center">
                    {item?.status?.map((item) => ((
                      <li className="rounded-full px-3 py-1 bg-(--accent-bg) text-(--text-high) text-xs">
                        {item}
                      </li>
                    )))}
                  </ul>
                </td>
                <td className="w-[120px]">
                  <ul className="flex gap-3 items-center">
                    <li className=" text-xs">
                      <button className="cursor-pointer">
                        <img src={Watch} alt="" />
                      </button>
                    </li>
                    <li className=" text-xs">
                      <button className="cursor-pointer">
                        <img src={Edit} alt="" />
                      </button>
                    </li>
                    <li className=" text-xs">
                      <button className="cursor-pointer">
                        <img src={Delete} alt="" />
                      </button>
                    </li>
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  )
}