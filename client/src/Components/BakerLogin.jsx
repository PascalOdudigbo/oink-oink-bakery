import React, {useState} from "react";
import logo from "../assets/BakeryLogo.jpeg";
import { Link, useNavigate} from "react-router-dom";
import axios from "axios";
import { Alert } from "../Components";

function BakerLogin({hideAlert, alertDisplay, setAlertDisplay, alertStatus, setAlertStatus, 
    alertMessage, setAlertMessage, bakerData, setBakerData}) {
    
    //declaring and initializing navigate variable function
    const navigate = useNavigate();

    //declaring and initializing states for form controlled input
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");

    //creating loading state
    const [isLoading, setIsLoading] = useState(false);


    //navigate already loggedIn users to the home page
    bakerData?.first_name && setTimeout(() => navigate("/bakery-portal"), 500);
    // useEffect(() => {
        
    // }, [])


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
        axios.post("/baker-login", customerLoginData)
        .then(response => {
            //if authentication successful
            setIsLoading(false);
            setBakerData(response.data);
            setAlertStatus(true);
            setAlertMessage("Login Successful!");
            setAlertDisplay("block");
            hideAlert();
            setTimeout(() => navigate("/bakery-portal"), 1500);
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
        <div className="bakerLoginContainer" style={{height: `calc(100vh - ${100 * 130/window.innerHeight}vh)`}}>
            <div className="bakerLoginAlertContainer">
                <Alert requestStatus={alertStatus} alertMessage={alertMessage} display={alertDisplay}/>
            </div>

            <div className="textContainer">
                <h1 className="loginBakeryTitle">Oink Oink Bakery</h1>
                <p className="loginBakeryMoto">Where flavour and pleasure meet</p>
                <p className="loginBakeryMoto">satisfying your pallet one slice at a time.</p>
            </div>

            <div className="bakerLoginFormContainer">
                <img className="loginLogo" src={logo} alt="logo"/>
                <form className="bakerLoginForm" onSubmit={handleLogin}>
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
                    
                    <Link className="forgotPasswordLink" to={"/admin-forgot-password"}>
                        forgot password?
                    </Link>
                    <button className="bakerLoginButton" type="submit">{isLoading ? <div class="loader"></div> : "Login"}</button>
                </form>
            </div>

        </div>
    );
}

export default BakerLogin;