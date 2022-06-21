import React from 'react'

export default function Profile({ user }) {
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
                                <img src={user.image} alt='no pic'  className="rounded-circle" style={{ height: '50px', width: '50px' }}/>

                                <div className='d-flex align-items-center'>{user.name}</div>
                            </div>

                            <div><span className='fw-bold'>Email: </span>{user.email}</div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
