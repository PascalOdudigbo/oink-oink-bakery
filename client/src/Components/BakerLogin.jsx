import React from "react";
import logo from "../assets/BakeryLogo.jpeg";
import { Link} from "react-router-dom";

function BakerLogin() {
    // console.log(window.location.href)
    // const navigate = useNavigate();
    return (
        <div className="bakerLoginContainer">

            <div className="textContainer">
                <h1 className="loginBakeryTitle">Oink Oink Bakery</h1>
                <p className="loginBakeryMoto">Where flavour and pleasure meet</p>
                <p className="loginBakeryMoto">satisfying your pallet one slice at a time.</p>
            </div>

            <div className="bakerLoginFormContainer">
                <img className="loginLogo" src={logo} alt="logo"/>
                <form className="bakerLoginForm">
                    <h1 className="formTitle">LOGIN</h1>
                    <label className="bakerLoginFormLabel">Email:</label>
                    <input className="bakerLoginFormInput" type="email" required />
                    <label className="bakerLoginFormLabel">Password:</label>
                    <input className="bakerLoginFormInput" type="password" required />
                    <Link className="forgotPasswordLink" to={"/admin-forgot-password"}>
                        forgot password?
                    </Link>
                    <button className="bakerLoginButton" type="submit">Login</button>
                    {/* <p>or</p>
                    <button className="bakerSignUpButton" onClick={()=>{navigate("/sign-up")}}>Sign Up</button> */}
                </form>
            </div>

        </div>
    );
}

export default BakerLogin;