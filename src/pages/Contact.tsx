


import React, { useState } from 'react';
 import { useNavigate } from "react-router-dom";
 import { BiArrowBack } from "react-icons/bi";


const Contact = () => {
    const initialContactInfo = { name: '', gender: '', email: '' };
    const [contactInfo, setContactInfo] = useState(initialContactInfo);
    const [currentForm, setCurrentForm] = useState(0);

    const navigate= useNavigate();

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setContactInfo({ ...contactInfo, [name]: value });
    };

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Form Submitted:', contactInfo);
        // Handle form submission logic here
    };

    const nextForm = () => {
        setCurrentForm((prevForm) => (prevForm + 1) % forms.length);
    };

    const previousForm = () => {
        setCurrentForm((prevForm) => (prevForm - 1 + forms.length) % forms.length);
    };

    const forms = Array(5).fill(initialContactInfo).map((_, index) => (
        <form key={index} onSubmit={(e)=>submitHandler(e)}>
            <h1>Emergency Contact {index+1}</h1>

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

            <input 
                required
                type="email" 
                placeholder="Email ID" 
                name="email" 
                value={contactInfo.email}
                onChange={changeHandler}
            />

            {index==4 && 

            <button type="submit">
                Add Contacts
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

            {currentForm<4 && 
            <button onClick={nextForm} className="arrow-button">→</button>
            }
        </div>
    );
};

export default Contact;
