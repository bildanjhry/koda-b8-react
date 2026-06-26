import { useSelector } from "react-redux"
import { useState, useEffect } from "react"

export default function useUserDetails(){
  const sessionUser = useSelector(state => state.session.session)
  const [userName, setUserName] = useState("")
  const [initial, setInitial] = useState()

  useEffect(() => {
    function getUserDetail(){
      const fullname = sessionUser.fullname
      if(/s/.test(fullname)){
        const username = fullname.split("")[0]
        setUserName(username)
        setInitial(username.charAt(0).toUpperCase())
      } else {
        setUserName(fullname)
        setInitial(fullname.charAt(0).toUpperCase())
      }
    }
    if(sessionUser.id) getUserDetail()
  },[sessionUser])

  return {userName, initial}
}
