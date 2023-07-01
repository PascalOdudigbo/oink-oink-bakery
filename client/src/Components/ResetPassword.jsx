import React, { useState } from "react";
import axios from "axios";
import {Alert} from "../Components";
import logo from "../assets/BakeryLogo.jpeg";
import { useNavigate } from "react-router-dom";

function ResetPassword({ hideAlert, alertDisplay, setAlertDisplay, alertStatus, setAlertStatus, alertMessage, setAlertMessage}) {
    //declaring state variables for controlled form input
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");

    //creating loading state
    const [isLoading, setIsLoading] = useState(false);

    //declaring a variable function to navigate to login page on successful password reset
    const navigate = useNavigate();

    function handleOnSubmit(e) {
        e.preventDefault();
        let currentLink = window.location.href;
        setIsLoading(true);
        currentLink = currentLink.split("/");

        if (password !== passwordConfirmation) {
            setIsLoading(false);
            setAlertDisplay("block");
            setAlertStatus(false);
            setAlertMessage("Password and Confirm Password don't match !")
            hideAlert();
        }else{
            //data to be sent to the backend
            const userData = {
                password: password
            }
            //if a customer is trying to reset their password
            if (currentLink[currentLink.length - 2] === "customer"){
                axios.patch(`/customers/${currentLink[currentLink.length - 1]}`, userData)
                .then(res => {
                    //if password update is successful
                    setIsLoading(false);
                    setAlertStatus(true);
                    setAlertDisplay("block");
                    setAlertMessage("Password reset sucessful!");
                    hideAlert();
                    setTimeout(()=> navigate("/login"), 3000);
            
                })
                .catch(error =>{
                    //if password update isn't successful
                    setIsLoading(false);
                    if(error.response){
                        setAlertStatus(false);
                        setAlertDisplay("block");
                        setAlertMessage(`${error.response.data.error}`);
                        hideAlert();
                    }      
                });
            }
            //if a baker is trying to update their password
            else{
                axios.patch(`/customers/${currentLink[currentLink.length - 1]}`, userData)
                .then(res => {
                    //if password update is successful
                    setIsLoading(false);
                    setAlertStatus(true);
                    setAlertDisplay("block");
                    setAlertMessage("Password reset sucessful!");
                    hideAlert();
                    setTimeout(()=> navigate("/login"), 3000);
            
                })
                .catch(error =>{
                    //if password update isn't successful
                    setIsLoading(false);
                    if(error.response){
                        setAlertStatus(false);
                        setAlertDisplay("block");
                        setAlertMessage(`${error.response.data.error}`);
                        hideAlert();
                    }      
                });
            }

        }

    }

    return (
        <div className="resetPasswordContainer">
            <Alert
                requestStatus={alertStatus}
                alertMessage={alertMessage}
                display={alertDisplay}
            />

            <div className="resetPasswordFormContainer">
                <img
                    onClick={() => navigate("/")}
                    className="resetPasswordLogo"
                    src={logo}
                    alt="logo"
                />
                <h1 className="resetPasswordText">RESET PASSWORD</h1>
                <form className={"resetPasswordForm"} onSubmit={handleOnSubmit}>
                <div className="resetPasswordFormTextAndInputContainer">
                        <p className="resetPasswordFormText">Password (required)</p>
                        <input className="resetPasswordFormInput"
                            required
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="resetPasswordFormTextAndInputContainer">
                        <p className="resetPasswordFormText">Password Confirmation (required)</p>
                        <input className="resetPasswordFormInput"
                            required
                            type="password"
                            value={passwordConfirmation}
                            onChange={(e) => setPasswordConfirmation(e.target.value)}
                        />
                    </div>

                    <button className="resetPasswordBtn" type="submit">
                        {isLoading ? <div class="loader"></div> : "Confirm"}
                    </button>
                </form>
            </div>
        </div>
    );

}
export default ResetPassword;