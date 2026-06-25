import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createSessionUser } from "@/redux/reducer/session";
import { createAccount } from "../redux/reducer/accounts";

export default function useAuth(){
  const dispatch = useDispatch()
  const [newAccount, setNewAccount] = useState({})
  const [userData, setUserData] = useState({
    email:"",
    password:""
  })
  const [authRes, setAuthRes] = useState({
    event:false,
    error:false,
    code:"",
    message:""
  })
  const accounts = useSelector(state => state.accounts.accounts)

  useEffect(() => {
    function sessionUser(){
      try{
        const foundAccount = accounts.filter((item) => {
      	  return item.email === userData.email && atob(item.password) === userData.password
        })

        // guard clause
        if(foundAccount.length < 1) throw new Error("Akun tidak ditemukan")
        
        dispatch(createSessionUser(foundAccount[0]))
        setAuthRes({
          event:true,
          error:false,
          code:"LOGIN_SUCCESS",
          message:"Sukses Login"
        })

      } catch(err){
        console.error(err)
        setAuthRes({
          event:true,
          error:true,
          code:"LOGIN_FAILED",
          message:err.message
        })
      }
    }
    sessionUser()
  },[userData, accounts, dispatch])

  useEffect(() => {
    function addNewAccount(){
      try{

        if(accounts.find((item) => item.email === newAccount.email)){
          throw new Error("Email sudah digunakan")
        }

        dispatch(createAccount(newAccount))
        setAuthRes({
          event:true,
          error:false,
          code:"REGISTER_ACCOUNT_SUCCESS",
          message:"Sukses Membuat Akun"
        })    

      } catch(err){
        console.error(err)
        setAuthRes({
          event:true,
          error:true,
          code:"REGISTER_ACCOUNT_FAILED",
          message:err.message
        })        
      }
    }
    addNewAccount()
  },[accounts, newAccount, dispatch])

  return { authRes, setUserData, setNewAccount }
}