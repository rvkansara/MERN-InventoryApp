import React from "react";
import { Link } from "react-router-dom";
import boxImage from "../images/box.jpg";

const Sidebar = () => {
    return (
    <div className="push">
        <div className="ui left visible vertical sidebar menu">
            <img className="ui small centered circular image" src={boxImage} alt="nice" />
            <h1 className="ui centered teal header">
                Inventory App
            </h1>
            <div className="ui divider"></div>
            <Link to="/" className="item">
                <i className="home icon"></i>
                Home
            </Link>
            <Link to="/addProduct" className="item">
                <i className="add icon"></i>
                Add Product
            </Link>
        </div>
    </div>
    )
}

export default Sidebar;
