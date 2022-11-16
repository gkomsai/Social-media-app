import React from 'react'
import logo from "../../assets/logo.png"
import { BiSearch } from "react-icons/bi";
import "./searchbar.css"



const Searchbar = () => {

  
  return (
    <div className="LogoSearch">
      <img src={logo} alt="" />
      <div className="Search">
          <input type="text" placeholder="#Explore"/>
          <div className="s-icon">
          <BiSearch/>
          </div>
      </div>
    </div>
  );
};
  


export default Searchbar