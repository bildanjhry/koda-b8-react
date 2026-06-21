import { useForm } from "react-hook-form";
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup";

// asset
import Edit from "@/assets/icons/edit-mute.svg"
import Delete from "@/assets/icons/delete-mute.svg"
import { LuPlus } from "react-icons/lu";
import { IoLocationOutline } from "react-icons/io5";
import useUser from "@/hooks/useUser";
import { useState } from "react";

import Alert from "@/components/ui/Alert";
import { useLocation, useNavigate } from "react-router";

const schema = yup.object({
  fulladdress:yup.string().required("Alamat kamu masih kosong"),
  city:yup.string().required("Kota kamu masih kosong"),
  province:yup.string().required("Provinsi kamu masih kosong"),
  postCode:yup.string().required("Kode pos kamu masih kosong"),
})

export default function Address(){
  const {address: userAddress, bio, user, setterAddress } = useUser()
  const [addAddress, setAddAddress] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const [eventAdd, setEventAdd] = useState({
    status:"",
    message:""
  })

  const { register, formState: { errors }, handleSubmit, reset } = useForm({
    resolver:yupResolver(schema),
    defaultValues:{
      fulladdress:"",
      city:"",
      province:"",
      optional:"",
      isMain:true
    }
  })

  console.log(location)

  function onSubmit(data){
    try{
      setEventAdd({
        event:true,
        status:"success",
        message:"Berhasil Tambah Alamat"
      })
      setterAddress(data)
      reset()
      window.setTimeout(() => {
        setEventAdd(prev => {return {...prev, event:false}})
        if(location.state) navigate(location.state)
      },2000)
      setAddAddress(false)
    } catch(err){
      setEventAdd({
        event:true,
        status:"error",
        message:err.message
      })
    }
  }

  return(
    <div className="w-[95%] pt-1 h-full">
      <div className="flex justify-between items-start">
        <h3>Alamat Saya</h3>
        <button 
          onClick={() => setAddAddress(!addAddress)}
          className="w-40 rounded-xl text-light 
		      cursor-pointer text-sm h-9.5 main-bg flex items-center gap-1 pt-[1px] justify-center">
          { addAddress ?
            <p>Tampilkan Alamat</p> :
            <>
              <LuPlus/>
              <p>Tambah Alamat</p>
            </>
          }
        </button>
      </div>
      { !addAddress && 
      <>
        { userAddress.length > 0 ?
          <div className="flex flex-col mt-6 gap-6">
            { userAddress.map((item, index) => (
              <div 
                key={index}
                className="flex flex-col ">
                <div className=" w-full border-light bg-white rounded-2xl 
                py-5 px-5">
                  <header className="flex w-full justify-between items-center">
                    <div className="flex items-center gap-1">
                      <p className="text-h font-semibold">Rumah</p>
                      {item.isMain && <p className="text-h font-semibold">(Utama)</p>}
                      {item.isMain && <p className="py-1 px-2 rounded-full text-white text-sm font-semithin relative left-2 bg-(--main-bg)">Utama</p>}
                    </div>
                    <div className="flex gap-2">
                      <button className="cursor-pointer px-1">
                        <img src={Edit} alt="" />
                      </button>
                      <button className="cursor-pointer px-1">
                        <img src={Delete} alt="" />
                      </button>
                    </div>
                  </header>
                  <main className="pt-4 pb-1 flex flex-col gap-3">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 text-h">
                        <p>{user.fullname}</p>
                        <p>{bio.phone}</p>
                      </div>
                      <p>{item.fulladdress}</p>
                      <p>{item.city}, <span>{item.province}</span><span> {item.postCode}</span></p>
                    </div>
                  </main>
                </div>
              </div>
            ))}

          </div> :
          <div className="w-full rounded-2xl gap-2 justify-center border-light h-77 mt-6 flex flex-col items-center">
            <IoLocationOutline size={50}/>
            <h4 className="text-2xl font-semibold">Alamat kamu kosong</h4>
          </div>
        }
      </>
      }
      
      { addAddress &&
      <main className="mt-10 flex flex-col border-light bg-white px-6 py-10 rounded-xl">
        <form
          onSubmit={handleSubmit(onSubmit)} 
          className="flex flex-col gap-5 text-sm"
          action="">
          { eventAdd.event &&
          <Alert variant={eventAdd.status}>
            <p>{eventAdd.message}</p>
          </Alert>
          }
          							
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="fulladdress">Alamat Lengkap *</label>
            <textarea
              {...register("fulladdress")} 
              placeholder="Jalan Senopati, No. 16 Blok A..."
              className="w-full bg-(--input-bg) rounded-xl p-4 flex justify-start items-start border-light"
              name="fulladdress" rows={6} id="fulladdress"/>
            {errors?.fulladdress && <p className="text-xs text-red-500 mt-1">{errors.fulladdress?.message}</p>}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-2 w-[49%]">
              <label htmlFor="city">Kota *</label>
              <input 
                {...register("city")}
                placeholder="Kota"
                className="w-full h-[46px] bg-(--input-bg) rounded-xl pl-4 border-light"
                type="text" id="city"  
              />
              {errors?.city && <p className="text-xs text-red-500 mt-1">{errors.city?.message}</p>}
            </div>
            <div className="flex flex-col gap-2 w-[49%]">
              <label htmlFor="province">Provinsi *</label>
              <input
                {...register("province")} 
                placeholder="Provinsi"
                name="province"
                className="w-full h-[46px] bg-(--input-bg) rounded-xl pl-4 border-light"
                type="text" id="province"
              />
              {errors?.province && <p className="text-xs text-red-500 mt-1">{errors.province?.message}</p>}
            </div>							
          </div>

          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-2 w-[49%]">
              <label htmlFor="post-code">Kode Pos *</label>
              <input 
                {...register("postCode")}
                placeholder="Kode Pos Penerima"
                name="postCode"
                className="w-full h-[46px] bg-(--input-bg) rounded-xl pl-4 border-light"
                type="number" id="postCode" 
              />
              {errors?.postCode && <p className="text-xs text-red-500 mt-1">{errors.postCode?.message}</p>}
            </div>
            <div className="flex flex-col gap-2 w-[49%]">
              <label htmlFor="optional">Catatan (optional)</label>
              <input
                {...register("optional")} 
                placeholder="Warna Pagar, dll."
                className="w-full h-[46px] bg-(--input-bg) rounded-xl pl-4 border-light"
                type="text" id="optional"
              />
            </div>							
          </div>

          <div className="mt-4 w-full flex flex-col gap-3">
            <button 
              type="submit"
              className="flex gap-2 text-sm text-white bg-(--main-bg) rounded-xl h-13 items-center
                    justify-center w-full mt-4 cursor-pointer">
              <p>Simpan Alamat</p>
            </button>
          </div>																						
        </form>
      </main>
      }
    </div>
  )
}