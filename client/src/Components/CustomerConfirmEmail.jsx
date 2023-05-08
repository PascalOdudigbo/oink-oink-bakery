import React, {useState} from "react";
import logo from "../assets/BakeryLogo.jpeg";
import {Alert} from "../Components";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CustomerConfirmEmail({hideAlert, alertDisplay, setAlertDisplay, alertStatus, setAlertStatus, 
    alertMessage, setAlertMessage}){
    //declaring and initializing state variable
    const [isLoading, setIsLoading] = useState(false);

    //declaring navigation variable
    const navigate = useNavigate();


    function handleVerifyEmail(){
        setIsLoading(true);
        
        //updating verified status of customer account
        axios.patch(`/customers/${window.location.href[window.location.href.length - 1]}`, {verified: true})
        .then(response =>{
            setIsLoading(false);
            setAlertStatus(true);
            setAlertMessage("Email verified!");
            setAlertDisplay("block");
            hideAlert();
            //navigating to login component on verification success
            setTimeout(() => navigate("/login"), 3000);
        })
        //if updating verified status fails
        .catch(error => {
            setIsLoading(false);
            if(error.response){
                console.log(error)
                setAlertStatus(false);
                setAlertMessage(`${error.message}`);
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
                    title="Oink Oink Bakery"
                    onClick={() => navigate("/")}
                    
                />

                <p className="customerConfirmEmailBodyText">Click on the button below to verify your email address.</p>

                <button className="customerConfirmEmailBodyButton" onClick={handleVerifyEmail}>{isLoading ? "Loading" : "Verify email"}</button>

            </div>

        </div>
    )

}
export default CustomerConfirmEmail;