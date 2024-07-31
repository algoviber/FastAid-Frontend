import axios from "axios";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { UserReducerInitialState } from "../types/reducer-types";
import useGeolocation from "react-hook-geolocation";
import { useState } from "react";

const SOS = () => {

  const geolocation = useGeolocation();
  const {user} = useSelector((state:{userReducer: UserReducerInitialState})=> state.userReducer);
  const [requestInfo, setRequestInfo] = useState({location:{lati: '',longi:'',address: ''}});

  const sendSos = async() => {
    try{
      if(!geolocation.error){
        const lat = geolocation.latitude;
        const long = geolocation.longitude;
        
    
        const API_KEY = import.meta.env.VITE_GEOCODER_API_KEY;
    
        const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}%2C${long}&key=${API_KEY}`;
        const res = await axios.get(url);
        
        if (res.status === 200) {
           const locaddress = res.data.results[0].formatted;
           console.log(locaddress);
           setRequestInfo({ ...requestInfo, location: {lati:String(lat), longi:String(long), address:locaddress} });
        } else {
          console.error('Geocoder failed due to:', res.data.status);
        }
    
      }
        else{
          toast.error(geolocation.error.message);
        }


      const res = await axios.post(`${import.meta.env.VITE_SERVER}/api/v1/request/sos?_id=${user?._id}`,{
        requestInfo
      });

    if("data" in res){
        toast.success("SOS Sent Successfull");
    }
    console.log('SOS Sent:');
    }
    catch(error){
        toast.error("Something Went Wrong");
    }
  }

  return (

    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <button onClick={sendSos} style={{
                width: '80%',
                backgroundColor: '#ff4c4c',
                color: 'white',
                border: 'none',
                padding: '15px 30px',
                fontSize: '18px',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#e60000'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#ff4c4c'}
            >
                Send SOS ?
            </button>
    </div>
  )
}

export default SOS