
import axios from "axios"
import { providers, getSession } from "next-auth/client"


export const increase = (session) => {

    return {type: "INCREMENT"}
}

export const decrease = (session) => {
  
    return {type: "DECREMENT"}
}

export const chekLogin = (session) => {
  
    return({ type: "LOGIN_SUCCESS", payload: { cart:session.cart.order_details.length} })
}
    
    