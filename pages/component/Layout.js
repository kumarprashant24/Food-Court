import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'

export default function Layout({children,providers,session}) {
  // useEffect(() => {
  //   //    console.log(data);
  // loaduser();
   
  //   },[])
  // const loaduser =()=>{
  //   axios.post('/api/showCartItems',{id:session.user._id}).then((res)=>{
  //   setBag(res.data);
     
  //  })

  // }
  return (
    <>
    <Navbar  user={session===null?"":session.user} session={session===null?"":session}/>
      {children}
    </>
  )
}
