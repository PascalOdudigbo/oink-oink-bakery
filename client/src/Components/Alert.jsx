import React from "react";
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { MdError } from 'react-icons/md';


function Alert({requestStatus, alertMessage, display="block"}){
    return(
        <div className="alertContainer" style={{backgroundColor: requestStatus ? "#008631" : "#B71C1C", display: display}}>
            <div className="iconAndMessageContainer">
                {requestStatus ? <div className="alertIcon"><BsFillCheckCircleFill/></div> : <div className="alertIcon"><MdError/></div>}
                <p className="alertMessage">{alertMessage}</p>
            </div>
        </div>
    );
}
export default Alert;