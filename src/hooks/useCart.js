import { useEffect, useState } from "react";

export default function useCart(){
  const [cart, setCart] = useState([])

  useEffect(() => {
    function getUserCart(){
      const user = window.localStorage.getItem("user")
      if(user){
        const cart = JSON.parse(user).cart
        setCart(cart)
      }
    }
    getUserCart()
  },[])

  return [cart, (data) => { 
    setCart((prev) => {
      return [
        ...prev,
        data
      ]
    })
  }]
}