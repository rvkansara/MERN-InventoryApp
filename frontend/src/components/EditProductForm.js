import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

function EditProductForm(props) {
  const { id } = useParams();
  const product = props.products.find((product) => product._id === id);

  const [state, setState] = useState({
    name: "",
    price: "",
    quantity: "",
  });

  useEffect(() => {
    if (product) {
      console.log(product.name, product.price, product.quantity);
      setState({
        name: product.name,
        price: product.price,
        quantity: product.quantity,
      });
    } else {
      console.log("Product not found");
    }
  }, [product]);

  const add = (e) => {
    e.preventDefault();
    if (state.name === "" || state.price === "" || state.quantity === "") {
      alert("All the fields are mandatory!");
      return;
    }
    props.updateProductHandler({id, ...state });
  };

  return (
    <div className="ui main">
      <form className="ui form" onSubmit={add}>
        <div className="ui field">
          <label>Product Name</label>
          <input
            className="ui input"
            type="text"
            name="name"
            placeholder={state.name}
            value={state.name}
            onChange={(e) =>
              setState((prevState) => ({ ...prevState, name: e.target.value }))
            }
          />
        </div>
        <div className="field">
          <label>Product Price</label>
          <input
            className="ui input"
            type="text"
            name="price"
            placeholder={state.price}
            value={state.price}
            onChange={(e) =>
              setState((prevState) => ({ ...prevState, price: e.target.value }))
            }
          />
        </div>
        <div className="field">
          <label>Product Quantity</label>
          <input
            className="ui input"
            type="text"
            name="quantity"
            placeholder={state.quantity}
            value={state.quantity}
            onChange={(e) =>
              setState((prevState) => ({
                ...prevState,
                quantity: e.target.value,
              }))
            }
          />
        </div>
        <button className="ui button blue">Edit</button>
        <Link to={"/"} >
          <button className="ui button grey right">Home</button>
        </Link>
      </form>
    </div>
  );
}

export default EditProductForm;
