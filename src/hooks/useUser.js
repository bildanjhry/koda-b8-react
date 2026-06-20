import { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "@/hooks/context/UserContext";

export default function useUser(){

  // lazy init
  const [user, setUser] = useState(() => {
    return JSON.parse(window.localStorage.getItem("user")) || {}
  })
  const [accounts, setAccouts] = useState(() => {
    return JSON.parse(window.localStorage.getItem("accounts")) || []
  })

  const [initial, setInitial] = useState("")
  const [cart, setCart] = useState(user.cart || [])
  const [checkout, setCheckout] = useState(user.checkout || [])
  const [wishlist, setWishlist] = useState(user.wishlist || [])
  const [address, setAddress] = useState(user.address || [])
  const [error, setError] = useState("")
  const [userName, setUserName] = useState("")
  const [ , setGlobalCart] = useContext(UserContext)

  useEffect(() => {
    function getUser(){
      try{
        setInitial(user?.fullname?.charAt(0)?.toUpperCase())
        setUserName(user?.fullname?.split(" ")[0])
        setGlobalCart(user?.cart)
      } catch(err){
        console.error(err.message)
      }
    }

    getUser()
  },[user, setGlobalCart])

  function setterAccounts(data) {
    setAccouts(prev => {
      const prevAccounts = [...prev]
      prevAccounts.push(data)
      window.localStorage.setItem("accounts", JSON.stringify(prevAccounts))

      return prevAccounts
    })
  }

  function setterCart(data){
    setCart(prev => {
      let found = false
      prev.forEach((item) => {
        if(item.id === data.id && item.variants === data.variants){
          found = true
          item.qty += data.qty
        }
      })
      
      const rest = accounts.filter((item) => item.id !== user.id)
   
      if(found) {
        setUser({...user, cart:[...prev]}) // update user's data
        
        // updating localstorage
        window.localStorage.setItem("user", JSON.stringify({...user, cart:[...prev]})) 
        window.localStorage.setItem("accounts", JSON.stringify([...rest, {...user, cart:[...prev]}]))
      }
      else {
        setUser({...user, cart:[...prev, data]})
        
        // updating localstorage
        window.localStorage.setItem("user", JSON.stringify({...user, cart:[...prev, data]}))
        window.localStorage.setItem("accounts", JSON.stringify([...rest, {...user, cart:[...prev, data]}]))
      }  
      
      return found? prev : [...prev, data]
    })
  }
  
  useEffect(() => {
    function updateUser(){
      const rest = accounts.filter((item) => item.id !== user.id)
      window.localStorage.setItem("accounts", JSON.stringify([...rest, {...user, cart}]))
      window.localStorage.setItem("user", JSON.stringify({...user, cart}))
    }
    if(cart.length !== 0){
      updateUser()
    }
  },[user, accounts, cart])

  function setterUser(data) {
    setUser(data)
    window.localStorage.setItem("user", JSON.stringify(data))
  }

  function setterAddress(data){
    setAddress(prev => {
      return [...prev, data]
    })
    window.localStorage.setItem("accounts", JSON.stringify([...accounts, {...user, address:[...address, data]}]))
    window.localStorage.setItem("user", JSON.stringify({...user, address:[...address, data]}))
  }
  
  return {
    user, 
    accounts, 
    setterAccounts,
    setterUser, 
    setterCart,
    setterAddress,
    setCart,
    setUser,
    userName, 
    address,
    initial,
    cart, 
    wishlist, 
    checkout, 
    error
  }

}