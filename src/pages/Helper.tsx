import { ChangeEvent, FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";


const  Helper= () => {

    const navigate= useNavigate();

    const [helperInfo,setHelperInfo] = useState({
        name: "",
        gender: "",
        email: "",
        location: "",
    });

    const changeHandler= (
        e:ChangeEvent<HTMLInputElement | HTMLSelectElement>
        )=>{
            setHelperInfo(prev=>({...prev, [e.target.name]: e.target.value}));
            };

    const submitHandler = async(e:FormEvent<HTMLFormElement>) =>{
      e.preventDefault();


      try {
      } catch (error) {
        toast.error("Something Went Wrong");
      }
    }
    

  return (
    <div className="shipping">
        <button>
            <BiArrowBack className="back-btn" onClick={()=>navigate('/')}/>
        </button>


        <form onSubmit={submitHandler}>
            <h1>Register</h1>

            <input 
            required
            type="text" 
            placeholder="Name" 
            name="name" 
            value={helperInfo.name}
            onChange={changeHandler}
            />

            <select name="gender" required value={helperInfo.gender}
            onChange={changeHandler} >

                <option value="">Choose Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
            </select>

            <input 
            required
            type="email" 
            placeholder="Email ID" 
            name="email" 
            value={helperInfo.email}
            onChange={changeHandler}
            />

            <input 
            required
            type="text" 
            placeholder="Location" 
            name="location" 
            value={helperInfo.location}
            onChange={changeHandler}
            />


            <button type="submit">
                Submit
            </button>
        </form>
    </div>
  )
}

export default Helper