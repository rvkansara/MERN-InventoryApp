import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Routes, Root, Route} from 'react-router-dom';
import {uuid} from 'uuidv4'
import Sidebar from "./Sidebar";
import DataTable from './DataTable';
import ProductForm from './AddProductForm';
import EditProductForm from './EditProductForm';
import Header from './Header';
import axios from 'axios';
import api from "../api/product"
import product from '../api/product';

const App = () => {
  const [products, setProducts] = useState([]);
  const LOCAL_STORAGE_KEY = "products";
 
  //Handlers
  // const addProductHandler = (product) => {
  //   setProducts([...products, {id:uuid(), ...product}]);
  // } 
  
  // const updateProductHandler = (product) => {
  //   const {id, name, price, quantity} = product;
  //   const newProduct = products.map((product) => {
  //     return product.id === id ? product : product;
  //   });

  //   setProducts(newProduct);
  // }

  // const removeProductHandler = (id) => {
  //   const newProductList = products.filter((product) => {
  //     return product.id !== id;
  //   })

  //   setProducts(newProductList);
  // };

 //API Calls
  const retrieveProducts = async () => {
    const response = await api.get("/products");
    console.log(response);
    return response.data;
  }

 const addProduct = async (product) => {
    const request = {
      ...product
    };
    
    const response = await api.post("/products", request);
    setProducts([...products, response.data]);
  }

  const updateProduct = async (product) => {
    const response = await api.put(`/products/${product.id}`, product);
    const {id, name, price, quantity} = response.data;
    console.log(response.data);
    setProducts(products.map((product) => {
      return product.id === id ? product : {...response.data};
    }));
    getAllProducts();
  }

  const deleteProduct = async (id) => {
    await api.delete(`/products/${id}`);
    const newProductList = products.filter((product) => {
      return product._id !== id;
    })
  
    setProducts(newProductList);
  }

  const getAllProducts = async () => {
    const allProducts = await retrieveProducts();
    if (allProducts) setProducts(allProducts);
  }

  useEffect(() => {
    // const retrieveProducts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    // console.log(retrieveProducts);
    // if (retrieveProducts) setProducts(retrieveProducts);
    
    getAllProducts();
}, [])
 
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(products));
  }, [products]); 


  return (
  <div className = "ui container">
    
    <Router>
      <Sidebar/>
      <Routes>
        <Route path='/' exact element={<DataTable products = {products} removeProductID={deleteProduct}/>}/>
        <Route path='/addProduct' element={<ProductForm addProductHandler = {addProduct}/>}/>
        <Route path='/editProduct/:id' element={<EditProductForm products={products} updateProductHandler = {updateProduct}/>}/>
      </Routes>
    </Router>

    {/*<DataTable products = {products} getProductID={removeProductHandler}/>
  <ProductForm addProductHandler = {addProductHandler}/>}
  */}
  </div>
  );
};

export default App;