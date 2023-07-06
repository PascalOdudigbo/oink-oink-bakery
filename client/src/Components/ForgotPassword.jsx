import React, { useState } from "react";
import { Alert } from "../Components";
import axios from "axios";
import emailjs from "@emailjs/browser";
import { useNavigate } from "react-router-dom";

function ForgotPassword({ hideAlert, alertDisplay, setAlertDisplay, alertStatus, setAlertStatus,
    alertMessage, setAlertMessage }) {

    //declaring and initializing state for form controlled input
    const [email, setEmail] = useState("");

    //creating loading state
    const [isLoading, setIsLoading] = useState(false);

    //declaring a variable function to navigate to login page on successful signUp
    const navigate = useNavigate();

    //creating email data variables
    const emailTitle = "Oink Oink Bakery Password Reset";
    const friendlyText = "No need to worry, you can reset your password by clicking the link below. If you didn't request a password reset, feel free to delete this email and carry on enjoying your day!";
    const instructionsText = `All the best, Oink Onik Bakery.`;
    const emailBtnLink = "http://localhost:4000";
    const buttonText = "Reset password"; 


    //function to handle emailing recovery link
    function handleForgotPassword(e) {
        e.preventDefault();
        window.scrollTo(0, 0);
        setIsLoading(true);

        //if the admin/baker wants to recover their account
        if (window.location.href.includes("admin")) {
            axios.post("/baker-account-recovery", { email: email })
                .then((res) => {
                    //if the email was found in the database
                    setIsLoading(false);
                    setAlertStatus(true);
                    setAlertMessage("Account located!");
                    setAlertDisplay("block");
                    hideAlert();

                    //defining email template values
                    const emailValues = {
                        email_title: emailTitle,
                        customer_email: email,
                        hello_text: `Hello ${res?.data.first_name} ${res?.data?.last_name}`,
                        thanks_text: friendlyText,
                        instructions_text: instructionsText,
                        button_link: `${emailBtnLink}/reset-password/admin/${res.data.id}`,
                        button_text: buttonText,
                    };

                    //sending the recovery email
                    emailjs.send(process.env.REACT_APP_EMAILJS_SERVICE_ID,
                        process.env.REACT_APP_EMAILJS_VERIFY_EMAIL_AND_RESET_PASSWORD_TEMPLATE_ID,
                        emailValues, process.env.REACT_APP_EMAILJS_PUBLIC_KEY)
                        .then(
                            //on email sent successfully
                            () => {
                                setAlertStatus(true);
                                setAlertMessage("Password reset link sent!");
                                setAlertDisplay("block");
                                hideAlert();
                            },
                            //on email sending failed
                            (error) => {
                                setAlertStatus(false);
                                alertMessage(JSON.stringify(error));
                                setAlertDisplay("block");
                                hideAlert();
                            }
                        );

                    setTimeout(() => navigate("/admin-login"), 5000);

                })
                .catch((error) => {
                    //if email not found in the database
                    setIsLoading(false);
                    if (error.response) {
                        setAlertStatus(false);
                        error.response.data.error ? setAlertMessage(error.response.data.error) : setAlertMessage("Email isn't linked to any account!");
                        setAlertDisplay("block");
                        hideAlert();
                    }
                });

        }
        else {
            //if the customer wants to recover their account
            axios.post("/customer-account-recovery", { email: email })
                .then((res) => {
                    //if the email was found in the database
                    setIsLoading(false);
                    setAlertStatus(true);
                    setAlertMessage("Account located!");
                    setAlertDisplay("block");
                    hideAlert();

                    //defining email template values
                    const emailValues = {
                        email_title: emailTitle,
                        customer_email: email,
                        hello_text: `Hello ${res?.data.first_name} ${res?.data?.last_name}`,
                        thanks_text: friendlyText,
                        instructions_text: instructionsText,
                        button_link: `${emailBtnLink}/reset-password/customer/${res.data.id}`,
                        button_text: buttonText,
                        reset_password_link: `${emailBtnLink}/reset-password/customer/${res.data.id}`
                    };

                    //sending the recovery email
                    emailjs.send(process.env.REACT_APP_EMAILJS_SERVICE_ID,
                        process.env.REACT_APP_EMAILJS_VERIFY_EMAIL_AND_RESET_PASSWORD_TEMPLATE_ID,
                        emailValues, process.env.REACT_APP_EMAILJS_PUBLIC_KEY)
                        .then(
                            //on email sent successfully
                            () => {
                                setAlertStatus(true);
                                setAlertMessage("Password reset link sent!");
                                setAlertDisplay("block");
                                hideAlert();
                            },
                            //on email sending failed
                            (err) => {
                                setAlertStatus(false);
                                alertMessage(JSON.stringify(err));
                                setAlertDisplay("block");
                                hideAlert();
                            }
                        );

                    setTimeout(() => navigate("/login"), 5000);

                })
                .catch((error) => {
                    //if email not found in the database
                    setIsLoading(false);
                    if (error.response) {
                        setAlertStatus(false);
                        error.response.data.error ? setAlertMessage(error.response.data.error) : setAlertMessage("Email isn't linked to any account!");
                        setAlertDisplay("block");
                        hideAlert();
                    }
                });

        }

    }


    return (
        <div className="forgotPasswordContainer" style={{height: `calc(100vh - ${100 * 130/window.innerHeight}vh)`}}>
            <div className="forgotPasswordAlertContainer">
                <Alert requestStatus={alertStatus} alertMessage={alertMessage} display={alertDisplay} />
            </div>

            <div className="forgotPasswordTextContainer">
                <h1 className="forgotPasswordTitle">Forgot your password?</h1>
                <p className="forgotPasswordText">Don't sweat it.</p>
                <p className="forgotPasswordText">
                    Simply input the email you used to sign up below and a recovery link will be sent to you.
                </p>
            </div>

            <div className="forgotPasswordFormContainer">
                <form className="forgotPasswordForm" onSubmit={handleForgotPassword}>
                    <h1 className="forgotPasswordformTitle">ACCOUNT RECOVERY</h1>
                    <div className="forgotPasswordFormTextAndInputContainer">
                        <p className="forgotPasswordFormText">Email</p>
                        <input className="forgotPasswordFormInput"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <button className="forgotPasswordSubmitButton" type="submit">{isLoading ? <div class="loader"></div> : "Submit"}</button>
                </form>
            </div>

        </div>
    )
}
export default ForgotPassword;