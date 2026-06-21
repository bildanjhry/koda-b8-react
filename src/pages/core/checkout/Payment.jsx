import { useLocation, useNavigate } from "react-router"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useContext, useEffect } from "react"
import { CheckoutContext } from "@/hooks/context/UserContext"

// asset
import PaymentCard from "@/assets/icons/payment-blue.svg"
import ArrowRight from "@/assets/icons/bc-arrow-right-white.svg"
import Safe from "@/assets/icons/lock-blue.svg"

const schema = yup.object({
  paymentMethod:yup.string().required("Silahkan pilih methode pembayaran")
})

export default function Payment(){
  const location = useLocation()
  const navigate = useNavigate()
  const [step, setStep] = useContext(CheckoutContext)

  useEffect(() => {
    window.scrollTo(0,0)
    setStep(location.state.step)
  },[location, setStep])

  const { handleSubmit, formState: { errors }, register} = useForm({
    resolver:yupResolver(schema)
  })

  const paymetMetod = [
    {
      id:"1vi",
      name:"🏦 Virtual Account BCA",
      inputName:"va-bca",
      value:["1vi","Virtual Account BCA"]
    },
    {
      id:"2vi",
      name:"🏦 Virtual Account BNI",
      inputName:"va-bni",
      value:["2vi", "Virtual Account BNI"]
    },
    {
      id:"3ka",
      name:"🏦 Kartu Kredit / Debit",
      inputName:"kredit-debit",
      value:["3ka", "Kartu Kredit / Debit"]
    },		
    {
      id:"4go",
      name:"📱 GoPay",
      inputName:"gopay",
      value:["4go" ,"GoPay"]
    },	
    {
      id:"5ov",
      name:"📱 OVO",
      inputName:"ovo",
      value:["5ov" ,"OVO"]
    },
    {
      id:"6da",
      name:"📱 Dana",
      inputName:"dana",
      value:["6da" ,"Dana"]
    },							
  ]

  function handleAddPayment(data){
    setStep(3)
    navigate("/checkout/confirmation", { state: {step:location.state.step+1, data:{...location.state.data, ...data}}})
  }

  return(
    <div>
      <header className="flex items-center gap-2">
        <img 
          className="w-6 "
          src={PaymentCard} alt="" />
        <h3>Metode Pengiriman</h3>
      </header>
      <form 
        onSubmit={handleSubmit(handleAddPayment)}
        action="">
        <main className="flex flex-col gap-4">
          <div className="flex flex-col w-full mt-9">
            <ul className="grid w-full gap-4 justify-between grid-cols-3">
              {paymetMetod.map((item) => (
                <li 
                  key={item?.id}
                  className="relative">
                  <input
                    {...register("paymentMethod")}
                    className={`absolute top-6 left-4 w-4 h-4 peer/paymet`} 
                    type="radio" id={item.inputName} name="paymentMethod" value={item.value} />
                  <label
                    className={`w-full items-center rounded-xl border-2 h-16.25 cursor-pointer border-(--border)
											flex justify-between pl-10 pr-6 peer-checked/paymet:border-(--main-border) peer-checked/paymet:bg-(--accent-bg)`} 
                    htmlFor={item.inputName}>
                    <div className="flex flex-col justify-center">
                      <p className="text-h font-medium text-md">{item.name}</p>
                    </div>
                  </label>
                </li>
              ))}
            </ul>
          </div>
          { errors.paymentMethod && <p className="text-red-500 text-sm mt-3">*{errors.paymentMethod?.message}</p>}
          <div className="w-full bg-(--accent-bg) mt-3 rounded-xl h-10.5 flex 
					text-xs items-center px-4 gap-3">
            <img 
              className="w-4"
              src={Safe} alt="safe guarantee" />
            <p>Informasi pembayaranmu dienkripsi dengan SSL 256-bit. Kami tidak menyimpan data kartu kreditmu.</p>
          </div>
          <div className="flex row gap-2 justify-between items-center mt-2">
            <button
						 type="button"
						 onClick={() => navigate("/checkout", {state:{ step:1, data:location.state.data}}) }
						 className="rounded-xl cursor-pointer
						 text-sm w-[15%] h-13 flex justify-center items-center border-light">
							Kembali
            </button>
            <button 
              type="submit"
              className="flex gap-2 text-sm text-white bg-(--main-bg) rounded-xl h-13 items-center
								justify-center w-[85%] cursor-pointer">
              <p>Lanjut Konfirmasi</p>
              <img 
                className="relative top-px"
                src={ArrowRight} alt="payment step" />
            </button>			
          </div>
        </main>
      </form>
    </div>
  )  
}