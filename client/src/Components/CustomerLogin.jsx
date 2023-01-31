import React from "react";

function CustomerLogin() {
    return (
        <div className="customerLoginContainer">

            <div className="textContainer">
                <h1 className="loginBakeryTitle">Oink Oink Bakery</h1>
                <p className="loginBakeryMoto">Where flavour and pleasure meet</p>
                <p className="loginBakeryMoto">satisfying your pallet one slice at a time.</p>
            </div>

            <div className="customerLoginFormContainer">
                <form>
                    <label className="customerLoginFormLabel">Email:</label>
                    <input className="customerLoginFormInput" type="email" required />
                    <label className="customerLoginFormLabel">Password:</label>
                    <input className="customerLoginFormInput" type="password" required />
                    <button className="customerLoginButton">Login</button>
                    <button className="customerSignUpButton">Sign Up</button>
                </form>
            </div>

        </div>
    );
}

export default CustomerLogin;