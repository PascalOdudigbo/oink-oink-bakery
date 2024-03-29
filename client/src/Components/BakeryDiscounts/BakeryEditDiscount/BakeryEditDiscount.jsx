import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function BakeryAddDiscount({targetDiscount, setAlertDisplay, setAlertStatus, setAlertMessage, hideAlert, getDiscounts}) {

    //declaring form controlled input states
    const [name, setName] = useState(targetDiscount?.name);
    const [description, setDescription] = useState(targetDiscount?.description);
    const [percentage, setPercentage] = useState(targetDiscount?.discount_percent);

    //creating loading state
    const [isLoading, setIsLoading] = useState(false);

    //declaring and initializing navigate variable function
    const navigate = useNavigate();

    //defining a function to add discount to the database
    function handleEditDiscount(e){
        e.preventDefault();
        window.scrollTo(0,0);
        setIsLoading(true);

        //setting discount data to be sent to the discounts table in the db
        const discountData = {
            name: name,
            discount_percent: parseFloat(percentage),
            description: description,
        };

        //sending discount data to backend
        axios.patch(`/discounts/${targetDiscount?.id}`, discountData)
        .then((response) => {

            setIsLoading(false);
            setAlertStatus(true);
            setAlertMessage("Discount updated successfully!")
            setAlertDisplay("block");
            hideAlert();
            getDiscounts()
            setTimeout(() => navigate("/bakery-portal/discounts"), 2000)
        })
        .catch((error) => {
            setIsLoading(false)
            if (error.response){
                setAlertStatus(false);
                error.response.data.error ? setAlertMessage(error.response.data.error) :
                setAlertMessage("Updating discount unsuccessful, please try again!");
                setAlertDisplay("block");
                hideAlert();
            }
        })

    }     


    return(
        <div className="bakeryAddDiscountContainer"> 
            <h1 className="bakeryAddDiscountPageTitle">EDIT DISCOUNT</h1>
            <form className="bakeryAddDiscountForm" onSubmit={handleEditDiscount}>
                <div className="bakeryAddDiscountFormBody">
                    <div className="bakeryDetailsContainer">
                        <p className="bakeryAddDiscountFormTitle">DETAILS</p>

                        <div className="bakeryAddDiscountFormNameContainer">
                            <p className="bakeryAddDiscountFormNameText">Name (required)</p>
                            <input className="bakeryAddDiscountFormInput" type="text" required value={name} onChange={e => setName(e.target.value)}/>
                        </div>

                        <div className="bakeryAddDiscountFormDescriptionContainer">
                            <p className="bakeryAddDiscountFormDescriptionTitle">Description</p>
                            <textarea className="bakeryAddDiscountFormDescriptionTextArea" rows="8" cols="75" value={description} onChange={e => setDescription(e.target.value)}/>
                        </div>

                    </div>

                    <div className="bakeryAddDiscountFormPercentageContainer">
                        <p className="bakeryAddDiscountFormTitle">PERCENTAGE</p>

                        <div className="bakeryAddDiscountFormPercentageInputContainer">
                            <p className="bakeryAddDiscountFormNameText">Percentage (required)</p>
                            <input className="bakeryAddDiscountFormPercentageInput" type="text" required value={percentage} onChange={(e) => setPercentage(e.target.value)} />
                        </div>
                    </div>
                </div>

                <div className="bakeryAddDiscountFormButtonsContainer">
                    <button className="bakeryAddDiscountFormSaveButton" type="submit">{isLoading ? <div class="loader"></div> : "Save"}</button>
                </div>
            </form>
        
        
        
        </div>
    );

}
export default BakeryAddDiscount;