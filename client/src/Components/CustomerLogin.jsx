import React, { useState } from "react";
import logo from "../assets/BakeryLogo.jpeg";
import { Link, useNavigate} from "react-router-dom";
import { Alert } from "../Components";
import axios from "axios";

function CustomerLogin({hideAlert, alertDisplay, setAlertDisplay, customerData, setCustomerData}) {
    //declaring and initializing navigate variable function
    const navigate = useNavigate();

    //declaring and initializing states for form controlled input
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");

    //creating loading state
    const [isLoading, setIsLoading] = useState(false);


    //creating alert management states
    const [alertStatus, setAlertStatus] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");


    //creating function to handle login functionality 
    function handleLogin(e){
        setIsLoading(true);
        e.preventDefault();

        //creating an object containing the login data
        const customerLoginData = {
            email: email.trim,
            password: password
        };

        //sending login data to the server for authentication
        axios.post("/customer-login", customerLoginData)
        .then(response => {
            //if authentication successful
            setIsLoading(false);
            setCustomerData(response.data);
            setAlertStatus(true);
            setAlertMessage("Login Successful!");
            setAlertDisplay("block");
            hideAlert();
            setTimeout(() => navigate("/"), 2000);
        })
        .catch(error => {
            //if authentication failed 
            if (error.response){
                setIsLoading(false);
                setAlertMessage(error.response.data.error);
                setAlertStatus(false);
                setAlertDisplay("block");
                hideAlert();
            }
        })

    }

    return (
        <div className="customerLoginContainer">
            <div className="customerLoginAlertContainer">
                <Alert requestStatus={alertStatus} alertMessage={alertMessage} display={alertDisplay}/>
            </div>

            <div className="textContainer">
                <h1 className="loginBakeryTitle">Oink Oink Bakery</h1>
                <p className="loginBakeryMoto">Where flavour and pleasure meet</p>
                <p className="loginBakeryMoto">satisfying your pallet one slice at a time.</p>
            </div>

            <div className="customerLoginFormContainer">
                <img className="loginLogo" src={logo} alt="logo"/>
                <form className="customerLoginForm" onSubmit={handleLogin}>
                    <h1 className="formTitle">LOGIN</h1>
                    <label className="customerLoginFormLabel">Email:</label>
                    <input className="customerLoginFormInput" type="email" required value={email} onChange={e => setEmail(e.target.value)}/>
                    <label className="customerLoginFormLabel">Password:</label>
                    <input className="customerLoginFormInput" type="password" required value={password} onChange={e => setPassword(e.target.value)}/>
                    <Link className="forgotPasswordLink" to={"/forgot-password"}>forgot password?</Link>
                    <button className="customerLoginButton" type="submit">{isLoading ? "Loading..." : "Login"}</button>
                    <p>or</p>
                    <button className="customerSignUpButton" onClick={()=>{navigate("/sign-up")}}>Sign Up</button>
                </form>
            </div>

        </div>
    );
}

export default CustomerLogin;