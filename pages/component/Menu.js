import React, { useEffect, useState } from 'react'
import { useRouter } from "next/router";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './Navbar';
export default function Menu({ providers, session }) {
    const [menu, setMenu] = useState([])
    const [restro, setRestro] = useState({})
    const [quantity, setQuantity] = useState(1)
    const [bag, setBag] = useState({})
    const [userId, setUserId] = useState('')

    const router = useRouter()
    const { rest_id } = router.query
    useEffect(() => {
        if (!session) {
            router.push('/')
        }
        else {
            getUserID()
            loadusers();
        }

    }, [])
    const getUserID = async () => {
        await axios.post("/api/userId", { email: session.user.email }).then((res) => {
            setUserId(res.data._id);
        });
    }
    const loadusers = async (e) => {

        await axios.post("/api/menu", { id: rest_id }).then((res) => {
            setMenu(res.data.menu)
            setRestro(res.data);
        });
    }
    const minus = () => {
        if (quantity !== 1) {
            setQuantity(quantity - 1);
        }
    }
    const plus = () => {
        setQuantity(quantity + 1);
    }
    const addToBag = async (item, e) => {
        e.preventDefault();
        await axios.post("/api/bag", { order_details: [{ restro_name: restro.name, food_name: item.food_name, price: item.price, picture: item.image, quantity: quantity }], ordered_by: userId }).then((res) => {
            toast.success('Added to bag')
        });

    }
    if (session) {
        return (
            <>


                <div className='container mt-4'>
                    <h1>{restro.name} Menu</h1>
                    {/* {menu.map((element, index) => {
                        return <>
                            <div className='container  mt-5' key={index}>
                                <div className='row border'>
                                    <div className='col-md-4  d-flex justify-content-start p-0'>
                                        <div className="card border-0 ">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <img src={element.image} className="card-img-top img-fluid rounded-start"  alt="..." />
                                                </div>
                                                <div className="col-md-6  d-flex align-items-center">
                                                    <div className="card-body ">
                                                        <h5 className="">{element.food_name}</h5>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-md-4  d-flex justify-content-center'>
                                        <div className=' fw-bold d-flex  align-items-center' >
                                            <button className='btn btn-danger me-2' onClick={minus}>-</button>
                                            <div>x {quantity}</div>
                                            <button className='btn btn-success ms-2' onClick={plus}>+</button>
                                        </div>
                                    </div>
                                    <div className='col-md-4  d-flex justify-content-end p-0'>
                                        <div className='text-success fw-bold d-flex  align-items-center me-3'>
                                            <span className='me-2'>₹</span>{element.price}
    
                                        </div>
                                        <div className='bg-success d-flex align-items-center' onClick={(e)=>addToBag(element,e)} style={{cursor:'pointer'}}><i className="fa-solid fa-chevron-right p-3 text-white "></i></div>
                                        
                                    </div>
                                </div>
    
    
    
                            </div>
                        </>
                    })} */}



       {menu.map((element, index) => {
                        return <>
                            <div className='container  mt-5' key={index}>
                                <div className='row border'>
                                    <div className='col-md-4  d-flex justify-content-start p-0'>
                                        <div className="card border-0 ">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <img src={element.image} className=" img-fluid rounded-start"  alt="..." />
                                                </div>
                                                <div className="col-md-6  d-flex align-items-center">
                                                    <div className="card-body ">
                                                        <h5 className="">{element.food_name}</h5>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-md-4  d-flex justify-content-center'>
                                        <div className=' fw-bold d-flex  align-items-center' >
                                            <button className='btn btn-danger me-2' onClick={minus}>-</button>
                                            <div>x {quantity}</div>
                                            <button className='btn btn-success ms-2' onClick={plus}>+</button>
                                        </div>
                                    </div>
                                    <div className='col-md-4  d-flex justify-content-end p-0'>
                                        <div className='text-success fw-bold d-flex  align-items-center me-3'>
                                            <span className='me-2'>₹</span>{element.price}
    
                                        </div>
                                        <div className='bg-success d-flex align-items-center' onClick={(e)=>addToBag(element,e)} style={{cursor:'pointer'}}><i className="fa-solid fa-chevron-right p-3 text-white "></i></div>
                                        
                                    </div>
                                </div>
    
    
    
                            </div>
                        </>
                    })}



                </div>
                <ToastContainer theme="colored" />
            </>
        )
    }

}
