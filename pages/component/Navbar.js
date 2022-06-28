import React, { useContext,createContext, useEffect, useState } from 'react'
import { signOut } from "next-auth/client"
import Link from 'next/link'
import { useRouter } from 'next/router'
import Profile from './Profile'
import {useSelector} from 'react-redux'


export default function Navbar({ user,userData,session,}) {
    const myState = useSelector((state)=>
    state.changeNumber
  )
 
    const router = useRouter()

   useEffect(()=>{
    
   },[])
 
  const home =()=>{
    router.push('/');
  }
    const logout =()=>{
        signOut();
  
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light border-bottom">
                <div className="container-fluid">

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link  href="/component/Dashboard">
                                <a className="nav-link active d-flex align-items-center fw-bold" aria-current="page"><div><i className="fa-solid fa-2x fa-seedling me-2 text-success"></i></div>Food Court</a>

                                </Link>
                            </li>

                        </ul>
                        {user === '' ? "" :
                            <div className='d-flex'>
                                <div className='d-flex' data-bs-toggle="modal" data-bs-target="#exampleModal" style={{cursor:"pointer"}}>
                                <img src={user.image} className="rounded-circle" style={{ height: '50px', width: '50px' }} />
                               
                               <div className='d-flex align-items-center ms-2  text-black-50 fw-bold' >{user.name}</div>
                       
                                </div>
                               
                                <div className='d-flex align-items-center ms-3 position-relative ' onClick={home} style={{cursor:"pointer"}}> 
                                <box-icon name='home' size="40px" color='rgba(0,0,0,.5)'></box-icon>
                 
                                </div>
                                <div className='position-relative d-flex align-items-center'>
                                {user.email===process.env.ADMIN_ID?"":
                                
                                 <Link href={`/component/Cart?uid=${session.user._id}`} className="">
                                 <a className=' d-flex align-items-center ms-2'>
                                     <div className='d-flex align-items-center' >
                                        <box-icon name='cart' size="40px" color='rgba(0,0,0,.5)'></box-icon>
                                        <div className='bag d-flex justify-content-center align-items-center text-white'>{myState}</div>
                                        </div>
                                 </a>


                             </Link>
                                }
                                </div>
                               
                                <div className='d-flex align-items-center ms-3' onClick={() => logout()} style={{cursor:"pointer"}}>
                                <box-icon name='log-out-circle' size="40px" rotate='180' color='rgba(0,0,0,.5)'></box-icon>
                                </div>
                                <Profile user={user} session={session}/>
                            </div>
                        }

                    </div>
                </div>
            </nav>
        </>
    )
}
