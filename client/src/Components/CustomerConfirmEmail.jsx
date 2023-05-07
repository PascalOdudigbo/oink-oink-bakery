import React, {useState} from "react";
import logo from "../assets/BakeryLogo.jpeg";
import {Alert} from "../Components";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CustomerConfirmEmail({hideAlert, alertDisplay, setAlertDisplay}){
    //declaring and initializing state variables
    const [alertStatus, setAlertStatus] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    //declaring navigation variable
    const navigate = useNavigate();


    function handleVerifyEmail(){
        setIsLoading(true);
        
        //updating verified status of customer account
        axios.post(`/customers/${window.location.href[window.location.href.length - 1]}`, {verified: true})
        .then(response =>{
            setIsLoading(false);
            setAlertStatus(true);
            setAlertMessage("Email verified!");
            setAlertDisplay("block");
            hideAlert();
            //navigating to login component on verification success
            setTimeout(() => navigate("/login"), 6000);
        })
        //if updating verified status fails
        .catch(error => {
            setIsLoading(false);
            if(error.response){
                setAlertStatus(false);
                setAlertMessage(`${error.response.data.error}`);
                setAlertDisplay("block");
                hideAlert();
            }
        });

    }

    return (
        <div className="customerConfirmEmailContainer">
            <Alert requestStatus={alertStatus} alertMessage={alertMessage} display={alertDisplay}/>

            <div className="customerConfirmEmailBody">
                <img 
                    className="customerConfirmEmailBodyLogo"
                    src={logo}
                    alt={"logo"}
                    onClick={() => navigate("/")}
                />

                <p className="CustomerConfirmEmailBodyText">Click on the button below to verify your email address.</p>

                <button onClick={handleVerifyEmail}>{isLoading ? "Loading" : "Verify email"}</button>

            </div>

        </div>
    )

}
export default CustomerConfirmEmail;