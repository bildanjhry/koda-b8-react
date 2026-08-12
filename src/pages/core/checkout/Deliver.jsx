
import useUser from "@/hooks/useUser"
import { useLocation, useNavigate } from "react-router"
import { useEffect, useState, useContext } from "react"
import { useForm } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { CheckoutContext } from "@/hooks/context/UserContext"
import { UserContext } from "@/hooks/context/UserContext"


// assets
import Delivery from "@/assets/icons/delivery-blue.svg"
import ArrowRight from "@/assets/icons/bc-arrow-right-white.svg"
import { useSelector } from "react-redux"

const schema = yup.object({
  deliveryMethod: yup.string().required("Silahkan pilih metode pengiriman"),
  phone: yup.string().required("Masukan No Telepon tujuan"),
  fullname: yup.string().required("Masukan nama penerima")
})

export default function Deliver() {
  const [step, setStep] = useContext(CheckoutContext)
  const [cart, ] = useContext(UserContext)
  const { profiles, address, bio} = useUser()
  const navigate = useNavigate()
  const [delivery, setDelivery] = useState()
  const [deliveryMethods, setDeliveryMethods] = useState([])
  const userAddress = address[0]
  const location = useLocation()
  const session = useSelector(state => state.session.session)

  const { register, setValue, formState: { errors }, handleSubmit } = useForm({
    resolver: yupResolver(schema)
  })

  useEffect(() => {
    for (const key in userAddress) {
      setValue(key, userAddress[key])
    }
    for (const key in profiles) {
      setValue(key, profiles[key])
    }
  }, [profiles])

  useEffect(() => {
    function getState() {
      if (location.state) {
        setDelivery(location.state.deliveryMethod)
      }
    }
    getState()
  }, [location])

  useEffect(() => {
    async function getDeliveryMethods(count = 3) {
      try {
        const token = session.token
        const API = import.meta.env.VITE_API_URL
        const params = new URLSearchParams({
          page: 1,
          limit: 20
        })
        const response = await fetch(`${API}/delivery-methods?${params}`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        })
        const data = await response.json()
        if (!data.success) {
          throw new Error(data.message)
        }
        setDeliveryMethods(data.results)
      } catch (err) {
        if (count < 1) {
          console.error(err.message)
          return
        }
        return getDeliveryMethods(count -= 1)
      }
    }
    if (session.token) getDeliveryMethods()
  }, [])

  function onSubmit(data) {
    setStep(2)
    navigate("/checkout/payment", {
      state: {
        step: 2, data: {
          items: [{ ...location.state?.prod }], ...data,
          order_items: [
            { quantity: location.state?.prod.qty, id_product: location.state?.prod.id_var }
          ]
        }
      }
    })
  }

  return (
    <div>
      <header className="flex items-center gap-2">
        <img
          className="w-6 "
          src={Delivery} alt="" />
        <h3>Alamat Pengiriman</h3>
      </header>
      <main className="mt-10 flex flex-col">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-5 text-sm"
          action="">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-2 w-[49%]">
              <label htmlFor="name">Nama Penerima *</label>
              <input
                {...register("fullname")}
                placeholder="Masukan Nama Penerima"
                name="fullname"
                className="w-full h-11.5 bg-(--input-bg) rounded-xl pl-4 border-light"
                type="text" id="name" defaultValue={profiles?.fullname ?? ""}
              />
              {errors.fullname && <p className="relative top-2 text-red-500 text-sm">*{errors.fullname?.message}</p>}
            </div>
            <div className="flex flex-col gap-2 w-[49%] relative">
              <label htmlFor="phone">Nomor Telepon *</label>
              <input
                {...register("phone")}
                name="phone"
                placeholder="Masukan Nomor Telpon Penerima"
                className="w-full h-11.5 bg-(--input-bg) rounded-xl pl-4 border-light"
                type="text" id="phone" defaultValue={profiles?.phone ?? ""}
              />
              {errors.phone && <p className="absolute top-20 left-1 text-red-500 text-sm">*{errors.phone?.message}</p>}
            </div>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="email">Email *</label>
            <input
              {...register("email")}
              name="email"
              placeholder="Masukan Email Penerima"
              className="w-full h-11.5 bg-(--input-bg) rounded-xl pl-4 border-light"
              type="email" id="email" defaultValue={profiles?.email ?? ""}
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="address">Alamat Lengkap *</label>
            <input
              {...register("fulladdress")}
              name="fulladdress"
              placeholder="Alamat kamu"
              className="w-full h-11.5 bg-(--input-bg) rounded-xl pl-4 border-light"
              type="text" id="address" defaultValue={userAddress?.fulladdress ?? ""}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-2 w-[49%]">
              <label htmlFor="city">Kota *</label>
              <input
                {...register("city")}
                name="city"
                placeholder="Kota"
                className="w-full h-[46px] bg-(--input-bg) rounded-xl pl-4 border-light"
                type="text" id="city" defaultValue={userAddress?.city ?? ""}
              />
            </div>
            <div className="flex flex-col gap-2 w-[49%]">
              <label htmlFor="province">Provinsi *</label>
              <input
                {...register("province")}
                placeholder="Provinsi"
                name="province"
                className="w-full h-[46px] bg-(--input-bg) rounded-xl pl-4 border-light"
                type="text" id="province" defaultValue={userAddress?.province ?? ""}
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-2 w-[49%]">
              <label htmlFor="post-code">Kode Pos *</label>
              <input
                {...register("postcode")}
                name="postCode"
                placeholder="Kode Pos Penerima"
                className="w-full h-[46px] bg-(--input-bg) rounded-xl pl-4 border-light"
                type="number" id="post-code" defaultValue={userAddress?.postcode ?? ""}
              />
            </div>
            <div className="flex flex-col gap-2 w-[49%]">
              <label htmlFor="optional">Catatan (optional)</label>
              <input
                {...register("optional")}
                name="optional"
                placeholder="Warna Pagar, dll."
                className="w-full h-[46px] bg-(--input-bg) rounded-xl pl-4 border-light"
                type="text" id="optional"
                defaultValue={userAddress?.optional ?? ""}
              />
            </div>
          </div>
          <div className="mt-4 w-full flex flex-col gap-3">
            <h3>Metode Pengiriman</h3>
            <div className="flex flex-col w-full mt-2">
              <ul className="grid w-full gap-4 justify-between grid-cols-1">
                {deliveryMethods.map((item) => (
                  <li
                    key={item.id}
                   className="relative">
                    <input
                      {...register("deliveryMethod")}
                      className="absolute top-7.5 left-4 peer/jne-reg"
                      type="radio" id={item.id} name="deliveryMethod" value={`${item.id + ", " + item.name + " " + item.desc}`} />
                    <label
                      className="w-full items-center rounded-xl border-2 h-[72px] 
										cursor-pointer peer-checked/jne-reg:border-(--main-border) border-(--border) flex justify-between pl-12 pr-6"
                      htmlFor={item.id}>
                      <div className="flex flex-col justify-center">
                        <p className="text-h font-semibold">{item.name}</p>
                        <p className="text-xs">{item.desc}</p>
                      </div>
                      <p className="text-(--text-success)">GRATIS</p>
                    </label>
                  </li>
                ))}
              </ul>
              {errors.deliveryMethod && <p className="relative top-2 text-red-500 text-sm">*{errors.deliveryMethod?.message}</p>}
            </div>
            <button
              type="submit"
              className="flex gap-2 text-sm text-white bg-(--main-bg) rounded-xl h-13 items-center
							justify-center w-full mt-4 cursor-pointer">
              <p>Lanjut ke pembayaran</p>
              <img
                className="relative top-px"
                src={ArrowRight} alt="payment step" />
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}