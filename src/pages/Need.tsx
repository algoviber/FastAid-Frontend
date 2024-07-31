import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import useGeolocation from "react-hook-geolocation";
import { BiArrowBack } from "react-icons/bi";
import axios from 'axios';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { UserReducerInitialState } from '../types/reducer-types';


const Need = () => {
    const initialContactInfo = { name: '', gender: '', email: '', location:{lati: '',longi:'',address: ''}, contact: '', description: '' };
    const [requestInfo, setRequestInfo] = useState(initialContactInfo);
    const [address,setAddress] = useState("");

    const {user} = useSelector((state:{userReducer: UserReducerInitialState})=> state.userReducer);

    const navigate= useNavigate();

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setRequestInfo({ ...requestInfo, [name]: value });
    };

    const submitHandler = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try{
        const res = await axios.post(`${import.meta.env.VITE_SERVER}/api/v1/request/help?_id=${user?._id}`,{
            requestInfo
        });

        if("data" in res){
            toast.success("Request Sent Successfull");
        }
        console.log('Form Submitted:', requestInfo);
        }
        catch(error){
            toast.error("Something Went Wrong");
        }
        // Handle form submission logic here
    };

    const geolocation = useGeolocation();


  const locationGetter=async (e: React.MouseEvent<HTMLInputElement, MouseEvent>)=>{
    e.preventDefault();

    if(!geolocation.error){
    const lat = geolocation.latitude;
    const long = geolocation.longitude;

    const API_KEY = import.meta.env.VITE_GEOCODER_API_KEY;

    const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}%2C${long}&key=${API_KEY}`;
    const res = await axios.get(url);
    
    if (res.status === 200) {
       const locaddress = res.data.results[0].formatted;
       console.log(locaddress);
       setAddress(locaddress);
       setRequestInfo({ ...requestInfo, location: {lati:String(lat), longi:String(long), address:locaddress} });
    } else {
      console.error('Geocoder failed due to:', res.data.status);
    }

  }
    else{
      toast.error(geolocation.error.message);
    }

    
  }
    

    return (
        <div className="shipping">
            <button>
                <BiArrowBack className="back-btn" onClick={()=>navigate('/')}/>
            </button>

            <div className="fill-form">
            <form onSubmit={(e)=>submitHandler(e)}>
            <h1>Fill your Requirement</h1>

            <input 
                required
                type="text" 
                placeholder="Name" 
                name="name" 
                value={requestInfo.name}
                onChange={changeHandler}
            />

            <select 
                name="gender" 
                required 
                value={requestInfo.gender}
                onChange={changeHandler} 
            >
                <option value="">Choose Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
            </select>

            <input 
            required
            type="text" 
            placeholder="Location" 
            name="address" 
            value={address}
            onChange={(e)=>setAddress(e.target.value)}
            onClick={locationGetter}
            />

            <input 
                required
                type="text" 
                placeholder="Help Description" 
                name="description" 
                value={requestInfo.description}
                onChange={changeHandler}
            />

            <input 
                required
                type="email" 
                placeholder="Email ID" 
                name="email" 
                value={requestInfo.email}
                onChange={changeHandler}
            />

            <input 
                required
                type="tel" 
                placeholder="Contact Number" 
                name="contact" 
                value={requestInfo.contact}
                onChange={changeHandler}
            />

            

            <button type="submit">
                Request Helper
            </button>
        </form>
        </div>
        </div>
    );
};

export default Need;