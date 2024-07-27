import { useEffect, useState } from "react";
import { IconType } from "react-icons";
import { BiArrowBack } from "react-icons/bi";
import {
  FaRegAddressBook
} from "react-icons/fa";
import { FaDroplet, FaHandshakeAngle } from "react-icons/fa6";
import { HiMenuAlt4 } from "react-icons/hi";
import { IoIosPeople } from "react-icons/io";
import { Link, Location, useLocation } from "react-router-dom";
import SOS from "../pages/SOS";

const Sidebar = () => {
  const location = useLocation();
//window.innerWidth < 1100
  const [showModal, setShowModal] = useState<boolean>(false);
  const [phoneActive, setPhoneActive] = useState<boolean>(
    true
  );

  const resizeHandler = () => {
    setPhoneActive(true);
  };

  useEffect(() => {
    window.addEventListener("resize", resizeHandler);

    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  return (
    <>
      
        <button id="hamburger" onClick={() => setShowModal((prev)=> !prev)}>
          <HiMenuAlt4 />
        </button>
      

      <aside
        style={
          phoneActive
            ? {
                width: "20rem",
                height: "100vh",
                position: "fixed",
                top: 0,
                left: showModal ? "0" : "-20rem",
                transition: "all 0.5s",
              }
            : {}
        }
      >

        {showModal && 
        <button>
                <BiArrowBack className="back-btn" onClick={() => setShowModal(false)}/>
        </button>
        }

        
        <DivOne location={location} />
        <DivTwo location={location} />

        <SOS />
        

          
        
      </aside>
    </>
  );
};

const DivOne = ({ location }: { location: Location }) => (
  <div>
    <h5>Register</h5>
    <ul>
      <Li
        url="/register/contacts"
        text="Contacts"
        Icon={FaRegAddressBook}
        location={location}
      />
      <Li
        url="/register/donor"
        text="Blood Donor"
        Icon={FaDroplet}
        location={location}
      />
      <Li
        url="/register/helper"
        text="Helper"
        Icon={FaHandshakeAngle}
        location={location}
      />
    </ul>
  </div>
);

const DivTwo = ({ location }: { location: Location }) => (
  <div>
    <h5>Request</h5>
    <ul>
      <Li
        url="/request/help"
        text="Help"
        Icon={IoIosPeople}
        location={location}
      />
      <Li
        url="/request/blood"
        text="Blood"
        Icon={FaDroplet}
        location={location}
      />
    </ul>
  </div>
);

interface LiProps {
  url: string;
  text: string;
  location: Location;
  Icon: IconType;
}
const Li = ({ url, text, location, Icon }: LiProps) => (
  <li
    style={{
      backgroundColor: location.pathname.includes(url)
        ? "rgba(0,115,255,0.1)"
        : "white",
    }}
  >
    <Link
      to={url}
      style={{
        color: location.pathname.includes(url) ? "rgb(0,115,255)" : "black",
      }}
    >
      <Icon />
      {text}
    </Link>
  </li>
);

export default Sidebar;
