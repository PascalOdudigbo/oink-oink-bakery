import { useState } from "react";
const Checkbox = ({ label, isChecked, setIsChecked }) => {

    return (
        <div className="checkboxContainer">
            <label className="checkboxLabel">
                <input type="checkbox"
                    checked={isChecked}
                    onChange={() => setIsChecked((prev) => !prev)}
                />
                <span>{label}</span>
            </label>
        </div>
    );
};
export default Checkbox;