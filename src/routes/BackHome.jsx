import { useLocation, useNavigate } from "react-router";
import useUser from "@/hooks/useUser";
import { useSelector } from "react-redux";

export default function BackHome({children}){
  const user = useSelector(state => state.session.session)
  const location = useLocation()
  const navigate = useNavigate()

  if(!user?.id){
    navigate("/", {state:{origin: location.pathname}})	
  }
  return children
}