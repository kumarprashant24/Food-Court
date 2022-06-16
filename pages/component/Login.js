import React from 'react'
import { signIn } from "next-auth/client"
export default function Login({ toggle }) {
    return (
        <div className='position-relative'>
            <div className='login'></div>
            <div className='position-absolute top-0 d-flex  justify-content-center w-100  align-items-center' style={{ height: '100vh' }}>
                <div>
                    <div className='d-flex'>
                        <h1 className='text-white heading'>Taste The Flavour</h1>
                        <div className='d-flex align-items-center ms-2'>
                            <i className="fa-solid fa-2x fa-arrow-right-long text-white"></i>
                        </div>
                    </div>
                    <div className='d-flex  justify-content-center ' style={{cursor:"pointer"}}>
                        <div className='bg-white d-flex p-2 rounded' onClick={() => signIn(toggle.google.id)}>
                            <img className='google' src='https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-webinar-optimizing-for-success-google-business-webinar-13.png' />
                            <div className='d-flex align-items-center' style={{ color: 'rgb(105, 105, 105)' }}>Continue With Google</div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

