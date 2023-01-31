import React from "react";
import logo from "../assets/BakeryLogo.jpeg";


function CustomerSignUp() {
    return (
        <div className="customerSignUpContainer">
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
                    <input className="customerSignUpFormInput" type="email" required />
                    <label className="customerSignUpFormLabel">Last Name:</label>
                    <input className="customerSignUpFormInput" type="email" required />
                    <label className="customerSignUpFormLabel">Email:</label>
                    <input className="customerSignUpFormInput" type="email" required />
                    <label className="customerSignUpFormLabel">Password:</label>
                    <input className="customerSignUpFormInput" type="password" required />
                    <label className="customerSignUpFormLabel">Confirm Password:</label>
                    <input className="customerSignUpFormInput" type="password" required />
                    <button className="customerSignUpButton">Create Account</button>
                </form>

            </div>

        </div>
    );

}

export default CustomerSignUp;