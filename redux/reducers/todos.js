import { providers, getSession } from "next-auth/client"
import React from 'react'

const initialState =0


const changeNumber = (state=initialState,action,payload)=>{
    
    switch(action.type){
        case 'INCREMENT' :  return state = state+1;
        case 'DECREMENT' :  return state = state-1;
        case 'LOGIN_SUCCESS' :return state = action.payload.cart;
        default:  return state;
    }
}

export default changeNumber;

