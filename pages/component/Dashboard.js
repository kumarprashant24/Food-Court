import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Link from 'next/link'
import { useRouter } from 'next/router'
import Loader from './Loader';



export default function Dashboard({ user, setProgress }) {
    const router = useRouter()

    const [restaurant, setRestaurant] = useState([]);

    useEffect(() => {
        if (!user) {
            router.push('/')
        }
        else {
            loadusers();
        }
    }, [])
    const loadusers = async () => {
        await axios.post("/api/resturant", {}, {
            onUploadProgress: (data) => {
                setProgress(Math.round((data.loaded / data.total) * 100));
            }
        }).then((res) => {
            setRestaurant(res.data)

        });
    }

    if (user) {
        return (
            <>

                <div className='container'>
                    <h1 className='mt-5 text-black-50'>Order food online with Food Court</h1>
                    <hr />
                    <div className="row">

                        {restaurant.map((element, index) => {
                            return (
                                <div className="col-md-6 py-3" key={index}>
                                    <Link href={`/component/Menu?rest_id=${element._id}`}>
                                        <a>
                                            <div className="card">
                                                <div className='row'>
                                                    <div className='col'>
                                                        <img src={element.picture} className="card-img-top" alt="..." />
                                                    </div>
                                                </div>
                                                <div className="card-body">
                                                    <h5 className="card-title">{element.name}</h5>

                                                    <p className="card-text">Biryani, Chinese, Continental, Fast Food, Healthy Food, Mughlai
                                                        Patna Locality, Patna.</p>
                                                </div>
                                            </div>
                                        </a>
                                    </Link>

                                </div>
                            )
                        })}
                    </div>
                </div>
            </>
        )
    }

}
