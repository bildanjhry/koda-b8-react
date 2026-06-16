import { useEffect, useState } from "react";

export default function useUser(){
  const [user, setUser] = useState({})

  useEffect(() => {
    function getUser(){
      const data = window.localStorage.getItem("user")
      if(data) {
        setUser(JSON.parse(data))
      }
    }
    getUser()
  },[])
    
  return [user, setUser]
}