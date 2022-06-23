import { providers, getSession } from "next-auth/client"
import React from 'react'

const initialState =0





const changeNumber = (state=initialState,action)=>{
    switch(action.type){
        case 'INCREMENT' :  return state=state+1;
        case 'DECREMENT' :  return state=state-1;
        default:  return state;
    }
}
export default changeNumber;
