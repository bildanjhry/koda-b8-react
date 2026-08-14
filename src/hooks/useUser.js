import { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "@/hooks/context/UserContext";
import { useSelector } from "react-redux";

export default function useUser() {

  // lazy init
  // const [user, setUser] = useState(() => {
  //   return JSON.parse(window.localStorage.getItem("user")) || {}
  // })
  // const [accounts, setAccouts] = useState(() => {
  //   return JSON.parse(window.localStorage.getItem("accounts")) || []
  // })

  // const [initial, setInitial] = useState("")
  // const [checkout, setCheckout] = useState(user.checkout || [])
  const [wishlist, setWishlist] = useState([])
  const [address, setAddress] = useState([])
  // const [error, setError] = useState("")
  // const [bio, setBio] = useState(user.bio || {})
  // const [userName, setUserName] = useState("")
  const [profiles, setProfiles] = useState({})
  const [cart, setCart] = useState([])
  const [, setGlobalCart] = useContext(UserContext)
  const session = useSelector(state => state.session.session)

  useEffect(() => {
    async function getUserAddress() {
      try {
        if (!session.id) {
          throw new Error("No user detected")
        }
        const API = import.meta.env.VITE_API_URL
        const id = session.id
        const token = session.token
        const response = await fetch(`${API}/address/user/${id}`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        })
        const data = await response.json()
        if (!data.succes) {
          throw new Error(data.message)
        }
        setAddress(data.results)

      } catch (err) {
        console.error(err.message)
      }
    }
    getUserAddress()
  }, [setAddress])

  useEffect(() => {
    async function getUserProfiles() {
      try {
        if (!session.id) {
          throw new Error("No user detected")
        }
        const API = import.meta.env.VITE_API_URL
        const id = session.id
        const token = session.token
        const response = await fetch(`${API}/profiles/${id}`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        })
        const data = await response.json()
        if (!data.success) {
          throw new Error(data.message)
        }
        setProfiles(data.results)
      } catch (err) {
        console.error(err.message)
      }
    }
    getUserProfiles()
  }, [])


  async function setterAddress(data) {
    const API = import.meta.env.VITE_API_URL
    const token = session.token
    const formated = new URLSearchParams(data)
    const response = await fetch(`${API}/address`,{
      method: "POST",
      headers:{
        "Authorization":`Bearer ${token}`
      },
      body: formated
    })

    const res = await response.json()
    if(!res.succes){
      throw new Error(res.message)
    }
  }


  // useEffect(() => {
  //   setGlobalCart(cart) // global state management
  // },[cart, setGlobalCart])

  // useEffect(() => {
  //   function updateUser(){
  //     const rest = accounts.filter((item) => item.id !== user.id)
  //     if(user.id !== undefined){
  //       window.localStorage.setItem("accounts", JSON.stringify([...rest, {...user, cart, checkout, bio}]))
  //       window.localStorage.setItem("user", JSON.stringify({...user, cart, checkout, bio}))
  //     } else window.localStorage.removeItem("user")
  //   }
  //   updateUser() // update local storage if some data changes
  // },[user, accounts, cart, checkout, bio])


  // function setterAccounts(data) {
  //   setAccouts(prev => {
  //     const prevAccounts = [...prev]
  //     prevAccounts.push(data)
  //     window.localStorage.setItem("accounts", JSON.stringify(prevAccounts))

  //     return prevAccounts
  //   })
  // }

  // function setterCart(data) {
  //   setCart((prev) => {
  //     let found = false;
  //     const updated = prev.map((item) => {
  //       if ( item.id === data.id && item.variants === data.variants) {
  //         found = true;
  //         return { ...item, qty: item.qty + data.qty,};
  //       }
  //       return item;
  //     });
  //     return found ? updated : [...updated, data];
  //   });
  // }

  // function setterUser(data) {
  //   window.localStorage.setItem("user", JSON.stringify(data))
  // }

  // function setterAddress(data){
  //   setAddress(prev => {
  //     return [...prev, data]
  //   })
  //   window.localStorage.setItem("accounts", JSON.stringify([...accounts, {...user, address:[...address, data]}]))
  //   window.localStorage.setItem("user", JSON.stringify({...user, address:[...address, data]}))
  // }

  // function setterCheckout(data){
  //   setCheckout(prev => {
  //     return [...prev, data]
  //   })
  // }

  return {
    // user, 
    // accounts, 
    // setterAccounts,
    // setterUser, 
    // setterCart,
    setAddress,
    setterAddress,
    // setterCheckout,
    setCart,
    // setUser,
    // userName, 
    address,
    profiles,
    // bio,
    // setBio,
    // initial,
    cart,
    wishlist, 
    // checkout, 
    // error
  }

}