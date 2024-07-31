import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useState } from "react"
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { auth } from "../firebase";
import { getUser, useLoginMutation } from "../redux/api/userAPI";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { MessageResponse } from "../types/api-types";
import { useDispatch } from "react-redux";
import { userExist, userNotExist } from "../redux/reducer/userReducer";
import axios from "axios";


const Login = () => {

    const [gender,setGender] = useState("");
    const [phone,setPhone] = useState("");
    const [otp,setOtp] = useState("");
    const [date,setDate] = useState("");

    const [login] = useLoginMutation();

    const dispatch = useDispatch();

    const sendOtp = async (phone: string) => {
        const res = await axios.post(`${import.meta.env.VITE_SERVER}/api/v1/otp/send`,{
            phone
        });

        console.log(res);
    };


    const loginHandler = async() =>{
        try{
            const provider = new GoogleAuthProvider();
            const {user} = await signInWithPopup(auth,provider);

            const res = await login({
                name: user.displayName!,
                email: user.email!,
                photo: user.photoURL!,
                phone,
                gender,
                role: "user",
                dob: date,
                _id: user.uid,
            });

            if("data" in res){
                toast.success(res.data.message);
                const data = await getUser(user.uid);
                dispatch(userExist(data.user));
            }else{
                const error = res.error as FetchBaseQueryError;
                const message = (error.data as MessageResponse).message;
                toast.error(message);
                dispatch(userNotExist());
            }
            
        } catch(error){
            toast.error("Sign In Failed!!");
        }
    }

  return (
    <div className="login">
        <h1 className="heading">Login</h1>
        <main>
            

            <div>
                <label>Gender</label>
                <select 
                value={gender}
                onChange={(e)=> setGender(e.target.value)}>
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
            </div>

            <div>
                <label>Date of Birth</label>
                <input type="date" value={date} onChange={e=>setDate(e.target.value)} />
            </div>

            <div>
                <label>Mobile No.</label>
                <input type="tel" value={phone} onChange={e=>setPhone(e.target.value)} />
                <button onClick={()=>sendOtp(phone)} className="otp">
                <span>Send OTP</span>
                </button>
                
                <label>One Time Password(OTP)</label>
                <input type="text" value={otp} onChange={e=>setOtp(e.target.value)} />
            </div>

            <div>
                <p>Already Signed In Once</p>
                <button onClick={loginHandler}>
                    <FcGoogle /> <span>Sign in with Google</span>
                </button>
            </div>
        </main>
    </div>
  )
}

export default Login