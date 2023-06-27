import React, {useEffect, useState} from 'react';
import {uuid} from 'uuidv4'
import Sidebar from "./components/Sidebar";
import DataTable from './components/DataTable';
import ProductForm from './components/AddProductForm';



const App = () => {
  const [products, setProducts] = useState([]);
  const LOCAL_STORAGE_KEY = "products";
 
  const addProductHandler = (product) => {
    setProducts([...products, {id:uuid(), ...product}]);
  } 

  const removeProductHandler = (id) => {
    const newProductList = products.filter((product) => {
      return product.id !== id;
    })

    setProducts(newProductList);
  };
  
  useEffect(() => {
    const retrieveProducts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (retrieveProducts) setProducts(retrieveProducts);
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(products));
  }, [products]); 



  return (
  <div>
    <h1>React App</h1>
    <Sidebar/>
    <DataTable products = {products} getProductID={removeProductHandler}/>
    <ProductForm addProductHandler = {addProductHandler}/>
  </div>
  );
};

export default App;