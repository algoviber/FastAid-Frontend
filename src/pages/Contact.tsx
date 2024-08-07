


import React, { useEffect, useState } from 'react';
 import { useNavigate } from "react-router-dom";
 import { BiArrowBack } from "react-icons/bi";
import axios from 'axios';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { UserReducerInitialState } from '../types/reducer-types';


const Contact = () => {
    const initialContactInfo = { name: '', gender: '', email: '', blood: '' };
    const [contactInfo, setContactInfo] = useState(initialContactInfo);
    const [currentForm, setCurrentForm] = useState(0);
    

    const {user} = useSelector((state:{userReducer: UserReducerInitialState})=> state.userReducer);

    const [friends, setFriends] = useState([]);

    useEffect(() => {
        const fetchFriends = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_SERVER}/api/v1/register/friends/my?_id=${user?._id}`);
                const data = response.data;
                setFriends(data.friends);
            } catch (error) {
                console.error('Error fetching friends:', error);
            }
        };

        fetchFriends();
    }, [user]);

    const size = 5-friends.length;

    const [allFormsData, setAllFormsData] = useState(Array(size > 0 ? size : 0).fill(initialContactInfo));
    

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
        try {
            const res = await axios.post(`${import.meta.env.VITE_SERVER}/api/v1/register/friend/new?_id=${user?._id}`, {allFormsData});
        
            if (res.data) {
                toast.success("Thanks for Registering!");
            } else {
                toast.error("An error occurred.");
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                toast.error(error.response.data?.message || "An unexpected error occurred.");
            } else {
                toast.error("An unexpected error occurred.");
            }
        }
        console.log('Form Submitted:', contactInfo);
    };

    const nextForm = () => {
        setCurrentForm((prevForm) => (prevForm + 1) % forms.length);
    };

    const previousForm = () => {
        setCurrentForm((prevForm) => (prevForm - 1 + forms.length) % forms.length);
    };

    const forms = Array(size > 0 ? size : 0).fill(initialContactInfo).map((_, index) => (
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

            {index==size-1 && 

            <button type="submit">
                Add Contacts
            </button>
            }
        </form>
    ));

    

    return (
        <div className="shipping">
            {friends.length>0 &&
            <h1>
                {friends.length} Contacts Added Already!!
            </h1>
            }
            
            {friends.length>0 && size>0 && 
            <h2>Add More Below</h2>
            }
            <button>
                <BiArrowBack className="back-btn" onClick={()=>navigate('/')}/>
            </button>
            <div className="fill-form">
                {currentForm>0 &&
                <button onClick={previousForm} className="arrow-button">←</button>
                }

                {forms[currentForm]}

                {currentForm<size-1 && 
                <button onClick={nextForm} className="arrow-button">→</button>
                }
            </div>
        </div>
    );
};

export default Contact;
