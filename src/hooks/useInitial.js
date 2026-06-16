import { useEffect, useState } from "react";

import useUser from "./useUser";

export default function useInitial(){
  const [setUser] = useUser()
  const [initial, setInitial] = useState([])

  useEffect(() => {
    function getUserInital(){
      const user = JSON.parse(window.localStorage.getItem("user"))
      setInitial(user.fullname.charAt(0).toUpperCase())
    }
    getUserInital()
  },[])

  return [initial, setInitial, setUser]
}