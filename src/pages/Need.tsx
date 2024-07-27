import React, { useState } from 'react';
 import { useNavigate } from "react-router-dom";
 import { BiArrowBack } from "react-icons/bi";


const Need = () => {
    const initialContactInfo = { name: '', gender: '', email: '', location: '', contact: '', description: '' };
    const [requestInfo, setRequestInfo] = useState(initialContactInfo);

    const navigate= useNavigate();

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setRequestInfo({ ...requestInfo, [name]: value });
    };

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Form Submitted:', requestInfo);
        // Handle form submission logic here
    };

    

    return (
        <div className="shipping">
            <button>
                <BiArrowBack className="back-btn" onClick={()=>navigate('/')}/>
            </button>

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
            name="location" 
            value={requestInfo.location}
            onChange={changeHandler}
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
    );
};

export default Need;