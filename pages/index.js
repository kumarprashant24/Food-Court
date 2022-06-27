
import React, { Children, useEffect } from 'react'
import Dashboard from './component/Dashboard'
import Login from './component/Login'
import Admin from './component/Admin'
import { useDispatch } from 'react-redux'
import { chekLogin } from '../redux/action/index'
export default function Home({ providers, session }) {
  const dispatch = useDispatch();


  if (!session) {
    return (
      <Login toggle={providers}></Login>
    )
  }
  else if (session.user.email === process.env.ADMIN_ID) {
    return (
      <>
        <Admin user={session.user}></Admin>
      </>
    )
  }
  else {
    dispatch(chekLogin(session));
    return (
      <>
        <Dashboard user={session.user} />
      </>
    )
  }



}

