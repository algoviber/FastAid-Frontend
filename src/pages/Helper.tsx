import axios from "axios";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BiArrowBack } from "react-icons/bi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UserReducerInitialState } from "../types/reducer-types";
import useGeolocation from "react-hook-geolocation";


const  Helper= () => {

    const navigate= useNavigate();

  const {user} = useSelector((state:{userReducer: UserReducerInitialState})=> state.userReducer);

    const [helperInfo,setHelperInfo] = useState({
        name: "",
        gender: "",
        email: "",
        location: {
          lati: "",
          longi: "",
          address: ""
        },
    });

    const [address,setAddress] = useState("");

    const [helper, setHelper] = useState([]);

    useEffect(() => {
        const fetchHelper = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_SERVER}/api/v1/register/helper/my?id=${user?._id}`);
                const data = response.data;
                setHelper(data.helper);
            } catch (error) {
                console.error('Error fetching friends:', error);
            }
        };

        fetchHelper();
    }, [user]);

    const size = 1-helper.length > 0 ? 1 : 0;

    const changeHandler= (
        e:ChangeEvent<HTMLInputElement | HTMLSelectElement>
        )=>{
            setHelperInfo(prev=>({...prev, [e.target.name]: e.target.value}));
            };

    const submitHandler = async(e:FormEvent<HTMLFormElement>) =>{
      e.preventDefault();


      try {

        const res = await axios.post(`${import.meta.env.VITE_SERVER}/api/v1/register/helper/new?_id=${user?._id}`,{
            helperInfo
        });

        if("data" in res){
          toast.success("Helper Added Successfully!");
        }

      } catch (error) {
        toast.error("Something Went Wrong");
      }
    }

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
         setHelperInfo({ ...helperInfo, location: {lati:String(lat), longi:String(long), address:locaddress} });
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
      {helper.length>0 &&
            <h1>
                Helper Added Already!!
            </h1>
      }
        <button>
            <BiArrowBack className="back-btn" onClick={()=>navigate('/')}/>
        </button>

      {size>0 &&
      <div className="fill-form">
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
            name="address" 
            value={address}
            onChange={(e)=>setAddress(e.target.value)}
            onClick={locationGetter}
            />


            <button type="submit">
                Submit
            </button>
        </form>
      </div>
    }
    </div>
  )
}

export default Helper