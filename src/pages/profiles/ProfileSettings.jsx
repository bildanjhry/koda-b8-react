import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useLocation, useNavigate } from "react-router"

// hooks
import useUser from "@/hooks/useUser"

// assets
import Edit from "@/assets/icons/edit-blue.svg"
import { useEffect, useState } from "react"

// components
import Alert from "@/components/ui/Alert"

const schema = yup.object({
  fullName:yup.string().required("Nama lengkap kamu masih kosong"),
  email:yup.string().required("Email kamu masih kosong"),
  phone:yup.number().required("Nomor Telepon kamu masih kosong").positive("Ini bukan format yang benar"),
  date:yup.string().required("Tanggal lahir kamu masih kosong"),
  gender:yup.string().required("Kelamin kamu masih konsong")
})

export default function ProfileSettings(){
  const {initial, bio, setBio} = useUser("user")  
  const location = useLocation()
  const navigate = useNavigate()
  const [eventForm, setEventForm] = useState({
    event:false,
    status:"",
    message:""
  })
  const {getValues, clearErrors, setError, watch, register, formState:{ errors }} = useForm({
    resolver:yupResolver(yup)
  })

  const email = watch("email")
  const dateBirth = watch("date")
  const fullName = watch("fullName")
  const gender = watch("gender")
  const phone = watch("phone")

  useEffect(() => {
    const formData = {
      fullname :fullName,
      email:email,
      phone:phone,
      date:dateBirth,
      gender:gender
    }
    for(const props in formData){
      if(!(formData[props])) {
        setError(props, { type: "custom", message: "Pastikan input tidak kosong" })
      } else {
        clearErrors(props)
      }
    }
  },[fullName, email, phone, dateBirth, gender])

  function onSubmit(){
    const formated = new Date(getValues("date")).toLocaleDateString("id-ID", {
      day:"numeric",
      month:"long",
      year:"numeric"
    })

    const formData = {
      fullname :getValues("fullName"),
      email:getValues("email"),
      phone:getValues("phone"),
      date:formated,
      gender:getValues("gender")
    }
    for(const props in formData){
      if(!(formData[props])) {
        setError(props, { type: "custom", message: "Pastikan input tidak kosong" })
      }
    }
    setBio({
      ...formData,
      picture:"",
      age:0,
      dateBirth: formData.data
    })
    setEventForm({
      event:true,
      status:"SUCCESS",
      message:"Berhasil Simpan Profil",
    })

    setTimeout(() => {
      setEventForm({
        event:false,
        status:"",
        message:"",
      })
      if(location.state) navigate(location.state)
    },2000)
  }

  return(
    <div className="w-[95%] pt-1 h-full">
      <div className="flex justify-between items-center">
        <h3>Pengaturan Profil</h3>
        <button 
          onClick={() => {onSubmit()}}
          className="w-28 justify-center rounded-xl flex items-center gap-2 text-sm 
          h-9.5 text-(--text-high) border border-(--main-border)">
          <img src={Edit} alt="edit profiles" />
          <p>Simpan</p>
        </button>
      </div>
      <div className="mt-6 w-full border-light bg-white rounded-2xl 
        py-5 px-5">
        <form
          // onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-5 text-sm"
          action="">
          { eventForm.event &&
          <Alert variant={"success"}>
            <p>{eventForm.message}</p>
          </Alert>
          }
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 flex justify-center items-center rounded-full bg-(--accent-bg)">
              <h4 className="text-(--text-high) text-xl font-semibold">{initial}</h4>
            </div>
            <button className="text-(--text-high) cursor-pointer">Ganti Foto Profil</button>
          </div>
          <div className="flex flex-col gap-1 text-sm">
            <label htmlFor="name">Nama Lengkap</label>
            <input 
              {...register("fullName")}
              defaultValue={bio.fullname}
              placeholder="Nama Lengkap Anda"
              className="w-full h-[46px] text-sm pl-4 bg-(--input-bg) rounded-xl"
              type="text" id="name" />
            { errors.fullName && <p className="text-red-500 text-sm mt-2">*{errors.fullName?.message}</p>}
          </div>
          
          <div className="flex flex-col gap-1 text-sm">
            <label htmlFor="email">Email</label>
            <input 
              placeholder="Email Anda"
              {...register("email")}
              defaultValue={bio.email}
              className="w-full h-[46px] text-sm pl-4 bg-(--input-bg) rounded-xl"
              type="email" id="email" />
            { errors.email && <p className="text-red-500 text-sm mt-2">*{errors.email?.message}</p>}
          </div>
          <div className="flex flex-col gap-1 text-sm">
            <label htmlFor="phone">Nomor Telepon</label>
            <input 
              {...register("phone")}
              defaultValue={bio?.phone}
              placeholder="Nomor Telepon anda"
              className="w-full h-[46px] text-sm pl-4 bg-(--input-bg) rounded-xl"
              type="number" id="phone" />
            { errors.phone && <p className="text-red-500 text-sm ">*{errors.phone?.message}</p>}    
          </div>
          
          <div className="flex flex-col gap-1 text-sm">
            <label htmlFor="date">Tanggal Lahir</label>
            <input
              {...register("date")}
              defaultValue={bio?.dateBirth} 
              placeholder="dd/mm/yyy"
              name="date"
              className="w-full h-11.5 text-sm px-4 bg-(--input-bg) rounded-xl"
              type="date" id="date" name="date"/>
            { errors.birthDate && <p className="text-red-500 text-sm mt-2">*{errors.birthDate?.message}</p>}   
          </div>
          
          <div className="flex flex-col gap-1 text-sm">
            <label htmlFor="gender">Jenis Kelamin</label>
            <select
              {...register("gender")}
              defaultValue={bio.gender}
              placeholder=""
              className="w-full h-[46px] text-sm px-4 bg-(--input-bg) rounded-xl"
              type="date" id="date">
              <option value="male" name="gender" id="male" >Laki-laki</option>
              <option value="female" name="gender" id="female" >Perempuan</option>
            </select> 
            { errors.gender && <p className="text-red-500 text-sm mt-2">*{errors.gender?.message}</p>}                              
          </div>
        </form>
      </div>
        
      <div className="w-full h-fit mt-5 bg-white rounded-2xl border-light 
        items-start flex flex-col gap-3 px-6 py-5">
        <h4 className="text-(--text-h) mb-1 font-semibold">Keamanan Akun</h4>
        <button className="text-(--text-high) text-sm cursor-pointer">Ubah Kata Sandi</button>
        <button className="text-(--text-high) text-sm cursor-pointer">Aktifkan Verifikasi 2 langkah</button>
      </div>
    </div>
  )
}