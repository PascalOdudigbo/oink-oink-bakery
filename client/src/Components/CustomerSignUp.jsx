import React, { useState } from "react";
import logo from "../assets/BakeryLogo.jpeg";
import { Alert } from "../Components";


function CustomerSignUp() {
    //creating form input states
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");

    //creating loading state
    const [isLoading, setIsLoading] = useState(false);


    //creating alert management states
    const[alertDisplay, setAlertDisplay] = useState("none")
    const [alertStatus, setAlertStatus] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");


    function handleSignUp(){
        const customerData = {
            first_name: firstName,
            last_name: lastName,
            email: email,
            verified: false, 
            password: password, 
            password_confirmation: passwordConfirmation
        }
        
    }

    return (
        <div className="customerSignUpContainer">
            <Alert requestStatus={requestStatus} alertMessage={alertMessage} display={alertDisplay}/>

            <div className="textContainer">
                <h1 className="signUpBakeryTitle">Oink Oink Bakery</h1>
                <p className="signUpBakeryMoto">Where flavour and pleasure meet</p>
                <p className="signUpBakeryMoto">satisfying your pallet one slice at a time.</p>
            </div>

            <div className="customerSignUpFormContainer">
                <img className="signUpLogo" src={logo} alt="logo"/>
                <form className="customerSignUpForm">
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