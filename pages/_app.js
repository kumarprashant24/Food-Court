import '../styles/globals.css'
import Head from 'next/head'
import Script from 'next/script'
import { providers, getSession } from "next-auth/client"
import React, { useEffect, useRef, useState } from 'react'
import Layout from './component/Layout'
import { Provider } from 'react-redux'
import store from '../redux/store'
import LoadingBar from 'react-top-loading-bar'
import { ToastContainer } from 'react-toastify';

function MyApp({
  Component,
  pageProps, providers, session
}) {

  const [progress, setProgress] = useState(0)
  return <>

    <Head>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet"/>
    </Head>
    <Provider store={store}  session={session} >
      <Layout providers={providers} session={session}  >
      <LoadingBar
        color='#f11946'
        loaderSpeed={2000}
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
                <ToastContainer theme="colored" />
        <Component {...pageProps} providers={providers} session={session} progress={progress} setProgress={setProgress}/>
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
export default MyApp
