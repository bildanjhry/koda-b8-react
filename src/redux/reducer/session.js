import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  session:{}
}

const reducers = {
  createSessionUser:function(state, action){
    state.user.push(action.payload)
  },
  updateSessionUser:function(state, action){
    state.user = {...action.payload}
  }
}

const session = createSlice({
  name:"session",
  initialState, 
  reducers
})

export default session.reducer
export const {createSessionUser, updateSessionUser} = session.actions