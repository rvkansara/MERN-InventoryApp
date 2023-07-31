import React from "react";
import { Link } from "react-router-dom";
import "./app.css"

const dataTable = (props) => {
    const renderTable = props.products.map((products) => {
        const {name, price, quantity} = products;
        return (
            <tr key = {products._id}>
                <td>{name}</td>
                <td>{price}</td>
                <td>{quantity}</td>
                <td className = "left aligned">
                    <Link to={`/editProduct/${products._id}`}>
                        <i className = "edit icon" style = {{color:"light blue"}}></i>
                    </Link>
                    <i className = "trash alternate outline icon" style={{color:"red"}} onClick={() => props.removeProductID(products._id)}></i>
                </td>
            </tr>
        )
    });
    return (
        <div className = "Datatable">
            <Link to={"/addProduct"}>
                <button className='addProductButton ui blue labeled icon button'>
                <i className="add icon"></i>
                    Add Product
                </button>
            </Link>
             
            <table className="ui celled table">
        
            <thead>
            <tr><th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Actions</th>
            </tr></thead>
            <tbody>
                {renderTable}
            </tbody>
        </table>
      </div>
      );
};

export default dataTable;