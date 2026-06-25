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
  const [bio, setBio] = useState(user.bio || {})
  const [userName, setUserName] = useState("")
  const [ , setGlobalCart] = useContext(UserContext)

  useEffect(() => {
    function getUser(){
      try{
        setInitial(user?.fullname?.charAt(0)?.toUpperCase())
        setUserName(user?.fullname?.split(" ")[0])
      } catch(err){
        console.error(err.message)
      }
    }

    getUser()
  },[user])

  useEffect(() => {
    setGlobalCart(cart) // global state management
  },[cart, setGlobalCart])

  useEffect(() => {
    function updateUser(){
      const rest = accounts.filter((item) => item.id !== user.id)
      if(user.id !== undefined){
        window.localStorage.setItem("accounts", JSON.stringify([...rest, {...user, cart, checkout, bio}]))
        window.localStorage.setItem("user", JSON.stringify({...user, cart, checkout, bio}))
      } else window.localStorage.removeItem("user")
    }
    updateUser() // update local storage if some data changes
  },[user, accounts, cart, checkout, bio])


  function setterAccounts(data) {
    setAccouts(prev => {
      const prevAccounts = [...prev]
      prevAccounts.push(data)
      window.localStorage.setItem("accounts", JSON.stringify(prevAccounts))

      return prevAccounts
    })
  }

  function setterCart(data) {
    setCart((prev) => {
      let found = false;
      const updated = prev.map((item) => {
        if ( item.id === data.id && item.variants === data.variants) {
          found = true;
          return { ...item, qty: item.qty + data.qty,};
        }
        return item;
      });
      return found ? updated : [...updated, data];
    });
  }

  function setterUser(data) {
    window.localStorage.setItem("user", JSON.stringify(data))
  }

  function setterAddress(data){
    setAddress(prev => {
      return [...prev, data]
    })
    window.localStorage.setItem("accounts", JSON.stringify([...accounts, {...user, address:[...address, data]}]))
    window.localStorage.setItem("user", JSON.stringify({...user, address:[...address, data]}))
  }

  function setterCheckout(data){
    setCheckout(prev => {
      return [...prev, data]
    })
  }
  
  return {
    user, 
    accounts, 
    setterAccounts,
    setterUser, 
    setterCart,
    setterAddress,
    setterCheckout,
    setCart,
    setUser,
    userName, 
    address,
    bio,
    setBio,
    initial,
    cart, 
    wishlist, 
    checkout, 
    error
  }

}