import React, { useState } from "react";
import {FaSearch} from 'react-icons/fa';
import { IconContext } from "react-icons/lib";

function Search({placeholderText, handleSearch}) {
  const [searchData, setSearchData] = useState("");
  const iconStyles = { marginRight: "10px", marginLeft: "6px", color: "black" };

  function handleOnChange(event){
    event.preventDefault();
    setSearchData(event.target.value);
    const searchValue = event.target.value;
    handleSearch(searchValue);
  }

  return (
    <div className={"searchContainer"}>
      <IconContext.Provider value={{ size: "20px" }}>
        <FaSearch style={iconStyles}/>
      </IconContext.Provider>
      <input
        className={"search"}
        type="text"
        placeholder={placeholderText}
        value={searchData}
        onChange={handleOnChange}
      />
    </div>
  );
}

export default Search;