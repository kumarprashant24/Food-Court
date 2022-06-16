import React, { useEffect, useState } from 'react'
import { signOut } from "next-auth/client"
import Link from 'next/link'
import axios from 'axios'
import { useRouter } from 'next/router'


export default function Navbar({ user }) {
    const router = useRouter()
    const [userDetails, setUserDetails] = useState({})
    useEffect(() => {
        getUserID();
    })
    const getUserID = async ()=>{
      
        await axios.post("/api/userId", { email: user.email }).then((res) => {
            setUserDetails(res.data);
        });
    } 

    const logout =()=>{
        signOut();
        // router.push('/')
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link  href="/component/Dashboard">
                                <a className="nav-link active" aria-current="page">Food Court</a>

                                </Link>
                            </li>

                        </ul>
                        {user === '' ? "" :
                            <div className='d-flex'>
                                <img src={user.image} className="rounded-circle" style={{ height: '50px', width: '50px' }} />

                                <div className='text-white d-flex align-items-center ms-2'>{user.name}</div>
                                <Link href={`/component/Cart?uid=${userDetails._id}`}>
                                    <a className='d-flex align-items-center ms-2'>
                                        <div ><i className="fa-solid fa-cart-shopping fa-2x text-white  "></i></div>
                                    </a>

                                </Link>
                                <div className='d-flex align-items-center ms-3' onClick={() => logout()} style={{cursor:"pointer"}}>
                                    <i className="fa-solid fa-2x fa-right-from-bracket text-white"></i>
                                </div>
                            </div>
                        }

                    </div>
                </div>
            </nav>
        </>
    )
}
