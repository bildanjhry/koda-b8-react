import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accounts:[],
}

const reducers = {
  createAccount:function(state, action){
    console.log(action.payload)
    state.accounts.push(action.payload)
  },
  updateAccount:function(state, action){
    const userIndex = state.accounts.filter((item) => item.id !== action.payload.id)
    state.accounts.splice(userIndex, 1, action.payload.user)
  }
}

const accounts = createSlice({
  name:"accounts",
  initialState, 
  reducers
})

export default accounts.reducer
export const {createAccount, createUser, updateAccount} = accounts.actions