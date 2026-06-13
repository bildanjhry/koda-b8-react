// component
import Logo from "@/components/ui/Logo.jsx"

// asset
import CheckMark from "@/assets/icons/check-mark-white.svg"
import LoginBg from "@/assets/bg/login-bg.png"
import RegisBg from "@/assets/bg/regis-bg.png"
import ForgotPassBg from "@/assets/bg/forgot-pass-bg.png"

export default function InfoSection({type}){

  function handleArticle(){
    switch(type){
    case "login" :
      return LoginArticle()
    case "register" :
      return RegisterArticle()
    case "forgot-pass" :
      return ForgotPassArticle()
    default:
      return LoginArticle()
    }
  }

  return (
    <>
      { handleArticle() }
    </>
  )
}

function LoginArticle(){
  return(
    <section className="w-[50%] none md:flex flex-col items-center [background:var(--gradient-bg)] justify-center h-[100%] relative">
      <img 
        className="w-full h-full absolute bg-center bg-contain"
        src={LoginBg} alt="" />
      <div className="w-[90%] h-[90%] flex flex-col justify-between text-light z-2">
        <Logo scheme={"dark"}/>
        <article className="w-[50%] flex flex-col gap-5">
          <h1 className="text-light"> Belanja lebih mudah, hidup lebih praktis</h1>
          <p className="bottom-1 relative"> Ribuan produk pilihan dengan harga terbaik, pengiriman cepat, dan
						pembayaran yang aman.
          </p>
          <ul className="flex gap-6 w-full h-fit">
            <li className="flex flex-col m-0">
              <h2 className="text-light">10rb+</h2>
              <p className="text-xs relative bottom-1">Produk</p>
            </li>
            <li className="flex flex-col">
              <h2 className="font-extrabold text-light">50rb+</h2>
              <p className="text-xs relative bottom-1">Pelanggan</p>
            </li>
            <li className="flex flex-col">
              <h2 className="text-light">4.8★</h2>
              <p className="text-xs relative bottom-1">Rating</p>
            </li>
          </ul>
        </article>
        <p className="text-xs">© 2026 BeliMudah. Seluruh hak cipta dilindungi.</p>
      </div>
    </section>
  )
}

function RegisterArticle(){
  return(
    <section className="w-[50%] none md:flex flex-col items-center [background:var(--gradient-regis-bg)] justify-center h-[100%] relative">
      <img 
        className="w-full h-full absolute bg-center bg-contain"
        src={RegisBg} alt="" />
      <div className="w-[90%] h-[90%] flex flex-col justify-between text-light z-2">
        <Logo scheme={"dark"}/>
        <article className="w-[50%] flex flex-col gap-5">
          <h1 className="text-light">Bergabung dengan 500.000+ pelanggan puas</h1>
          <ul className="flex flex-col gap-3 w-full h-fit">
            <li className="flex flex-row gap-3 items-center">
              <div className="w-[20px] h-[20px] accent-bg rounded-full flex justify-center items-center">
                <img src={CheckMark} alt="" />
              </div>
              <p className="text-sm">Akses ribuan produk dengan harga terbaik</p>
            </li>
            <li className="flex flex-row gap-3 items-center">
              <div className="w-[20px] h-[20px] accent-bg rounded-full flex justify-center items-center">
                <img src={CheckMark} alt="" />
              </div>
              <p className="text-sm">Lacak pesanan secara real-time</p>
            </li>
            <li className="flex flex-row gap-3 items-center">
              <div className="w-[20px] h-[20px] accent-bg rounded-full flex justify-center items-center">
                <img src={CheckMark} alt="" />
              </div>
              <p className="text-sm">Akses ribuan produk dengan harga terbaik</p>
      	      </li>
            <li className="flex flex-row gap-3 items-center">
              <div className="w-[20px] h-[20px] accent-bg rounded-full flex justify-center items-center">
                <img src={CheckMark} alt="" />
              </div>
              <p className="text-sm">Akses ribuan produk dengan harga terbaik</p>
            </li>				
          </ul>
        </article>
        <p className="text-xs">© 2026 BeliMudah. Seluruh hak cipta dilindungi.</p>
      </div>
    </section>
  )
}

function ForgotPassArticle(){
  return(
    <section className="w-[50%] none md:flex flex-col items-center [background:var(--gradient-forgot-bg)] justify-center h-[100%] relative">
      <img 
        className="w-full h-full absolute bg-center bg-contain"
        src={ForgotPassBg} alt="" />
      <div className="w-[90%] h-[90%] flex flex-col justify-between text-light z-2">
        <Logo scheme={"dark"}/>
        <article className="w-[50%] flex flex-col gap-3">
          <div className="rounded-xl flex justify-center items-center accent-bg w-[65px] h-[65px]">
      	<h1>🔐</h1>
          </div>
          <h1 className="text-light"> Akun kamu aman bersama kami</h1>
          <p> Kami menggunakan enkripsi tingkat militer untuk menjaga keamanan data dan transaksimu.
          </p>
          <ul className="flex gap-2 w-full h-fit flex-col mt-4 text-sm">
            <li className="flex flex-row m-0 gap-2">
              <p>🔒 Enkripsi SSL 256-bit</p>
            </li>
            <li className="flex flex-row gap-2">
              <p>🛡️ Perlindungan data pribadi</p>
            </li>
            <li className="flex flex-row gap-2">
              <p>📧 Verifikasi dua langkah</p>
            </li>
          </ul>
        </article>
        <p className="text-xs">© 2026 BeliMudah. Seluruh hak cipta dilindungi.</p>
      </div>
    </section>
  )
}