import React from "react";


function ForgotPassword() {
    return(<>
        <div className="forgotPasswordTextContainer">
            <h1>Account Recovery</h1>
            <p>
                Forgot your password? Don't sweat it.
                <br />
                Simply input the email you used to sign up below and a recovery link will be sent to you.
            </p>
        </div>

        <form className="forgotPasswordForm">
            <label className="emailLabel">Email</label>
            <input type="email" name="email" required/>
            <button className="forgotPasswordSubmitButton" type="submit">Submit</button>
        </form>

    </>)
}
export default ForgotPassword;