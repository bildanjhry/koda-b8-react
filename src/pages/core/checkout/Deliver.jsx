
import useUser from "@/hooks/useUser"
import { useLocation, useNavigate } from "react-router"
import { useEffect, useState, useContext } from "react"
import { useForm } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { CheckoutContext } from "@/hooks/context/UserContext"

// assets
import Delivery from "@/assets/icons/delivery-blue.svg"
import ArrowRight from "@/assets/icons/bc-arrow-right-white.svg"

const schema = yup.object({
  deliveryMethod:yup.string().required("Silahkan pilih metode pengiriman")
})

export default function Deliver(){
  const [step, setStep] = useContext(CheckoutContext)
  const { user, address, bio } = useUser()
  const navigate = useNavigate()
  const [delivery, setDelivery] = useState()
  const userAddress = address.filter((item) => item.isMain)[0]
  const location = useLocation()

  const { register, formState:{ errors }, handleSubmit } = useForm({
    resolver:yupResolver(schema)
  })

  useEffect(() => {
    function getState(){
      if(location.state){
        console.log(location.state)
        setDelivery(location.state.deliveryMethod)
      }
    }
    getState()
  },[location])

  function onSubmit(data){
    setStep(2)
    navigate("/checkout/payment", {state:{ step:2, data:data }})
  }

  return(
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
                readOnly
                {...register("fullname")}
                placeholder="Masukan Nama Penerima"
                name="fullname"
                className="w-full h-11.5 bg-(--input-bg) rounded-xl pl-4 border-light"
                type="text" id="name" value={user.fullname} 
              />
            </div>
            <div className="flex flex-col gap-2 w-[49%]">
              <label htmlFor="phone">Nomor Telepon *</label>
              <input 
                {...register("phone")}
                name="phone"
                placeholder="Masukan Nomor Telpon Penerima"
                className="w-full h-11.5 bg-(--input-bg) rounded-xl pl-4 border-light"
                type="text" id="phone" value={bio.phone} 
              />
            </div>							
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="email">Email *</label>
            <input 
              readOnly
              {...register("email")}
              name="email"
              placeholder="Masukan Email Penerima"
              className="w-full h-11.5 bg-(--input-bg) rounded-xl pl-4 border-light"
              type="email" id="email" value={user.email} 
            />
          </div>	
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="address">Alamat Lengkap *</label>
            <input 
              {...register("fullAddress")}
              name="fulladdress"
              placeholder="Alamat kamu"
              readOnly
              className="w-full h-11.5 bg-(--input-bg) rounded-xl pl-4 border-light"
              type="text" id="address" value={userAddress.fulladdress} 
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-2 w-[49%]">
              <label htmlFor="city">Kota *</label>
              <input 
                readOnly
                {...register("city")}
                name="city"
                placeholder="Kota"
                className="w-full h-[46px] bg-(--input-bg) rounded-xl pl-4 border-light"
                type="text" id="city" value={userAddress.city} 
              />
            </div>
            <div className="flex flex-col gap-2 w-[49%]">
              <label htmlFor="province">Provinsi *</label>
              <input 
                {...register("province")}
                placeholder="Provinsi"
                readOnly
                name="province"
                className="w-full h-[46px] bg-(--input-bg) rounded-xl pl-4 border-light"
                type="text" id="province" value={userAddress.province} 
              />
            </div>							
          </div>
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-2 w-[49%]">
              <label htmlFor="post-code">Kode Pos *</label>
              <input 
                readOnly
                {...register("postCode")}
                name="postCode"
                placeholder="Kode Pos Penerima"
                className="w-full h-[46px] bg-(--input-bg) rounded-xl pl-4 border-light"
                type="number" id="post-code" value={userAddress.postCode} 
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
              />
            </div>							
          </div>		
          <div className="mt-4 w-full flex flex-col gap-3">
            <h3>Metode Pengiriman</h3>
            <div className="flex flex-col w-full mt-2">
              <ul className="flex flex-col gap-4">
                <li className="relative">
                  <input
                    {...register("deliveryMethod")}
                    defaultChecked={delivery == 'JNE Reguler,3-5 Hari Kerja'}
                    className="absolute top-7.5 left-4 peer/jne-reg" 
                    type="radio" id="jne-reg" name="deliveryMethod" value={["JNE Reguler", "3-5 Hari Kerja"]} />
                  <label
                    className="w-full items-center rounded-xl border-2 h-[72px] 
										cursor-pointer peer-checked/jne-reg:border-(--main-border) border-(--border) flex justify-between pl-12 pr-6" 
                    htmlFor="jne-reg">
                    <div className="flex flex-col justify-center">
                      <p className="text-h font-semibold">JNE Reguler</p>
                      <p className="text-xs">3-5 Hari Kerja</p>
                    </div>
                    <p className="text-(--text-success)">GRATIS</p>
                  </label>
                </li>

                <li className="relative">
                  <input
                    {...register("deliveryMethod")}
                    defaultChecked={delivery === 'JNE Express,1-2 Hari Kerja'}
                    className="absolute top-7.5 left-4 peer/jne-exp" 
                    type="radio" id="jne-exp" name="deliveryMethod" value={["JNE Express", "1-2 Hari Kerja"]} />
                  <label
                    className="w-full items-center rounded-xl border-2 h-[72px] 
										cursor-pointer peer-checked/jne-exp:border-(--main-border) border-(--border) flex justify-between pl-12 pr-6" 
                    htmlFor="jne-exp">
                    <div className="flex flex-col justify-center">
                      <p className="text-h font-semibold">JNE Express</p>
                      <p className="text-xs">1-2 Hari Kerja</p>
                    </div>
                    <p className="text-(--text-success)">GRATIS</p>
                  </label>
                </li>

                <li className="relative">
                  <input
                    {...register("deliveryMethod")}
                    defaultChecked={delivery === "Same Day,Hari ini (sebelum 16:00)"}
                    className="absolute top-7.5 left-4 peer/same-day" 
                    type="radio" id="same-day" name="deliveryMethod" value={["Same Day", "Hari ini (sebelum 16:00)"]} />
                  <label
                    className="w-full items-center rounded-xl border-2 h-[72px] 
										cursor-pointer peer-checked/same-day:border-(--main-border) border-(--border) flex justify-between pl-12 pr-6" 
                    htmlFor="same-day">
                    <div className="flex flex-col justify-center">
                      <p className="text-h font-semibold">Same Day</p>
                      <p className="text-xs">Hari ini (sebelum 16:00)</p>
                    </div>
                    <p className="text-(--text-success)">GRATIS</p>
                  </label>
                </li>

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