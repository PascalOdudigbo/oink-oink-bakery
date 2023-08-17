import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/BakeryLogo.jpeg";
import { FaInstagram } from "react-icons/fa";
import { IconContext } from "react-icons/lib";


function Footer(){
    //creating navigation variable function
    const navigate = useNavigate();
    //creating styling variable object for instagram icon
    const instagramIconStyle = { marginRight: "10px", color: "#E1306C" };
    //creating the bakery social media links object
    const socialsLinks = {
        instagram: "https://www.instagram.com/oink.oink_bakery/"
    }

    return(
        <div className="footerContainer">
            <img className="footerLogo" src={logo} alt="logo" onClick={()=>{
                navigate("/")
            }}/>
            <h4 className="copywrightText">{`©${new Date().getFullYear()} Oink Oink Bakery KE`}</h4>

            <div className="followUsContainer">
                {/* <pre>                   </pre> */}
                <h4 className="followUsText">follow us: </h4>
                <IconContext.Provider value={{ size: "25px" }}>
                    <FaInstagram
                        onClick={() =>
                            (window.location = `${socialsLinks.instagram}`)
                        }
                        style={instagramIconStyle}
                    />
                </IconContext.Provider>

            </div>
        </div>
    );

}
export default Footer;