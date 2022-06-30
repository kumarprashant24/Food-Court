import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Profile({ user,session}) {

    const [inputs, setInputs] = useState({
        phone_number: session.user.phone_number,
        shipping_address: session.user.shipping_address,
        landmark: session.user.landmark,
        city: session.user.city,
        state: session.user.state,
        zip: session.user.zip
    })
    const OnInputChange = e => {
        setInputs({ ...inputs, [e.target.name]: e.target.value })
    };
    const updateProfile = async() => {
        await axios.post('/api/updateUserProfile',{data:inputs,uid:session.user._id}).then((res)=>{
            console.log(res);
            toast.success('Profile Updated')
        })
    }
    useEffect(() => {
   
    }, [])
   
  

    return (
        <>
      
        <div>

            <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Profile</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className='d-flex'>
                                <img src={user.image} alt='no pic' className="rounded-circle" style={{ height: '50px', width: '50px' }} />
                                <div className='d-flex align-items-center ms-2'>{user.name} <span className='ms-2 text-success fw-bold'>{user.email === process.env.ADMIN_ID ? "(Admin)" : "(User)"}</span></div>
                            </div>

                            <div className='mt-3'><span className='fw-bold me-2'>Authorized Email: </span>{user.email}</div>
                            <div className="row mt-3">
                                <div className="col">
                                    <input type="text" className="form-control" placeholder="Phone Number" aria-label="" name='phone_number' onChange={(e) => OnInputChange(e)} value={inputs.phone_number} />
                                </div>
                            </div>

                            <div className="row g-3 mt-2">
                                <div className="col-12">
                                    <label htmlFor="inputAddress" className="form-label" >Shipping Address</label>
                                    <input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St" name='shipping_address' onChange={(e) => OnInputChange(e)} value={inputs.shipping_address} />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="inputEmail4" className="form-label" >Lankmark</label>
                                    <input type="text" className="form-control" name='landmark' onChange={(e) => OnInputChange(e)} value={inputs.landmark} />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="inputPassword4" className="form-label" >City</label>
                                    <input type="text" className="form-control" name='city' id="inputPassword4" onChange={(e) => OnInputChange(e)} value={inputs.city} />
                                </div>

                                <div className="col-md-6">
                                    <label htmlFor="inputState" className="form-label">State</label>
                                    <input type="text" className="form-control" name='state' id="inputPassword4" onChange={(e) => OnInputChange(e)} value={inputs.state} />

                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="inputZip" className="form-label">Zip</label>
                                    <input type="text" className="form-control" id="inputZip" name='zip' onChange={(e) => OnInputChange(e)} value={inputs.zip} />
                                </div>
                            </div>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={updateProfile}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <ToastContainer theme="colored" />
      
        </>
    )
}
