import { Link } from "react-router"
import { useState } from "react"

// component
import AuthButton from "@/components/ui/AuthButton.jsx"
import SubmitButton from "@/components/ui/SubmitButton.jsx"

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
  function handleSubmit(e){
    e.preventDefault()

    try{
      const userAccounts = JSON.parse(window.localStorage.getItem("accounts"))
      const data = new FormData(e.target)

      // filtering if data matches
      const user = userAccounts.filter((item) => {
      	return item.email === data.get("email") && atob(item.password) === data.get("password")
      })
      if(!user) throw new Error("Akun tidak ditemukan")
      window.localStorage.setItem("user", JSON.stringify(user[0]))
      window.location.href = "/"
    } catch(err){
      // handling if error happend
      console.log(err.message)
    }
  }

  return (
    <form
      className="w-[53%] flex flex-col gap-3"
      onSubmit={(e) => {handleSubmit(e)}} 
      action="">
      <h1>Masuk ke Akun</h1>
      <p className="relative bottom-5 text-sm">Belum punya akun?
        <Link to={"/register"} className="text-[blue]"> Daftar gratis</Link>
      </p>
      <div className="flex justify-between">
        <AuthButton buttonText={"Google"} />
        <AuthButton buttonText={"Faceboook"} />
      </div>
      <div className="flex items-center gap-4 my-4">
        <div className="h-px flex-1 bg-gray-300"></div>
        <span className="text-gray-500">
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
              className="w-full h-[46px] text-sm pl-12 border-light input-bg rounded-xl"
              placeholder="email@contoh.com"
              type="email" name="email" id="email" />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex justify-between">
            <label htmlFor="password" className="text-h text-sm font-(--font-medium)">Kata sandi</label>
            <Link className="text-xs text-[blue]" to={"/forgot-pass"}>Lupa kata sandi?</Link>
          </div>
          <div className="relative">
            <img className="absolute p-4" src={Password} alt="" />
            <input 
              className="w-full h-[46px] text-sm px-12 border-light input-bg rounded-xl"
              placeholder="Masukan kata sandi"
              type="password" name="password" id="password" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <input type="checkbox" name="remember-me" id="remember-me" value={"remember-me"}/>
          <label htmlFor="remember-me" className="cursor-pointer text-sm">Ingatkan saya dalam 30 hari</label>
        </div>
        <SubmitButton img={Inside} buttonText={"Masuk"}/>
        <div className="w-full flex flex-col justify-center items-center gap-7 mt-3">
          <p className="text-center text-xs">🔒 Login aman dengan enkripsi SSL 256-bit</p>
          <p className="text-center text-xs flex w-[100%]">Dengan masuk, kamu menyetujui Syarat & Ketentuan dan Kebijakan Privasi kami.</p>            
        </div>
      </div>
    </form>		
  )
}

function FormRegister(){
  const [hidePass, setHidePass] = useState(true)
  const [hidePassCon, setHidePassCon] = useState(true)

  function handleSubmit(e){
    e.preventDefault()

    try{
      let userDatas = []
      let formData = {
        id:"",
        cart:[],
        address:[],
        bio:{
          fullname:"",
          email:"",
          phone:"",
          age:"",
          dateBirth:"",
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
      const data = new FormData(e.target)
      const formatObjData = Object.fromEntries(data.entries())
      if(data.get("password") !== data.get("confirm-password")) {
        throw new Error("Pastikan Pasword sama")
      }
      if(data.get("password").length <= 6 || data.get("confirm-password").length <= 6) {
        throw new Error("Minimum password adalah 6 Karakter")
      }

      const account = JSON.parse(window.localStorage.getItem("accounts"))
      if(account) userDatas = [...account] // append existing accounts

      for(const props in formatObjData){
        if(!(props === "confirm-password" || props === "remember-me")){
          formData[props] = formatObjData[props]
        }
      }
      // manually create user's id
      const idUser = ((account? account.length+1 : 1)+data.get("fullname").slice(0,2).toLowerCase())
      formData["id"] = idUser
      formData["password"] = btoa(formData["password"]) // encode user's password
      formData.bio.fullname = formData["fullname"]
      formData.bio.email = formData["email"]
      userDatas.push(formData)

      window.localStorage.setItem("accounts", JSON.stringify(userDatas))
      window.location.href = "/login"
    } catch(err){
      // handling if error happend
      alert(err.message)
    } 
  }

  function handleWatchPass(e){
    const type = document.getElementById(e).getAttribute("type")
    if(e === "password"){
      if(type === "password") setHidePass(false)
      else setHidePass(true)
    } else {
      if(type === "password") setHidePassCon(false)
      else setHidePassCon(true)
    }
  }

  return (
    <form
      className="w-[53%] flex flex-col gap-2"
      onSubmit={(e) => {handleSubmit(e)}} 
      action="">
      <h1>Buat Akun Baru</h1>
      <p className="relative bottom-5 text-sm">Sudah punya akun?
        <Link to={"/login"} className="text-[blue]"> Masuk disini</Link>
      </p>
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
              required 
              className="w-full h-[46px] text-sm pl-12 border-light input-bg rounded-xl"
              placeholder="Nama lengkap kamu"
              type="text" name="fullname" id="fullname" />
          </div>
        </div>				
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-h font-(--font-medium)">Email</label>
          <div className="relative">
            <img className="absolute p-4" src={Email} alt="" />
            <input 
              required
              className="w-full h-[46px] text-sm pl-12 border-light input-bg rounded-xl"
              placeholder="email@contoh.com"
              type="email" name="email" id="email" />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex justify-between">
            <label htmlFor="password" className="text-h font-(--font-medium)">Kata sandi</label>
          </div>
          <div className="relative">
            <img className="absolute p-4" src={Password} alt="password lock" />
            <button 
              type="button"
              onClick={() =>{handleWatchPass("password")}}
              className="absolute right-0 p-4 cursor-pointer box">
              <img
							 className="w-[16px] h-[16px]"
							 src={hidePass ? ShowPass : HidePass} alt="show password" id="show-pass"/>
            </button>						
            <input 
              className="w-full h-[46px] text-sm px-12 border-light input-bg rounded-xl"
              placeholder="Minimal 6 karakter"
              required
              type={`${hidePass ? 'password' : 'text'}`} name="password" id="password" />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex justify-between">
            <label htmlFor="confirm-password" className="text-h font-(--font-medium)">Konfirmasi kata sandi</label>
          </div>
          <div className="relative">
            <img className="absolute p-4" src={Password} alt="password lock" />
            <button 
              type="button"
              onClick={() =>{handleWatchPass("confirm-password")}}
              className="absolute right-0 p-4 cursor-pointer">
              <img 
                className="w-[16px] h-[16px]"
                src={hidePassCon ? ShowPass : HidePass} alt="show password" id="show-pass"/>
            </button>
            <input
              required 
              className="w-full h-[46px] text-sm px-12 border-light input-bg rounded-xl"
              placeholder="Minimal 6 karakter"
              type={`${hidePassCon ? 'password' : 'text'}`} name="confirm-password" id="confirm-password" />
          </div>
        </div>				
        <div className="flex items-start gap-2 mt-2">
          <input 
            className="relative top-1"
            required type="checkbox" name="remember-me" id="remember-me" value={"remember-me"}/>
          <label htmlFor="remember-me" className="cursor-pointer text-xs relative">Saya menyetujui Syarat & Ketentuan dan Kebijakan Privasi
					 BeliMudah</label>
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