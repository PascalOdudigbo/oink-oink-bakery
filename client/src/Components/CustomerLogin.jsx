import React, { useEffect, useState } from "react";
import logo from "../assets/BakeryLogo.jpeg";
import { Link, useNavigate } from "react-router-dom";
import { Alert, Footer } from "../Components";
import axios from "axios";

function CustomerLogin(
    { hideAlert, alertDisplay, setAlertDisplay, alertStatus, setAlertStatus,
        alertMessage, setAlertMessage, customerData, setCustomerData, getCarts }
) {
    //declaring and initializing navigate variable function
    const navigate = useNavigate();

    //declaring and initializing states for form controlled input
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    //creating loading state
    const [isLoading, setIsLoading] = useState(false);


    //declaring useEffect to navigate already loggedIn users to the home page
    useEffect(() => {
        customerData?.verified && setTimeout(() => navigate("/"), 1000);
    }, [])


    //creating function to handle login functionality 
    function handleLogin(e) {
        setIsLoading(true);
        e.preventDefault();
        window.scrollTo(0, 0);


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
                setCustomerData(response?.data);
                getCarts(response?.data?.id)
                setAlertStatus(true);
                setAlertMessage("Login Successful!");
                setAlertDisplay("block");
                hideAlert();
                setTimeout(() => navigate("/"), 1500);
            })
            .catch(error => {
                //if authentication failed 
                if (error.response) {
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
                <Alert requestStatus={alertStatus} alertMessage={alertMessage} display={alertDisplay} />
            </div>

            <div className="textContainer">
                <h1 className="loginBakeryTitle">Oink Oink Bakery</h1>
                <p className="loginBakeryMoto">Where flavour and pleasure meet</p>
                <p className="loginBakeryMoto">satisfying your pallet one slice at a time.</p>
            </div>

            <div className="customerLoginFormContainer">
                <img className="loginLogo" src={logo} alt="logo" />
                <form className="customerLoginForm" onSubmit={handleLogin}>
                    <h1 className="formTitle">LOGIN</h1>
                    <div className="loginFormTextAndInputContainer">
                        <p className="loginFormText">Email</p>
                        <input className="loginFormInput"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="loginFormTextAndInputContainer">
                        <p className="loginFormText">Password (required)</p>
                        <input className="loginFormInput"
                            type="password"
                            value={password}
                            required
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <Link className="forgotPasswordLink" to={"/forgot-password"}>forgot password?</Link>
                    <button className="customerLoginButton" type="submit">{isLoading ? <div class="loader"></div> : "Login"}</button>
                    <p>or</p>
                    <button className="customerSignUpButton" onClick={() => { navigate("/sign-up") }}>Sign Up</button>
                </form>
            </div>

        </div>
    );
}

export default CustomerLogin;