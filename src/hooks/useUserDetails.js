import { useSelector } from "react-redux"
import { useState, useEffect } from "react"

export default function useUserDetails(){
  const sessionUser = useSelector(state => state.session.session)
  const [userName, setUserName] = useState("")
  const [initial, setInitial] = useState()

  useEffect(() => {
    function getUserDetail(){
      const userName = sessionUser.fullname.split("")[0]
      setUserName(userName)
      setInitial(userName.charAt(0).toUpperCase())
    }
    if(sessionUser.id !== undefined) getUserDetail()
  },[sessionUser])

  return {userName, initial}
}
