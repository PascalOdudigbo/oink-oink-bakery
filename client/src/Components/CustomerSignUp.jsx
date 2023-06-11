import React, { useState } from "react";
import logo from "../assets/BakeryLogo.jpeg";
import { Alert } from "../Components";
import axios from "axios";
import emailjs from "@emailjs/browser";
import { useNavigate } from "react-router-dom";



function CustomerSignUp({hideAlert, alertDisplay, setAlertDisplay, alertStatus, setAlertStatus, 
    alertMessage, setAlertMessage}) {

    //creating form input states
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");

    //creating loading state
    const [isLoading, setIsLoading] = useState(false);

    //declaring a variable function to navigate to login page on successful signUp
    const navigate = useNavigate();

    function handleSignUp(e){
        //preventing default, scrolling to the top of the page and making button display loading
        e.preventDefault();
        window.scrollTo(0, 0);
        setIsLoading(true);

        //validating password and passwordConfirmation
        if (password === passwordConfirmation){
            const signUpData = {
                first_name: firstName.trim().charAt(0).toUpperCase() + firstName.slice(1),
                last_name: lastName.trim().charAt(0).toUpperCase() + lastName.slice(1),
                email: email.trim(),
                verified: false, 
                password: password, 
                password_confirmation: passwordConfirmation
            }

            //sending customer data to backend server
            axios.post(`/customers`, signUpData)
            .then(response => {
                //if saved successfully
                setIsLoading(false);
                setAlertStatus(true);
                // console.log(response);
                setAlertMessage("Signup successful!");
                setAlertDisplay("block")
                hideAlert();

                //setting up the email verification data
                const emailValues = {
                    customer_name: `${response.data.first_name} ${response.data.last_name}`,
                    customer_email: response.data.email,
                    confirmation_link: `http://localhost:4000/confirm-email/${response.data.id}`
                };

                //sending the email
                emailjs.send(process.env.REACT_APP_EMAILJS_SERVICE_ID, process.env.REACT_APP_EMAILJS_VERIFY_EMAIL_TEMPLATE_ID, emailValues, process.env.REACT_APP_EMAILJS_PUBLIC_KEY)
                .then(
                    //on email sent successfully
                    () => {
                        setAlertStatus(true);
                        setAlertMessage("Confirmation email sent!");
                        setAlertDisplay("block");
                        hideAlert();
                    },
                    //on email sent error
                    (error) => {
                        setAlertStatus(false);
                        setAlertMessage(JSON.stringify(error));
                        setAlertDisplay("block");
                        hideAlert();
                    }
                );
                
                //navigating to login component on signUp success
                setTimeout(() => navigate("/login"), 6000);
            })
            //on backend data storage fails
            .catch((error) => {
                setIsLoading(false)
                if (error.response){
                    setAlertStatus(false);
                    error.response.data.error ? setAlertMessage(error.response.data.error) :
                    setAlertMessage("SignUp unsuccessful, please try again!");
                    setAlertDisplay("block");
                    hideAlert();
                }
            });
        }
        else{
            setIsLoading(false);
            setPasswordConfirmation("")
            setAlertDisplay("block");
            setAlertStatus(false);
            setAlertMessage("Password and Confirm Password don't match!");
            hideAlert();
        }
        
    }

    return (
        <div className="customerSignUpContainer">
            <div className="customerSignUpAlertContainer">
                <Alert requestStatus={alertStatus} alertMessage={alertMessage} display={alertDisplay}/>
            </div>

            <div className="textContainer">
                <h1 className="signUpBakeryTitle">Oink Oink Bakery</h1>
                <p className="signUpBakeryMoto">Where flavour and pleasure meet</p>
                <p className="signUpBakeryMoto">satisfying your pallet one slice at a time.</p>
            </div>

            <div className="customerSignUpFormContainer">
                <img className="signUpLogo" src={logo} alt="logo"/>
                <form className="customerSignUpForm" onSubmit={handleSignUp}>
                    <h1 className="formTitle">SIGN UP</h1>
                    <label className="customerSignUpFormLabel">First Name:</label>
                    <input className="customerSignUpFormInput" type="text" required value={firstName} onChange={e => setFirstName(e.target.value)}/>
                    <label className="customerSignUpFormLabel">Last Name:</label>
                    <input className="customerSignUpFormInput" type="text" required value={lastName} onChange={e => setLastName(e.target.value)}/>
                    <label className="customerSignUpFormLabel">Email:</label>
                    <input className="customerSignUpFormInput" type="email" required value={email} onChange={e => setEmail(e.target.value)}/>
                    <label className="customerSignUpFormLabel">Password:</label>
                    <input className="customerSignUpFormInput" type="password" required  value={password} onChange={e => setPassword(e.target.value)}/>
                    <label className="customerSignUpFormLabel">Confirm Password:</label>
                    <input className="customerSignUpFormInput" type="password" required value={passwordConfirmation} onChange={e => setPasswordConfirmation(e.target.value)}/>
                    <button className="customerSignUpButton" type="submit">{isLoading ? "Loading..." : "Create Account"}</button>
                </form>

            </div>

        </div>
    );

}

export default CustomerSignUp;