import React from "react";
import {Link} from "react-router-dom";

const BreadCrumb = () => {
  const pathName = window.location.pathname.split("/").join(" / ");
  return (
    <div className="main-wrapper">
        <p>
            <Link to="/"> Home</Link> {pathName}
        </p>
        
    </div>
  )
};

export default BreadCrumb;