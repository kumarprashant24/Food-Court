import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'

export default function Layout({children,providers,session}) {
useEffect(()=>{
// console.log(userData);
},[])
  return (
    <>
    <Navbar  user={session===null?"":session.user} session={session===null?"":session}/>
      {children}
    </>
  )
}
