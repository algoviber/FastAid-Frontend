import React, { useState } from 'react';
 import { useNavigate } from "react-router-dom";
 import { BiArrowBack } from "react-icons/bi";
import axios from 'axios';
import { useSelector } from 'react-redux';
import { UserReducerInitialState } from '../types/reducer-types';


const Donor = () => {
    const initialContactInfo = { name: '', gender: '', email: '', blood: '' };
    const [contactInfo, setContactInfo] = useState(initialContactInfo);
    const [currentForm, setCurrentForm] = useState(0);
    const [allFormsData, setAllFormsData] = useState(Array(3).fill(initialContactInfo));

  const {user} = useSelector((state:{userReducer: UserReducerInitialState})=> state.userReducer);


    const navigate= useNavigate();

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setContactInfo({ ...contactInfo, [name]: value });
        const updatedFormsData = [...allFormsData];
        updatedFormsData[currentForm] = { ...updatedFormsData[currentForm], [name]: value };
        setAllFormsData(updatedFormsData);
    };

    const submitHandler = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(typeof allFormsData);
        await axios.post(`${import.meta.env.VITE_SERVER}/api/v1/register/donor/new?id=${user?._id}`,{
            allFormsData
        });
        console.log('Form Submitted:', contactInfo);
        // Handle form submission logic here
    };

    const nextForm = () => {
        setCurrentForm((prevForm) => (prevForm + 1) % forms.length);
    };

    const previousForm = () => {
        setCurrentForm((prevForm) => (prevForm - 1 + forms.length) % forms.length);
    };

    const forms = Array(3).fill(initialContactInfo).map((_, index) => (
        <form key={index} onSubmit={(e)=>submitHandler(e)}>
            <h1>Blood Donor {index+1}</h1>

            {index>0 &&
                <h2>(Optional)</h2>
            }

            <input 
                required
                type="text" 
                placeholder="Name" 
                name="name" 
                value={contactInfo.name}
                onChange={changeHandler}
            />

            <select 
                name="gender" 
                required 
                value={contactInfo.gender}
                onChange={changeHandler} 
            >
                <option value="">Choose Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
            </select>

            <select 
                name="blood" 
                required 
                value={contactInfo.blood}
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
                type="email" 
                placeholder="Email ID" 
                name="email" 
                value={contactInfo.email}
                onChange={changeHandler}
            />

            {index==2 && 

            <button type="submit">
                Add Donors
            </button>
            }
        </form>
    ));

    

    return (
        <div className="shipping">
            <button>
                <BiArrowBack className="back-btn" onClick={()=>navigate('/')}/>
            </button>
            {currentForm>0 &&
            <button onClick={previousForm} className="arrow-button">←</button>
            }

            {forms[currentForm]}

            {currentForm<2 && 
            <button onClick={nextForm} className="arrow-button">→</button>
            }
        </div>
    );
};

export default Donor;