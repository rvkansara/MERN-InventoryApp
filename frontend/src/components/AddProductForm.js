import React from "react";
import { Link } from "react-router-dom";

class ProductForm extends React.Component{
    state = {
        name: "",
        price: "",
        quantity: ""
    }

    add = (e) => {
        e.preventDefault();
        if(this.state.name === "" || this.state.price === "" || this.state.quantity === ""){
            alert("All the fields are mandatory!");
            return;
        }
        this.props.addProductHandler(this.state);
        this.setState({name:"" , price: "", quantity: ""});
    }
    
    render(){
        return (
        <div className = "ui main">
            <h1> Add Product</h1>
            
            <form className="ui form" onSubmit={this.add}>
                <div className="ui field">
                    <label>Product Name</label>
                    <input 
                    className = "ui input"
                    type = "text"
                    name = "name"
                    placeholder = "Product Name"
                    value={this.state.name}
                    onChange={(e)=> this.setState({name: e.target.value})}
                    />
                </div>
                <div className="field">
                    <label>Product Price</label>
                    <input 
                    className = "ui input"
                    type = "text"
                    name = "price"
                    placeholder = "Product Price"
                    value={this.state.price}
                    onChange={(e)=> this.setState({price: e.target.value})}
                    />
                </div>
                <div className="field">
                    <label>Product Quantity</label>
                    <input 
                    className = "ui input"
                    type = "text"
                    name = "quantity"
                    placeholder = "Product Quantity"
                    value={this.state.quantity}
                    onChange={(e)=> this.setState({quantity: e.target.value})}
                    />
                </div>
                <button className="ui button blue">Add</button>
                <Link to={"/"}>
                    <button className="ui button grey right">Home</button>
                </Link>
            </form>
        </div>
        )
    }
}

export default ProductForm;