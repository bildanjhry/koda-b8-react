import { useLocation, useNavigate } from "react-router"

// asset
import PaymentCard from "@/assets/icons/payment-blue.svg"
import ArrowRight from "@/assets/icons/bc-arrow-right-white.svg"
import Safe from "@/assets/icons/lock-blue.svg"

export default function Payment(){
  const location = useLocation()
  const navigate = useNavigate()
  console.log(location.state)

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

  function handleAddPayment(e){
    e.preventDefault()
    const data = new FormData(e.target)
    const objData = Object.fromEntries(data.entries())
    console.log(objData)
    navigate("/checkout/confirmation", {state: {...location.state, ...objData}})
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
        onSubmit={handleAddPayment}
        action="">
        <main className="flex flex-col gap-4">
          <div className="flex flex-col w-full mt-9">
            <ul className="grid w-full gap-4 justify-between grid-cols-3">
              {paymetMetod.map((item) => (
                <li 
                  key={item?.id}
                  className="relative">
                  <input
                    className={`absolute top-6 left-4 w-4 h-4 peer/paymet`} 
                    type="radio" id={item.inputName} name="paymentMethod" value={item.value} />
                  <label
                    className={`w-full items-center rounded-xl border-2 h-[65px] cursor-pointer border-(--border)
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
					
          <div className="w-full bg-(--accent-bg) mt-3 rounded-xl h-[42px] flex 
					text-xs items-center px-4 gap-3">
            <img 
              className="w-4"
              src={Safe} alt="safe guarantee" />
            <p>Informasi pembayaranmu dienkripsi dengan SSL 256-bit. Kami tidak menyimpan data kartu kreditmu.</p>
          </div>
          <div className="flex row gap-2 justify-between items-center mt-2">
            <button
						 type="button"
						 onClick={() => window.location.href = "/checkout" }
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