import { useState } from "react";
import { CheckoutContext } from "./UserContext";

export default function CheckoutProvider({children}){
  const [step, setStep] = useState(1)

  return(
    <CheckoutContext.Provider value={[step, setStep]}>
      {children}
    </CheckoutContext.Provider>
  )
}