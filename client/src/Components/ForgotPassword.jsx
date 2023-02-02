import React from "react";


function ForgotPassword() {
    return(
        <div className="forgotPasswordContainer">
            <div className="forgotPasswordTextContainer">
                <h1 className="forgotPasswordTitle">Forgot your password?</h1>
                <p className="forgotPasswordText">Don't sweat it.</p>
                <p className="forgotPasswordText">
                    Simply input the email you used to sign up below and a recovery link will be sent to you.
                </p>
            </div>

            <div className="forgotPasswordFormContainer">
                <form className="forgotPasswordForm">
                    <h1 className="forgotPasswordformTitle">Account Recovery</h1>
                    <label className="emailLabel">Email:</label>
                    <input className="emailInput" type="email" name="email" required/>
                    <button className="forgotPasswordSubmitButton" type="submit">Submit</button>
                </form>
            </div>
            
        </div>
    )
}
export default ForgotPassword;