import React, { useEffect } from 'react'
import UploadContainer from './UploadContainer'

export default function Admin({user, progress ,setProgress}) {
 
    
    return (
        <div className='container'>
            <h1 className='mt-3 text-center'>Admin Panel</h1>
            <hr/>
            <div className='row mt-5 '>
                <div className='col-md-12 '>
                    <UploadContainer user={user} progress={progress} setProgress={setProgress}/>
                </div>
            </div>

        </div>
    )
}
