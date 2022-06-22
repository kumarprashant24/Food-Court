import axios from 'axios';
import React, { useEffect, useState } from 'react'

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
            alert('data updated')
        })
    }
    useEffect(() => {
    //   console.log(session);
    }, [])
   
  

    return (
        <div>

            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                            <div class="row mt-3">
                                <div class="col">
                                    <input type="text" class="form-control" placeholder="Phone Number" aria-label="" name='phone_number' onChange={(e) => OnInputChange(e)} value={inputs.phone_number} />
                                </div>
                            </div>

                            <div class="row g-3 mt-2">
                                <div class="col-12">
                                    <label for="inputAddress" class="form-label" >Shipping Address</label>
                                    <input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St" name='shipping_address' onChange={(e) => OnInputChange(e)} value={inputs.shipping_address} />
                                </div>
                                <div class="col-md-6">
                                    <label for="inputEmail4" class="form-label" >Lankmark</label>
                                    <input type="text" class="form-control" name='landmark' onChange={(e) => OnInputChange(e)} value={inputs.landmark} />
                                </div>
                                <div class="col-md-6">
                                    <label for="inputPassword4" class="form-label" >City</label>
                                    <input type="text" class="form-control" name='city' id="inputPassword4" onChange={(e) => OnInputChange(e)} value={inputs.city} />
                                </div>

                                <div class="col-md-6">
                                    <label for="inputState" class="form-label">State</label>
                                    <input type="text" class="form-control" name='state' id="inputPassword4" onChange={(e) => OnInputChange(e)} value={inputs.state} />

                                </div>
                                <div class="col-md-6">
                                    <label for="inputZip" class="form-label">Zip</label>
                                    <input type="text" class="form-control" id="inputZip" name='zip' onChange={(e) => OnInputChange(e)} value={inputs.zip} />
                                </div>
                            </div>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" onClick={updateProfile}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
