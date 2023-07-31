import React from "react";
import { Link } from "react-router-dom";
import boxImage from "../images/box.jpg";
import image from "../images/icon.jpg"
import "./app.css"

const Sidebar = () => {
    return (
    <div className="pusher">
        <div className="ui primary left visible vertical sidebar menu">
            <div className="spacer"></div>
            <img className="mainimage ui small centered circular bordered image" src={image} alt="nice" />
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
