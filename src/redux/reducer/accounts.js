import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accounts:{},
}

const reducers = {
  createAccount:function(state, action){
    state.accounts = {...action.payload}
  },
  clearAccount:function(state, action){
    state.accounts = {}
  }
}

const accounts = createSlice({
  name:"accounts",
  initialState, 
  reducers
})

export default accounts.reducer
export const {createAccount, clearAccount} = accounts.actions