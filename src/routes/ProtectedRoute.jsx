import { useLocation, useNavigate } from "react-router";
import { useSelector } from "react-redux";

export default function ProtectedRoute({children}){
  const sessionUser = useSelector(state => state.session.session)
  const location = useLocation()
  const navigate = useNavigate()

  if(!sessionUser?.id){
    navigate("/login", {state:{origin: location.pathname}})	
  }

  return children
}