import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Spinner from './Spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function UploadContainer({user}) {

    const [restroPic, setRestroPic] = useState('')
    const [dishPic, setDishPic] = useState('')
    const [refresh,setRefresh] = useState(false)
    const [restaurant, setRestaurant] = useState([]);
    const [loading, setLoading] = useState(false)
    const [loading1, setLoading1] = useState(false)
    const [inputs,setInputs] = useState({
        restro_name:"",
    });
    const toggleRefresh = () => setRefresh((p) => !p);


    useEffect(() => {
        if (!user) {
            router.push('/')
        }
        else {
            loadusers()
        }
    }, [refresh])
    const loadusers = async () => {
        await axios.get("/api/resturant").then((res) => {
            setRestaurant(res.data)
            toggleRefresh();
        });
    }
    const OnInputChange = e=>{
        setInputs({...inputs,[e.target.name]:e.target.value});
      
     };
    const inputpic = async (e) => {
        setLoading(true);
        const file = e.target.files[0];
        const fd = new FormData();
        fd.append('file', file);
        fd.append('upload_preset', 'ml_default');
        fd.append('cloud_name', 'buzzz-social-app');
        const result = await axios.post('https://api.cloudinary.com/v1_1/buzzz-social-app/image/upload', fd);
        setLoading(false);
        setRestroPic(result.data.secure_url);
    };
    const inputpic1 = async (e) => {
        setLoading1(true);
        const file = e.target.files[0];
        const fd = new FormData();
        fd.append('file', file);
        fd.append('upload_preset', 'ml_default');
        fd.append('cloud_name', 'buzzz-social-app');
        const result = await axios.post('https://api.cloudinary.com/v1_1/buzzz-social-app/image/upload', fd);
        setLoading1(false);
        setDishPic(result.data.secure_url);
    };
    const addRestaurant = async()=>{
        await axios.post("/api/addRestaurant", { name: inputs.restro_name,menu:[],picture:restroPic }).then((res) => {
         toast.success("Restaurant Added")
        });
    }
    return (
        
        <>
        <div className='row'>
        <div className='container col-sm-5 border mt-5 rounded'>
                <div className="col-sm-12 mt-5 py-3">
                    <div className='d-flex border-bottom'>
                        <i className="fa-solid fa-utensils d-flex align-items-center"></i>
                        <input type="text" className="form-control border-0" name='restro_name' onChange={(e)=>OnInputChange(e)} value={inputs.restro_name} placeholder='Restaurant Name' />
                    </div>
                    <div className='d-flex border-bottom mt-2'>
                        <i className="fa-solid fa-file-prescription d-flex align-items-center"></i>
                        <input type="text" className="form-control border-0 " placeholder='Discription'  />
                    </div>

                    <div className='mt-2 border rounded mb-2 d-flex justify-content-center align-items-center' style={{ height: '300px', width: '100%' }}>
                        {loading ? <Spinner /> :
                            restroPic === '' ?
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
                                : <img src={restroPic} style={{ width: '100%', height: '100%' }} />
                        }


                    </div>
                    <div className='d-flex border-bottom mb-2' >
                        <i className="fa-solid fa-building  d-flex align-items-center"></i>
                        <input type="text" className="form-control border-0 "  placeholder='City Name' />
                    </div>

                    <div className="d-grid gap-2 mb-2">
                        <button className="btn btn-success" type="button" onClick={addRestaurant}>Add Restaurant</button>
                    </div>

                </div>

            </div>



            <div className='container col-sm-5 border mt-5 rounded'>
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
                            {loading1 ? <Spinner /> :
                                dishPic === '' ?
                                    <div className='d-flex flex-column'>
                                        <div className='d-flex justify-content-center'>
                                            <input
                                                type="file"
                                                className="picture"
                                                onChange={(e) => inputpic1(e)}
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
      
            <ToastContainer theme="colored" />

        </>
    )
}
