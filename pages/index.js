import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React, { Children, useEffect } from 'react'
import Dashboard from './component/Dashboard'
import Login from './component/Login'
import Navbar from './component/Navbar'
import Admin from './component/Admin'

export default function Home({ providers,session }) {

  if (!session) {
    return (
     <Login toggle={providers}></Login>
    )
  }
  else if(session.user.email===process.env.ADMIN_ID)
  {
    return(
    <>
    <Admin user={session.user}></Admin>
    </>
    )
  }
  else{
    return(
    
      <>
      <Dashboard user={session.user}/>
      </>
    )
  }

 
  
}

