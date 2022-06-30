import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useRouter } from "next/router";
import Dashboard from './Dashboard';
import { useDispatch } from 'react-redux'
import { chekLogin, decrease } from '../../redux/action/index'
import Link from 'next/link';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from './Loader';

export default function Cart({ session }) {
    const dispatch = useDispatch();
    const [items, setItems] = useState([]);
    const itemName = []
    const [loading, setLoading] = useState(false)
    const [uploaded, setUploaded] = useState(null)


    let grandTotal = 0;
    const router = useRouter()
    const { uid } = router.query;
    const [refresh, setRefresh] = useState(true);
    const toggleRefresh = () => setRefresh((p) => !p);

    useEffect(() => {

        loadusers();

    }, [refresh])

    useEffect(() => {
        dispatch(chekLogin(session));
    }, [])

    const loadusers = async (e) => {
        if (session === null || session.cart === undefined) {

        }
        else {
            setLoading(true)

            await axios.post("/api/showCartItems", { id: uid }, {
                onUploadProgress: (data) => {
                    setUploaded(Math.round((data.loaded / data.total) * 100));
                }
            }).then((res) => {
                setItems(res.data.order_details);
                setLoading(false)
                setUploaded(null)
            });
        }


    }
    const removeItem = async (indexItem, elementId) => {
        setLoading(true)
        await axios.post("/api/removeItem", { elementId: elementId, uid: uid },{
            onUploadProgress: (data) => {
                setUploaded(Math.round((data.loaded / data.total) * 100));
            }
        }).then((res) => {

            if (res.data.message === 'success') {
                setLoading(false)
                setUploaded(null)
                dispatch(decrease(session));
                toggleRefresh();
            }

        });

    }
    const placeOrder = async () => {
        setLoading(true)

        await axios.post("/api/placeOrder", { items: itemName, grand_total: grandTotal.toString(), status: "On The Way", userId: session.user._id },{
            onUploadProgress: (data) => {
                setUploaded(Math.round((data.loaded / data.total) * 100));
            }
        }).then((res) => {
            setLoading(false)
            setUploaded(null)
            toast.success('Order has been placed')
        });
    }
    if (!session) {
        return (
            <Dashboard></Dashboard>
        )
    }
    else {
        return (
            <>
                {/* {loading ? <Loader value={uploaded} max={100} /> : ""} */}
                {uploaded && (<Loader value={uploaded} max={100} />)}

                <div className='container-fluid'>
                    <div className='row mt-4'>

                        <div className='col-md-6 scroll border-end'>
                            <h3 className='mt-4 text-black-50'>Your Order Details</h3>
                            {items.map((element, index) => {
                                return <>
                                    <div className='blog-post shadow-lg mb-3 bg-body rounded mt-4' key={index}>
                                        <div className='blog-post_img'>
                                            <img src={element.picture} />
                                        </div>
                                        <div className="">
                                            <h5 className="card-title">{element.food_name}</h5>
                                            <p className="card-text d-flex">Price: <div className='d-flex ms-2 text-success fw-bold'><div>₹</div><div>{element.price}</div></div></p>
                                            <p className="card-text">Quantity: <span>{element.quantity}</span></p>
                                            <p className="card-text">Ordered From: <span>{element.restro_name} </span></p>

                                        </div>
                                    </div>
                                </>

                            })}


                        </div>
                        <div className='col-md-6 scroll'>
                            <h3 className='mt-4 text-black-50'>Your Order Summary</h3>
                            <hr />
                            <div className='d-flex justify-content-between mt-3 container'>
                                <div className='fw-bold'>Items</div>
                                <div className='fw-bold me-4'>Price</div>
                            </div>
                            {items.map((element, index) => {
                                itemName.push(element.food_name)
                                grandTotal += parseInt(element.price) * parseInt(element.quantity);
                                return <>
                                    <div className='d-flex justify-content-between mt-4 container' key={index}>
                                        <div className='partition text-muted'><div>{element.food_name}</div></div>
                                        <div className='partition-mid text-center text-black-50'><div className='food-quantity'>1 x {element.quantity}</div></div>
                                        <div className='d-flex align-items-center justify-content-end partition '>
                                            <div className='text-success fw-bold'><span className='me-2'>₹</span>{element.price * element.quantity}</div>
                                            <div onClick={() => removeItem(index, element._id)} >
                                                <i className="fa-solid fa-xmark ms-3 text-white d-flex justify-content-center align-items-center  bg-danger cross" ></i>
                                            </div>
                                        </div>

                                    </div>
                                </>

                            })}
                            <div className='d-flex justify-content-between mt-3 border-bottom border-top p-4'>
                                <div className='fw-bold'>Grand Total</div>
                                <div className='fw-bold me-4'><span className='me-2'>₹</span>{grandTotal}</div>
                            </div>
                            <div className="d-grid gap-2 mt-4">
                                <button className="btn btn-warning" type="button" onClick={() => placeOrder()}>Place Order</button>
                                <Link href={`/component/PlacedOrder?uid=${session.user._id}`}>
                                    <button className="btn btn-danger" type="button">View Placed Order</button>
                                </Link>
                            </div>
                        </div>
                    </div>

                </div>
                <ToastContainer theme="colored" />

            </>

        )
    }

}
