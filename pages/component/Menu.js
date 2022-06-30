import React, { useEffect, useState } from 'react'
import { useRouter } from "next/router";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux'
import { increase, chekLogin } from '../../redux/action'
import Loader from './Loader';




export default function Menu({ providers, session }) {
    const [menu, setMenu] = useState([])
    const [restro, setRestro] = useState({})
    const dispatch = useDispatch();
    const[loading,setLoading] = useState(false)

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
    const minus = (e, index) => {
        const quantity = document.getElementById(index);
        if (parseInt(quantity.innerText) !== 1) {
            quantity.innerHTML = parseInt(quantity.innerText) - 1;
        }
    }
    const plus = (e, index) => {

        const quantity = document.getElementById(index);

        quantity.innerHTML = parseInt(quantity.innerText) + 1;

    }
    const addToBag = async (item, e, index) => {
        e.preventDefault();
        setLoading(true)
        const quantity = document.getElementById(index).innerText;

        await axios.post("/api/bag", { order_details: [{ restro_name: restro.name, food_name: item.food_name, price: item.price, picture: item.image, quantity: quantity }], ordered_by: session.user._id }).then((res) => {
            toast.success('Added to bag')
            setLoading(false)
            dispatch(increase(session));
        });
    }
    if (session) {
        return (
            <>
            {loading?  <Loader/>:""}
                <div className='container mt-4'>
                <h1 className='text-black-50'>{restro.name} Menu</h1>
                <hr/>
                    <div className='row gy-4'>
                        {menu.map((element, index) => {
                            return <>
                                <div className='col-md-4 ' key={index}>
                                    <div className="card shadow-lg p-2 border-0 mb-5 bg-body rounded" >
                                        <img src={element.image} className="card-img-top" alt="..." />
                                        <div className="card-body p-0">
                                            <h5 className="card-title p-2">{element.food_name}</h5>
                                            <div className=' d-flex justify-content-center'>
                                                <div className=' fw-bold d-flex  align-items-center mt-2' >
                                                    <button className='btn btn-danger me-2' onClick={(e) => minus(e, index)}>-</button>
                                                    <div>x <span id={index}>1</span></div>
                                                    <button className='btn btn-success ms-2' onClick={(e) => { plus(e, index) }}>+</button>
                                                </div>
                                            </div>
                                            <div className=" rounded-0 mt-4">
                                                <button className="btn btn-success rounded-0 w-100" type="button" onClick={(e) => addToBag(element, e, index)}>Add To Bag</button>
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </>
                        })}

                    </div>
                </div>


                <ToastContainer theme="colored" />

            </>
        )
    }

}
