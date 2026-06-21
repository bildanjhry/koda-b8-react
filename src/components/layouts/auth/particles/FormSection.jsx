import { Link } from "react-router"
import { useEffect, useRef, useState } from "react"
import { useForm  } from "react-hook-form"
import useUser from "@/hooks/useUser"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { useLocation, useNavigate } from "react-router"

// component
import AuthButton from "@/components/ui/AuthButton.jsx"
import SubmitButton from "@/components/ui/SubmitButton.jsx"
import Alert from "@/components/ui/Alert"

// asset
import Email from "@/assets/icons/email-mute.svg"
import Person from "@/assets/icons/person-mute.svg"
import Password from "@/assets/icons/password-mute.svg"
import Inside from "@/assets/icons/inside-white.svg"
import Back from "@/assets/icons/arrow-left-mute.svg"
import ShowPass from "@/assets/icons/watch-mute.svg"
import HidePass from "@/assets/icons/watch-hide-mute.png"

export default function FormSection({type}){

  function chooseForm(){
    switch(type){
    case "login":
      return FormLogin()
    case "register" :
      return FormRegister()
    case "forgot-pass" :
      return FormForgotPass()
    default :
      return FormLogin()	
    }
  }

  return(
    <>
      { chooseForm() }
    </>
  )
}

function FormLogin(){
  const location = useLocation()
  const { setterUser, accounts } = useUser()
  const navigate = useNavigate()
  const [errorLogin, setErrorLogin] = useState({
    error:false,
    message:""
  })
  
  const schema = yup.object({
    email:yup.string().required("Silahkan masukan email anda"),
    password:yup.string().required("Masukan Password anda")
      .min(8, "Minimal password 8 Karakter"),
  })
  
  const { register, handleSubmit, setValues, watch, formState: {errors} } = useForm({
    resolver:yupResolver(schema),
    defaultValues: {
      email:"",
      password:""
    }
  })

  useEffect(() => {
  },[watch])

  // set manually email after success register
  useEffect(() => {
    if(location.pathname === "/login" && location.state){
      setValues({email:location.state.email})
    }
  },[setValues, location])

  function onSubmit(data){
    try{
      // filtering if data matches
      const user = accounts.filter((item) => {
      	return item.email === data.email && atob(item.password) === data.password
      })[0]
      if(!user.id) throw new Error("Akun tidak ditemukan")
      setterUser(user)
      
      navigate("/", {}) // navigate to landing
    } catch(err){
      // error handling
      setErrorLogin({
        error:true,
        message:err.message
      })
    }
  }

  return (
    <form
      className="w-[53%] flex flex-col gap-3"
      onSubmit={handleSubmit(onSubmit)} 
      onFocus={() => { 
        if(errorLogin.error){
          setErrorLogin({
            error:false,
            message:"",
          })
        }
      }} >
      <h1 className="text-h ">Masuk ke Akun</h1>
      <p className="relative bottom-4 text-sm ">Belum punya akun?
        <Link to={"/register"} className="text-[blue]"> Daftar gratis</Link>
      </p>

      {errorLogin.error &&
      <Alert variant={"error"}>
        <p>{errorLogin.message}</p>
      </Alert>
      }
      
      <div className="flex justify-between">
        <AuthButton buttonText={"Google"} />
        <AuthButton buttonText={"Faceboook"} />
      </div>
      <div className="flex items-center gap-4 my-4">
        <div className="h-px flex-1 bg-gray-300"></div>
        <span className="text-gray-500 text-sm">
            atau masuk dengan email
        </span>
        <div className="h-px flex-1 bg-gray-300"></div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-h text-sm font-(--font-medium)">Email</label>
          <div className="relative">
            <img className="absolute p-4" src={Email} alt="" />
            <input 
              {...register("email")}
              className="w-full h-11.5 text-sm pl-12 border-light input-bg rounded-xl"
              placeholder="email@contoh.com"
              type="email" name="email" id="email" />
          </div>
          {errors?.email && <p className="text-xs text-red-500">{errors.email?.message}</p>}
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex justify-between">
            <label htmlFor="password" className="text-h text-sm font-(--font-medium)">Kata sandi</label>
            <Link className="text-xs text-[blue]" to={"/forgot-pass"}>Lupa kata sandi?</Link>
          </div>
          <div className="relative">
            <img className="absolute p-4" src={Password} alt="" />
            <input 
              {...register("password")}
              className="w-full h-[46px] text-sm px-12 border-light input-bg rounded-xl"
              placeholder="Masukan kata sandi"
              type="password" name="password" id="password" />
          </div>
          {errors?.password && <p className="text-xs text-red-500">{errors.password?.message}</p>}
        </div>
        <div className="flex items-center gap-2">
          <input type="checkbox" name="remember-me" id="remember-me" value={"remember-me"}/>
          <label htmlFor="remember-me" className="cursor-pointer text-sm">Ingatkan saya dalam 30 hari</label>
        </div>
        <SubmitButton img={Inside} buttonText={"Masuk"}>
        </SubmitButton>
        <div className="w-full flex flex-col justify-center items-center gap-7 mt-3">
          <p className="text-center text-xs">🔒 Login aman dengan enkripsi SSL 256-bit</p>
          <p className="text-center text-xs flex w-full">Dengan masuk, kamu menyetujui Syarat & Ketentuan dan Kebijakan Privasi kami.</p>            
        </div>
      </div>
    </form>		
  )
}

function FormRegister(){
  const [hidePass, setHidePass] = useState(true)
  const [hidePassCon, setHidePassCon] = useState(true)
  const [registerEvent, setRegisterEvent] = useState({
    event:false,
    status:"",
    message:""
  })
  const passwordConRef = useRef()
  const passwordRef = useRef()
  const navigate = useNavigate()
  const { accounts, setterAccounts } = useUser()

  function handleIdUser(name){
    return `${Math.round(Math.random() * 100)}${name.slice(0, 3)}${Date.now().toString(32)}`
  }

  const schema = yup.object({
    fullname: yup.string().required("Silahkan masukan nama anda").min(3),
    email:yup.string().required("Silahkan masukan email anda"),
    password:yup.string().required("Buat Password anda")
      .min(8, "Minimal password 8 Karakter"),
    confirmPassword:yup.string().required("Konfirmasi password anda")
      .min(8, "Minimal password 8 Karakter"),
  })


  const { register, formState: { errors }, watch, handleSubmit,
    setError, clearErrors} = useForm({
    resolver:yupResolver(schema),
    defaultValues: {
      id:"",
      cart:[],
      address:[],
      fullname:"",
      email:"",
      password:"",
      bio:{
        fullname:this?.fullname,
        email:this?.email,
        phone:"",
        age:"",
        dateBirth:"",
        address:[],
        picture:""
      },
      wishlist:[],
      checkout:[{
        checkoutId:"",
        paymentMetod:"",
        paymentStatus:"",
        orderStatus:"",
        product:[],
        promo:""
      }]
    }
  })

  // watching password syncs
  const confirmPass = watch("confirmPassword")
  const password = watch("password")
  useEffect(() => {
    if(confirmPass !== password){
      setError("confirmPassword", 
        { type:"custom", message:"Password tidak sesuai"})
    } else { clearErrors("confirmPassword") }
  },[watch, setError, clearErrors, password, confirmPass])


  function onSubmit(data){
    if(confirmPass !== password){
      setError("confirmPassword", 
        { type:"custom", message:"Password tidak sesuai"})
    } else clearErrors("confirmPassword")
    
    try{
      let userDatas = {}
      for(const props in data){
        if(props !== "confirmPassword") userDatas[props] = data[props]
      }
      
      // manually create user's id
      userDatas.id = handleIdUser(data.fullname)
      userDatas.bio.fullname = data.fullname
      userDatas.bio.email = data.email
      userDatas.password = btoa(data.password)

      setterAccounts(userDatas) // updating hooks

      // validation email
      if(accounts.find((item) => item.email === userDatas.email)){
        throw new Error("Email sudah digunakan")
      }

      setRegisterEvent({
        event:true,
        status:"success",
        message:"Sukses Membuat Akun"
      })

      window.setTimeout(() => {
        navigate("/login", { state: { email: data.email}})
      },2000)
    } catch(err){
      // error handling
      setRegisterEvent({
        event:true,
        status:"error",
        message:err.message
      })
    } 
  }

  // function handleWatchPass(name){
  //   if(name === "password"){
  //     setHidePass(!hidePass)
  //     if(passwordRef.current.type === "password") passwordRef.current.type = "text"
  //     else passwordRef.current.type = "password"
  //   } else if(name === "confirmPassword") {
  //     setHidePassCon(!hidePassCon)
  //     if(passwordConRef.current.type === "password") passwordConRef.current.type = "text"
  //     else passwordConRef.current.type = "password"
  //   }
  // }

  return (
    <form
      className="w-[53%] flex flex-col gap-2"
      onSubmit={handleSubmit(onSubmit)} 
      onFocus={() => {
        if(registerEvent.event){
          setRegisterEvent({
            event:false,
            status:"",
            message:""
          })
        }
      }}
      action="POST">
      <h1 className="text-h">Buat Akun Baru</h1>
      <p className="relative bottom-4 text-sm">Sudah punya akun?
        <Link to={"/login"} className="text-[blue]"> Masuk disini</Link>
      </p>
      { registerEvent.event && 
        <Alert variant={registerEvent.status}>
          <p>{registerEvent.message}</p>
        </Alert>
      }
      <div className="flex justify-between">
        <AuthButton buttonText={"Daftar via Google"} />
        <AuthButton buttonText={"Daftar via Facebook"} />
      </div>
      <div className="flex items-center gap-4 my-5">
        <div className="h-px flex-1 bg-gray-300"></div>
        <span className="text-gray-500">
            atau daftar dengan email
        </span>
        <div className="h-px flex-1 bg-gray-300"></div>
      </div>
      <div className="flex flex-col gap-3 text-sm">
        <div className="flex flex-col gap-1">
          <label htmlFor="fullname" className="text-h font-(--font-medium)">Nama Lengkap</label>
          <div className="relative">
            <img className="absolute p-4" src={Person} alt="" />
            <input
              {...register("fullname")}
              className="w-full h-11.5 text-sm pl-12 border-light input-bg rounded-xl"
              placeholder="Nama lengkap kamu"
              type="text" name="fullname" id="fullname" />
          </div>
          {errors?.fullname && <p className="text-xs text-red-500">{errors.fullname?.message}</p>}
        </div>				
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-h font-(--font-medium)">Email</label>
          <div className="relative">
            <img className="absolute p-4" src={Email} alt="" />
            <input 
              {...register("email")}
              className="w-full h-[46px] text-sm pl-12 border-light input-bg rounded-xl"
              placeholder="email@contoh.com"
              type="email" name="email" id="email" />
          </div>
          {errors?.email && <p className="text-xs text-red-500">{errors.email?.message}</p>}
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex justify-between">
            <label htmlFor="password" className="text-h font-(--font-medium)">Kata sandi</label>
          </div>
          <div className="relative">
            <img className="absolute p-4" src={Password} alt="password lock" />
            <button 
              type="button"
              // onClick={() =>{handleWatchPass("password")}}
              className="absolute right-0 p-4 cursor-pointer box">
              <img
							 className="w-[16px] h-[16px]"
							 src={hidePass ? ShowPass : HidePass} alt="show password" id="show-pass"/>
            </button>						
            <input 
              {...register("password")}
              className="w-full h-[46px] text-sm px-12 border-light input-bg rounded-xl"
              placeholder="Minimal 8 karakter"
              type={`${hidePass ? 'password' : 'text'}`} name="password" id="password" />
          </div>
          {errors?.password && <p className="text-xs text-red-500">{errors.password?.message}</p>}
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex justify-between">
            <label htmlFor="confirmPassword" className="text-h font-(--font-medium)">Konfirmasi kata sandi</label>
          </div>
          <div className="relative">
            <img className="absolute p-4" src={Password} alt="password lock" />
            <button 
              type="button"
              // onClick={() => {handleWatchPass("confirmPassword")}}
              className="absolute right-0 p-4 cursor-pointer">
              <img 
                className="w-4 h-4"
                src={hidePassCon ? ShowPass : HidePass} alt="show password" id="show-pass"/>
            </button>
            <input
              {...register("confirmPassword")} 
              className="w-full h-[46px] text-sm px-12 border-light input-bg rounded-xl"
              placeholder="Minimal 8 karakter"
              type={`${hidePassCon ? 'password' : 'text'}`} name="confirmPassword" id="confrimPassword" />
          </div>
          {errors?.confirmPassword && <p className="text-xs text-red-500">{errors.confirmPassword.message}</p>}
        </div>				
        <div className="flex items-start gap-2 mt-2">
          <input 
            className="relative top-1"
            required type="checkbox" name="remember-me" id="remember-me" value={"remember-me"}/>
          <label htmlFor="remember-me" className="cursor-pointer text-xs relative">
            Saya menyetujui Syarat & Ketentuan dan Kebijakan Privasi BeliMudah
          </label>
        </div>
        <SubmitButton 
          img={Inside} 
          buttonText={"Daftar Sekarang"} 
          order={"right-to-left"}
        />
        <div className="w-full flex flex-col justify-center items-center mt-2">
          <p className="text-center text-xs">🔒 Data kamu aman terenkripsi</p>
        </div>
      </div>
    </form>		
  )
}

function FormForgotPass(){

  function handleSubmit(e){
    e.preventDefault()
    try{
      const data = new FormData(e.target)

    } catch({message}){
      // handling if error happend
      console.log(message)
    }
  }

  return (
    <form
      className="w-[53%] flex flex-col gap-3"
      onSubmit={(e) => {handleSubmit(e)}} 
      action="">
      <Link to={"/login"} className="flex items-center gap-2"> 
        <img src={Back} alt="" />
        <p className="text-[14px]">Kembali ke login</p>
      </Link>
      <h1>Lupa Kata sandi?</h1>
      <p className="">
				Tidak perlu khawatir. Masukkan email yang terdaftar dan
				kami akan mengirimkan tautan untuk membuat kata sandi
				baru.
      </p>
      <div className="flex flex-col gap-3 mt-3">
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-h font-(--font-medium)">Alamat Email</label>
          <div className="relative">
            <img className="absolute p-4" src={Email} alt="" />
            <input 
              className="w-full h-[46px] text-sm pl-12 border-light input-bg rounded-xl"
              placeholder="email@contoh.com"
              type="email" name="email" id="email" />
          </div>
        </div>
        <SubmitButton img={Inside} buttonText={"Kirim Tautan Reset"} />
        <div className="w-full flex flex-col justify-center items-center gap-6">
          <p className="text-center text-sm">🔒 Login aman dengan enkripsi SSL 256-bit</p>
          <p className="text-center text-sm flex w-[85%]">Dengan masuk, kamu menyetujui Syarat & Ketentuan dan Kebijakan Privasi kami.</p>            
        </div>
      </div>
    </form>		
  )
}