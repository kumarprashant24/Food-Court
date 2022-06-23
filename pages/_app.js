import '../styles/globals.css'

import Head from 'next/head'
import Script from 'next/script'
import Navbar from './component/Navbar'
import { providers, getSession } from "next-auth/client"
import React, { useEffect, useState } from 'react'
import Layout from './component/Layout'
import axios from 'axios'
import { Provider } from 'react-redux'
import store from '../redux/store'
function MyApp({
  Component,
  pageProps, providers, session
}) {
  useEffect(() => {
    console.log(session);

  }, [])

  return <>

    <Head>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous" />
    </Head>
    <Provider store={store}  session={session} >
      <Layout providers={providers} session={session}  >
        <Component {...pageProps} providers={providers} session={session} />
      </Layout>
    </Provider>
    <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></Script>
    <Script
      src="https://kit.fontawesome.com/ff2468692f.js"
      crossorigin="anonymous"
    ></Script>
    <Script src="https://unpkg.com/boxicons@2.1.1/dist/boxicons.js"></Script>

  </>

}
MyApp.getInitialProps = async (context) => {


  return {
    providers: await providers(context),
    session: await getSession(context),
  }
}

export const sess = 5
export default MyApp
