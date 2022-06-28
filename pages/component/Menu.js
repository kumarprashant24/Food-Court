import React, { useEffect, useState } from 'react'
import { useRouter } from "next/router";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useDispatch } from 'react-redux'
import { increase,chekLogin } from '../../redux/action'

export default function Menu({ providers, session }) {
    const [menu, setMenu] = useState([])
    const [restro, setRestro] = useState({})
    const dispatch = useDispatch();

    const router = useRouter()
    const { rest_id } = router.query
    useEffect(() => {
        if (!session) {
            router.push('/')
        }
        else {
            dispatch(chekLogin(session));
            loadusers();
        }

    }, [])

    const loadusers = async (e) => {

        await axios.post("/api/menu", { id: rest_id }).then((res) => {
            setMenu(res.data.menu)
            setRestro(res.data);
        });
    }
    const minus = (e,index) => {
        const quantity = document.getElementById(index);
        if (parseInt(quantity.innerText) !== 1) {
            quantity.innerHTML =  parseInt(quantity.innerText)-1;
        }
    }
    const plus = (e,index) => {

        const quantity = document.getElementById(index);
   
        quantity.innerHTML =  parseInt(quantity.innerText)+1;
   
    }
    const addToBag = async (item, e,index) => {
        e.preventDefault();
        const quantity = document.getElementById(index).innerText;

        await axios.post("/api/bag", { order_details: [{ restro_name: restro.name, food_name: item.food_name, price: item.price, picture: item.image, quantity: quantity }], ordered_by: session.user._id }).then((res) => {
            toast.success('Added to bag')
            dispatch(increase(session));
        });


    }
    if (session) {
        return (
            <>
                <div className='container mt-4'>
                    <h1>{restro.name} Menu</h1>
                    {menu.map((element, index) => {
                        return <>
                            <div className='container  mt-5' key={index}>
                                <div className='row border'>
                                    <div className='col-md-4  d-flex justify-content-start p-0'>
                                        <div className="card border-0 ">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <img src={element.image} className=" img-fluid rounded-start" alt="..." />
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
                                            <button className='btn btn-danger me-2' onClick={(e)=>minus(e,index)}>-</button>
                                            <div>x <span id={index}>1</span></div>
                                            <button className='btn btn-success ms-2' onClick={(e)=>{plus(e,index)}}>+</button>
                                        </div>
                                    </div>
                                    <div className='col-md-4  d-flex justify-content-end p-0'>
                                        <div className='text-success fw-bold d-flex  align-items-center me-3'>
                                            <span className='me-2'>₹</span>{element.price}

                                        </div>
                                        <div className='bg-success d-flex align-items-center' onClick={(e) => addToBag(element, e,index)} style={{ cursor: 'pointer' }}><i className="fa-solid fa-chevron-right p-3 text-white "></i></div>

                                    </div>
                                </div>



                            </div>
                        </>
                    })}



                </div>
<ToastContainer theme="colored"/>
           
            </>
        )
    }

}
