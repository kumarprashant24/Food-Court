import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'

export default function Layout({children,providers,session}) {

  return (
    <>
    <Navbar  user={session===null?"":session.user} session={session===null?"":session}/>
      {children}
    </>
  )
}
