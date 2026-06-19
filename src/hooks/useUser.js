import { useEffect, useState } from "react";

export default function useUser(key){
  const [user, setUser] = useState({})
  const [accounts, setAccouts] = useState([])
  const [initial, setInitial] = useState("")
  const [cart, setCart] = useState([])
  const [checkout, setCheckout] = useState([])
  const [error, setError] = useState("")
  const [wishlist, setWishlist] = useState([])
  const [userName, setUserName] = useState("")

  useEffect(() => {
    function getUser(){
      const data = window.localStorage.getItem(key)
      if(data) {
        if(!(Array.isArray(JSON.parse(data)))) {
          const newData = JSON.parse(data)
          setUser(newData)
          setInitial(newData.fullname.charAt(0).toUpperCase())
          setUserName(newData.fullname.split(" ")[0])
          setCart(newData.cart)
          setCheckout(newData.checkout)
          setWishlist(newData.wishlist)
        } else{
          setAccouts(JSON.parse(data))
        } 
      } else {
        setError("Item with key "+ key +" is Empty")
      }
    }
    getUser()
  },[key])
    
  return {user, accounts, setAccouts, setUser, userName, initial, cart, wishlist, checkout, error}
}