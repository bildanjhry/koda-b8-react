import { useSelector, useDispatch } from "react-redux"
import { useState, useEffect } from "react"
import { createAccount } from "../redux/reducer/accounts"

export default function useUserDetails() {
  const account = useSelector(state => state.accounts.accounts)
  const sessionUser = useSelector(state => state.session.session)
  const [userProfile, setUserProfile] = useState({
    username: "dovesfeather",
    email: ""
  })
  const [initial, setInitial] = useState()
  const dispatch = useDispatch()

  useEffect(() => {
    async function getUserDetail() {
      try {
        if(!sessionUser.token){
          throw new Error("No user detected")
        }
        const id = sessionUser.id
        const token = sessionUser.token
        const API = "http://localhost:8081"
        const response = await fetch(`${API}/profiles/${id}`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        })
        const data = await response.json()
        if (!data.success) {
          throw new Error(data.message)
        }
        const username = data.results?.username
        const email = data.results?.email
        dispatch(createAccount({ 
          username: btoa(username), 
          email: btoa(email)
        }))
        setInitial(username.charAt(0).toUpperCase())
        setUserProfile({
          username: username,
          email:email
        })
      } catch (err) {
        setInitial(userProfile.username.charAt(0).toUpperCase())
        console.error(err.message)
      }

    }
    if (account.username === undefined || account.email === undefined ) getUserDetail()
    else {
      let profiles = account
      let username = profiles.username
      let email = profiles.email
      username = atob(username)
      email = atob(email)
      setInitial(username.charAt(0).toUpperCase())
      setUserProfile({
        username:username,
        email:email
      })
    }
  }, [account])

  return { userProfile, initial }
}
