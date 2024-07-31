import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { BiArrowBack } from "react-icons/bi";
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { UserReducerInitialState } from '../types/reducer-types';


const Blood = () => {
    const initialContactInfo = { name: '', gender: '', email: '', blood: '', contact: '', quantity: 0 };
    const [requestInfo, setRequestInfo] = useState(initialContactInfo);

    const {user} = useSelector((state:{userReducer: UserReducerInitialState})=> state.userReducer);

    const navigate= useNavigate();

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setRequestInfo({ ...requestInfo, [name]: value });
    };

    const submitHandler = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try{
            const res = await axios.post(`${import.meta.env.VITE_SERVER}/api/v1/request/blood?_id=${user?._id}`,{
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

    

    return (
        <div className="shipping">
            <button>
                <BiArrowBack className="back-btn" onClick={()=>navigate('/')}/>
            </button>

            <div className="fill-form">

            <form onSubmit={(e)=>submitHandler(e)}>
            <h1>Fill your Blood Requirement</h1>

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

            <select 
                name="blood" 
                required 
                value={requestInfo.blood}
                onChange={changeHandler} 
            >
                <option value="">Choose Blood Group</option>
                <option value="apos">A positive</option>
                <option value="aneg">A negative</option>
                <option value="abpos">AB positive</option>
                <option value="abneg">AB negative</option>
                <option value="opos">o positive</option>
                <option value="oneg">o negative</option>
                <option value="bpos">B positive</option>
                <option value="bneg">B negative</option>
            </select>

            <input 
                required
                type="number" 
                placeholder="Units of Blood" 
                name="quantity" 
                value={requestInfo.quantity}
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
                Send Request
            </button>
        </form>

        </div>

        </div>
    );
};

export default Blood;