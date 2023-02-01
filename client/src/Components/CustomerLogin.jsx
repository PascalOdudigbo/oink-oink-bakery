import React from "react";
import logo from "../assets/BakeryLogo.jpeg";
import { Link, useNavigate} from "react-router-dom";

function CustomerLogin() {
    // console.log(window.location.href)
    const navigate = useNavigate();
    return (
        <div className="customerLoginContainer">

            <div className="textContainer">
                <h1 className="loginBakeryTitle">Oink Oink Bakery</h1>
                <p className="loginBakeryMoto">Where flavour and pleasure meet</p>
                <p className="loginBakeryMoto">satisfying your pallet one slice at a time.</p>
            </div>

            <div className="customerLoginFormContainer">
                <img className="loginLogo" src={logo} alt="logo"/>
                <form className="customerLoginForm">
                    <h1 className="formTitle">LOGIN</h1>
                    <label className="customerLoginFormLabel">Email:</label>
                    <input className="customerLoginFormInput" type="email" required />
                    <label className="customerLoginFormLabel">Password:</label>
                    <input className="customerLoginFormInput" type="password" required />
                    <Link className="forgotPasswordLink" to={"/forgot-password"}>
                        forgot password?
                    </Link>
                    <button className="customerLoginButton" type="submit">Login</button>
                    <p>or</p>
                    <button className="customerSignUpButton" onClick={()=>{navigate("/sign-up")}}>Sign Up</button>
                </form>
            </div>

        </div>
    );
}

export default CustomerLogin;