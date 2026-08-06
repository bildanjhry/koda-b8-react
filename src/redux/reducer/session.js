import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  session:{}
}

const reducers = {
  createSessionUser:function(state, action){
    state.session = {...action.payload}
  },
  updateSessionUser:function(state, action){
    state.session = {...action.payload}
  },
  clearSessionUser:function(state){
    state.session = {}
  }
}

const session = createSlice({
  name:"session",
  initialState, 
  reducers
})

export default session.reducer
export const {createSessionUser, updateSessionUser, clearSessionUser} = session.actions