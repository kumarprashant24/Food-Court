import React, { useEffect } from 'react'
import Navbar from './Navbar'

export default function Layout({children,providers,session}) {

  return (
    <>
    <Navbar  user={session===null?"":session.user}/>
      {children}
    </>
  )
}
