import React, { useEffect, useState } from 'react'
import Spinner from './Spinner';
import axios from 'axios';
import { useRouter } from 'next/router'

export default function MenuContainer({ user }) {
    const router = useRouter()
    const [restaurant, setRestaurant] = useState([]);
    const [dishPic, setDishPic] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (!user) {
            router.push('/')
        }
        else {
            loadusers()
        }
    }, [])
    const loadusers = async () => {
        await axios.get("/api/resturant").then((res) => {
            setRestaurant(res.data)
        });

    }
    const inputpic = async (e) => {
        setLoading(true);
        const file = e.target.files[0];
        const fd = new FormData();
        fd.append('file', file);
        fd.append('upload_preset', 'ml_default');
        fd.append('cloud_name', 'buzzz-social-app');
        const result = await axios.post('https://api.cloudinary.com/v1_1/buzzz-social-app/image/upload', fd);
        setLoading(false);
        setDishPic(result.data.secure_url);
    };

    if (user.email === 'uic.20mca1328@gmail.com') {
        return (
            <div>
                <div className='container col-sm-12 border mt-5 rounded'>
                    <div className="col-sm-12 mt-5">
                        <select className="form-select" aria-label="Default select example">
                            <option selected>Select Restaurant</option>
                            {restaurant.map((element, index) => {
                                return (
                                    <>
                                        <option value={element.name}>{element.name}</option>
                                    </>
                                )
                            })}

                        </select>

                        <div className='d-flex border-bottom mt-2'>
                            <i className="fa-solid fa-burger d-flex align-items-center"></i>
                            <input type="text" className="form-control border-0 " placeholder='Dish Name' />
                        </div>

                        <div className='mt-2 border rounded mb-2 d-flex justify-content-center align-items-center' style={{ height: '300px', width: '100%' }}>
                            {loading ? <Spinner /> :
                                dishPic === '' ?
                                    <div className='d-flex flex-column'>
                                        <div className='d-flex justify-content-center'>
                                            <input
                                                type="file"
                                                className="picture"
                                                onChange={(e) => inputpic(e)}
                                            />
                                        </div>

                                        <div className='text-center text-black-50'>Click here to Upload</div>
                                    </div>
                                    : <img src={dishPic} style={{ width: '100%', height: '100%' }} />
                            }


                        </div>
                        <div className='d-flex border-bottom mb-2' >
                            <i className="fa-solid fa-indian-rupee-sign  d-flex align-items-center"></i>
                            <input type="text" className="form-control border-0 " placeholder='Enter Price' />
                        </div>
                        <div className="d-grid gap-2 mb-2">
                            <button className="btn btn-success" type="button">Add Item</button>
                        </div>

                    </div>

                </div>
            </div>
        )
    }

}
