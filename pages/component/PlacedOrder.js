import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useRouter } from "next/router";
import Dashboard from './Dashboard';
import { chekLogin } from '../../redux/action/index'
import { useDispatch } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from './Loader';

export default function PlacedOrder({ session, setProgress }) {
    const dispatch = useDispatch();
    const [placed, setPlaced] = useState([])
    const router = useRouter()
    const [refresh, setRefresh] = useState(true);
    const { uid } = router.query;
    const toggleRefresh = () => setRefresh((p) => !p);
    useEffect(() => {
        if (!session) {
            router.push('/')
        }
        else {
            loadData()
        }

    }, [refresh])
    useEffect(() => {
        dispatch(chekLogin(session));
    }, [])
    const loadData = async () => {
        if (session.cart === undefined) {

        }
        else {
            await axios.post("/api/getPlacedItem", { userId: uid }, {
                onUploadProgress: (data) => {
                    setProgress(Math.round((data.loaded / data.total) * 100));
                }
            }).then((res) => {
                setPlaced(res.data.order_placed)
            });
        }

    }

    const cancelOrder = async (order) => {
        await axios.post("/api/cancelOrder", { userId: session.user._id, orderId: order._id }, {
            onUploadProgress: (data) => {
                setProgress(Math.round((data.loaded / data.total) * 100));
            }
        }).then((res) => {
            toggleRefresh();
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

                <div className='container mt-4'>
                    <h1>Placed Order Details</h1>
                    <hr />

                    <div className='row gy-4'>
                        {placed.map((element, index) => {
                            return (
                                <div className='col-md-4' key={index}>
                                    <div className="card">
                                        <div className="card-body">
                                            <h5 className="card-title">Food Items</h5>
                                            <hr />
                                            <div className='food_items'>
                                                {element.items.map((e, i) => {

                                                    return <>
                                                        <div className='d-flex p-1'>
                                                            <div className='text-muted'>{i + 1}.&nbsp; </div>
                                                            <div className="text-muted" key={i}>{e}</div>

                                                        </div>
                                                    </>

                                                })}
                                            </div>

                                            <div className='d-flex justify-content-between mt-3'>
                                                <div className='fw-bold'>Grand Total :</div>
                                                <div className='fw-bold text-success'>???{element.grand_total}</div>

                                            </div>
                                            <div className='d-flex justify-content-between mt-3'>
                                                <div className='fw-bold'>Status</div>
                                                <div className='fw-bold text-success'>{element.status}</div>

                                            </div>
                                            <div className="d-grid gap-2 mt-4">
                                                <button className="btn btn-danger" type="button" onClick={() => cancelOrder(element)}>Cancel Order</button>
                                            </div>
                                        </div>

                                    </div>

                                </div>
                            )
                        })}

                    </div>
                </div>
                {/* <ToastContainer theme="colored" /> */}

            </>
        )
    }

}

