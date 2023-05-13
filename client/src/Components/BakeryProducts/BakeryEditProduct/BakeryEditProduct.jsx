import React, {useState} from "react";

function BakeryEditProduct({}){
    //declaring states for dynamic data
    const [variantGroups, setVariantGroups] = useState([])
    const [discounts, setDiscounts] = useState([])
    const [variantGroup, setVariantGroup] = useState({})

    //declaring form controlled input states
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("")
    const [discount, setDiscount] = useState({})
    const [isChecked, setIsChecked] = useState(true);
    const [productImages, setProductImages] = useState([]);
    const [imageFiles, setImageFiles] = useState([]);

    //declaring reference function variable
    const uploadImagesRef = useRef(null)

    //declaring and initializing icon styling variables
    const uploadBtnIconStyle = { color: "black", marginTop: "10px" };
    const deleteBtnIconStyle = {color: "black"}

    //creating loading state
    const [isLoading, setIsLoading] = useState(false);

    //declaring and initializing navigate variable function
    const navigate = useNavigate();

    return(
        <>
        </>

    );

}
export default BakeryEditProduct;