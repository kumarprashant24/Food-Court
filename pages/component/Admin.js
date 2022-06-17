import React, { useEffect } from 'react'
import MenuContainer from './MenuContainer'
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
                    {/* <h3 className='mt-4 text-black-50'>Restaurant Details</h3> */}
                    <UploadContainer user={user}/>
                </div>
                {/* <div className='col-md-6'>
                    <h3 className='mt-4 text-black-50'>Menu Details</h3>
                    <MenuContainer user={user}/>
                </div> */}
            </div>

        </div>
    )
}
