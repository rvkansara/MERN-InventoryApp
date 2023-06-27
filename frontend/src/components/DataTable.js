import React from "react";

const dataTable = (props) => {
    const renderTable = props.products.map((products) => {
        return (
            <tr key = {products.id}>
                <td>{products.name}</td>
                <td>{products.price}</td>
                <td>{products.quantity}</td>
                <td class = "left aligned">
                    <i class = "edit icon" style = {{color:"blue"}}></i>
                    <i class = "trash alternate outline icon" style={{color:"red"}} onClick={() => props.getProductID(products.id)}></i>
                </td>
            </tr>
        )
    });
    return (
        <table class="ui celled table">
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
      );
};

export default dataTable;