import moneyFormat from "@/utils/money-format.js"
import * as yup from "yup"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { IoClose } from "react-icons/io5";
import { useSearchParams } from "react-router";

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
  image: yup.mixed().required("Mohon masukan gambar"),
  title: yup.string().required("Mohon masukan nama produk"),
  price: yup.string().required("Mohon masukan nama produk"),
  description: yup.string().required("Mohon masukan nama produk"),
})

export default function Products() {
  const [products, setProducts] = useState([])
  const [addProduct, setAddproduct] = useState(false)
  const [imageProd, setImageProd] = useState("")
  const [prodVariant, setProdVariant] = useState()
  const [prodSize, setProdSize] = useState()
  const [prodCat, setProdCat] = useState()
  const [imageFile, setImageFile] = useState("")
  const [colors, setColors] = useState([])
  const [categories, setCategories] = useState([])
  const [sizes, setSizes] = useState([])
  const [searchParams, setSearchParams] = useSearchParams()
  const [totalProd, setTotalProd] = useState(0)
  const [searchProd, setSearchProd] = useState("")
  const session = useSelector(state => state.session.session)

  const { register, getValues, formState: { errors }, handleSubmit, reset } = useForm({
    resolver: yupResolver(schema),
  })
  const search = searchParams.get("search") || ""

  useEffect(() => {

    const timer = setTimeout(() => {
      if (search.length > 3) {
        setSearchProd(search)
      } else if(search.length == 0){
        setSearchProd(search)
      }
    }, 500)

    return () => clearTimeout(timer)
  }, [search])

  function handleOnChange(e) {
    setSearchParams({
      search: e.target.value
    })
  }

  useEffect(() => {
    async function getDataProducts(count = 3) {
      try {
        const API = import.meta.env.VITE_API_URL
        const params = new URLSearchParams({
          page: 1,
          limit: 30,
          search: searchProd
        })
        const response = await fetch(`${API}/products?${params}`)
        const data = await response.json()
        setProducts(data.data)
        setTotalProd(data.total)
      } catch (err) {
        if (count < 1) {
          console.error(err.message)
          return
        }
        return getDataProducts(count -= 1)
      }
    }

    async function getDataColors(count = 3) {
      try {
        const API = import.meta.env.VITE_API_URL
        const params = new URLSearchParams({
          page: 1,
          limit: 30
        })
        const response = await fetch(`${API}/colors?${params}`)
        const data = await response.json()
        setColors(data.results)
      } catch (err) {
        if (count < 1) {
          console.error(err.message)
          return
        }
        return getDataColors(count -= 1)
      }
    }

    async function getDataSizes(count = 3) {
      try {
        const API = import.meta.env.VITE_API_URL
        const params = new URLSearchParams({
          page: 1,
          limit: 30
        })
        const response = await fetch(`${API}/sizes`)
        const data = await response.json()
        setSizes(data.results)
      } catch (err) {
        if (count < 1) {
          console.error(err.message)
          return
        }
        return getDataSizes(count -= 1)
      }
    }

    async function getDataCategories(count = 3) {
      try {
        const API = import.meta.env.VITE_API_URL
        const response = await fetch(`${API}/categories`)
        const data = await response.json()
        setCategories(data.results)
      } catch (err) {
        if (count < 1) {
          console.error(err.message)
          return
        }
        return getDataCategories(count -= 1)
      }
    }

    getDataCategories()
    getDataSizes()
    getDataColors()
    getDataProducts()
  }, [searchProd])

  function handlePrev(data) {
    setImageFile(data.target.files[0])
    setImageProd(URL.createObjectURL(data.target.files[0]))
  }

  async function onSubmit(data) {
    try {
      const API = import.meta.env.VITE_API_URL
      const token = session.token

      const formData = new FormData()
      for (const key in data) {
        if (key === "image") {
          formData.append('file', imageFile)
        } else {
          formData.append(key, data[key])
        }
      }

      if (prodSize) {
        formData.append("id_size", prodSize)
      }
      if (prodVariant) {
        formData.append("id_color", prodVariant)
      }
      if (prodCat) {
        formData.append("id_category", prodCat)
      }

      const response = await fetch(`${API}/products`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`
        },
        body: formData
      })

      const dataRes = await response.json()
      if (!dataRes.success) {
        throw new Error(dataRes.message)
      }
      alert(dataRes.message)
      reset()
      setImageProd("")
    } catch (err) {
      console.error(err.message)
    }
  }


  function onError(errors) {
    console.log(errors)
  }

  return (
    <div className="px-6 mb-10">
      {addProduct &&
        <Modal>
          <div className="flex flex-col gap-5 h-130 w-210 p-4">
            <div className="flex justify-between items-center">
              <h3>Add new Product</h3>
              <button
                onClick={() => {
                  setAddproduct((prev) => !prev)
                }}
                className="w-10 h-10 cursor-pointer text-3xl text-red-500 content-cent"
                type="button">
                <IoClose />
              </button>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit, onError)}
              className="flex flex-col gap-3">
              <div className="flex justify-between w-full">
                <div className="flex flex-col gap-3 w-[65%]">
                  <div className="flex justify-between">
                    <div className="flex w-[40%] pt-7 flex-col gap-1">
                      <label htmlFor="image">
                        <div className="cursor-pointer overflow-hidden rounded-md w-40 h-40">
                          {imageProd ?
                            <img
                              src={imageProd}
                              className="h-full w-full object-cover border border-gray-300 rounded-md"
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
                        onChange={(data) => { handlePrev(data) }}
                        className="hidden"
                        type="file" id="image" name="image" />
                    </div>
                    <div className="flex w-[60%] flex-col gap-2">

                      <div className="flex flex-col gap-1">
                        <label htmlFor="alt" className="text-[15px]">Alt</label>
                        <input
                          {...register("alt")}
                          placeholder="Masukan Alt Produk"
                          className="border text-sm border-gray-300 rounded-md h-10 pl-4"
                          type="text" id="alt" name="alt" />
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="text-[15px]" htmlFor="title">Name</label>
                        <input
                          {...register("title")}
                          placeholder="Masukan Nama Produk"
                          className="border text-sm border-gray-300 rounded-md h-10 pl-4"
                          type="text" id="title" name="title" />
                      </div>

                      <div className="flex flex-row  justify-between w-full">
                        <div className="flex flex-col gap-1 w-[68%]">
                          <label className="text-[15px]" htmlFor="price">Harga</label>
                          <input
                            {...register("price")}
                            placeholder="300.000"
                            className="border border-gray-300 text-sm rounded-md h-10 pl-4"
                            type="text" id="price" name="price" />
                        </div>
                        <div className="flex flex-col gap-1 w-[30%]">
                          <label className="text-[15px]" htmlFor="stocks">Kuantitas</label>
                          <input
                            {...register("stocks")}
                            placeholder="1"
                            className="border border-gray-300 text-sm rounded-md h-10 pl-4"
                            type="text" id="stocks" name="stocks" />
                        </div>
                      </div>

                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label htmlFor="description">Deskripsi</label>
                    <textarea
                      {...register("description")}
                      rows={6}
                      className="border border-gray-300 text-sm rounded-md p-3"
                      type="text" id="description" name="description" />
                  </div>
                </div>

                <div className="flex flex-col gap-7 pl-8 w-[35%] h-100 overflow-y-scroll">
                  <div className="flex flex-col gap-3">
                    <p>Warna</p>
                    <div className="flex flex-row gap-3 flex-wrap w-full text-sm items-center">
                      {colors.map((item, index) => (
                        <div className="relative" key={item.id}>
                          <input
                            className="absolute hidden top-4 left-3 peer"
                            type="radio" name={`color`}
                            onChange={(e) => {
                              setProdVariant(e.target.value)
                            }}
                            id={`${item.name.toLowerCase()}`}
                            value={item.id}
                          />
                          <label
                            className="border-(--border) border rounded-lg cursor-pointer 
                          h-[2.2rem] flex justify-center peer-checked:border-(--text-high)
                          peer-checked:text-(--text-high) items-center px-3"
                            htmlFor={`${item.name.toLowerCase()}`}>{item.name}</label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <p>Ukuran</p>
                    <div className="flex flex-row gap-3 flex-wrap w-full text-sm items-center">
                      {sizes.map((item, index) => (
                        <div className="relative" key={item.id}>
                          <input
                            className="absolute hidden top-4 left-3 peer"
                            type="radio" name={`sizes`}
                            onChange={(e) => {
                              setProdSize(e.target.value)
                            }}
                            id={`${item.name.toLowerCase()}`}
                            value={item.id}
                          />
                          <label
                            className="border-(--border) border rounded-lg cursor-pointer 
                          h-[2.2rem] flex justify-center peer-checked:border-(--text-high)
                          peer-checked:text-(--text-high) items-center px-3"
                            htmlFor={`${item.name.toLowerCase()}`}>{item.name}</label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <p>Kategori</p>
                    <div className="flex flex-row gap-3 flex-wrap w-full text-sm items-center">
                      {categories.map((item, index) => (
                        <div className="relative" key={item.id}>
                          <input
                            className="absolute hidden top-4 left-3 peer"
                            type="radio" name={`categories`}
                            onChange={(e) => {
                              setProdCat(e.target.value)
                            }}
                            id={`${item.name.toLowerCase()}`}
                            value={item.id}
                          />
                          <label
                            className="border-(--border) border rounded-lg cursor-pointer 
                          h-[2.2rem] flex justify-center peer-checked:border-(--text-high)
                          peer-checked:text-(--text-high) items-center px-3"
                            htmlFor={`${item.name.toLowerCase()}`}>{item.name}</label>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
              <button
                type="submit"
                className="bg-(--main-bg) text-white 
              rounded-md w-full h-10 border-none content-cent cursor-pointer">
                Tambah
              </button>
            </form>
          </div>
        </Modal>}
      <header className="flex flex-col gap-5 mt-6">
        <div className="flex justify-between h-10 items-center">
          <div className="flex flex-col justify-center gap-0">
            <p className="text-h text-2xl font-medium">Manajemen Produk</p>
          </div>
          <button
            onClick={() => {
              setAddproduct(true)
            }}
            className="w-39.75 cursor-pointer h-full bg-(--action-bg) flex justify-center items-center
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
                defaultValue={search}
                onChange={handleOnChange}
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
            <h2 className="text-h leading-4">{totalProd}</h2>
            <p className="text-sm">Total Produk</p>
          </div>
          <div className="flex flex-col items-center justify-center bg-white border-white border-light 
							rounded-xl h-[90px]">
            <h2 className="text-h leading-4">0</h2>
            <p className="text-sm">Produk Baru</p>
          </div>
          <div className="flex flex-col items-center justify-center bg-white border-white border-light 
							rounded-xl h-[90px]">
            <h2 className="text-h leading-4">0</h2>
            <p className="text-sm">Stok Rendah</p>
          </div>
          <div className="flex flex-col items-center justify-center bg-white border-white border-light 
							rounded-xl h-[90px]">
            <h2 className="text-h leading-4">0</h2>
            <p className="text-sm">Produk Promo</p>
          </div>
        </div>
      </header>

      <main className="w-full mt-4 border-light rounded-xl">
        <div className="rounded-t-xl bg-white items-center h-[46px] p-4">
          <p className="text-sm">{totalProd} Produk</p>
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