import React, { useEffect } from 'react'
import UploadContainer from './UploadContainer'

export default function Admin({user}) {
    useEffect(()=>{
        console.log(user);
    },[])

    
    return (
        <div className='container'>
            <h1 className='mt-3 text-center'>Admin Panel</h1>
            <hr/>
            <div className='row mt-5 '>
                <div className='col-md-12 '>
                    <UploadContainer user={user}/>
                </div>
            
            </div>

        </div>
    )
}
