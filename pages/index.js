
import React, { Children, useEffect } from 'react'
import Dashboard from './component/Dashboard'
import Login from './component/Login'
import Admin from './component/Admin'
import { useDispatch } from 'react-redux'
import { chekLogin } from '../redux/action/index'
export default function Home({ providers, session,progress,setProgress  }) {
  const dispatch = useDispatch();

useEffect(()=>{
  console.log(session);
},[])
  if (!session) {
    return (
      <Login toggle={providers}></Login>
  
    )
  }
  else if (session.user.email === process.env.ADMIN_ID) {
    return (
      <>
        <Admin user={session.user} progress={progress} setProgress={setProgress}></Admin>
      </>
    )
  }
  else {
    dispatch(chekLogin(session));
    return (
      <>
        <Dashboard user={session.user} progress={progress} setProgress={setProgress} />
      </>
    )
  }



}

