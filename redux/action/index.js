


export const increase = (session) => {

    return {type: "INCREMENT"}
}

export const decrease = (session) => {
  
    return {type: "DECREMENT"}
}

export const chekLogin = (session) => {
    if(!session)
    {
    return({ type: "LOGIN_SUCCESS", payload: { cart:0} })
    }
  else{
    return({ type: "LOGIN_SUCCESS", payload: { cart:session.cart.order_details.length} })

  }
}
    
    