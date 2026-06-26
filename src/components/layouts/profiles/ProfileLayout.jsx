import { useEffect, useState } from "react";

//hook
import useMediaQuery from "@/hooks/useMediaQuery";

// component
import MainLayout from "@/components/layouts/MainLayout";
import Content from "./particles/Content";
import MobileContent from "./particles/MobileContent"
import useUserDetails from "@/hooks/useUserDetails";
import { useSelector } from "react-redux";

export default function ProfileLayout(){
  const width = useMediaQuery("(max-width:768px)")
  const user = useSelector(state => state.session.session)
  const { initial } = useUserDetails()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    function getWidthScreen(){
      setIsMobile(width)
    }
    getWidthScreen()
  },[width])

  return isMobile ? 
    ( <MobileContent initial={initial} user={user}/> )
    :  
    ( 
      <MainLayout>
        <Content initial={initial} user={user}/>
      </MainLayout>
    )
  
}
