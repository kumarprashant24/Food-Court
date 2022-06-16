import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React, { Children, useEffect } from 'react'
import Dashboard from './component/Dashboard'
import Login from './component/Login'
import Navbar from './component/Navbar'

export default function Home({ providers,session }) {


  if (!session) {
    return (
     <Login toggle={providers}></Login>
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

