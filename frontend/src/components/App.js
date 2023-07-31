import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { uuid } from 'uuidv4';
import Sidebar from './Sidebar';
import DataTable from './DataTable';
import ProductForm from './AddProductForm';
import EditProductForm from './EditProductForm';
import axios from 'axios';
import api from '../api/product';
import "./app.css"
import{useRef} from 'react';

import firebase from "firebase/compat/app";

import "firebase/compat/firestore";
import "firebase/compat/auth";

import {useAuthState} from 'react-firebase-hooks/auth';
import {useCollectionData} from "react-firebase-hooks/firestore";

firebase.initializeApp({
  apiKey: "AIzaSyAYJufU0CZezeuu_oL5eOEkt6XbfySklvI",
  authDomain: "internshipfinder-34802.firebaseapp.com",
  projectId: "internshipfinder-34802",
  storageBucket: "internshipfinder-34802.appspot.com",
  messagingSenderId: "631355688430",
  appId: "1:631355688430:web:239923a00f39c74c09faff",
  measurementId: "G-NW6Y8PH4TS"
})

const auth = firebase.auth();
const firestore = firebase.firestore();

  const App = () => {
    const [products, setProducts] = useState([]);
    const LOCAL_STORAGE_KEY = "products";
    const [user] =  useAuthState(auth);

    //API Calls
    const retrieveProducts = async () => {
      try {
        const response = await api.get("/products");
        return response.data;
      } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
      }
    };

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
  
    return (
      <div className="app">
            {user ? (
                <Router>
                  <div className="sidebar">
                    <Sidebar />
                  </div>
                    <Header />
                    <div className="main-content">
                        
                        <Routes>
                            <Route path="/" element={<DataTable products={products} removeProductID={deleteProduct} />} />
                            <Route path="/addProduct" element={<ProductForm addProductHandler={addProduct} />} />
                            <Route path="/editProduct/:id" element={<EditProductForm products={products} updateProductHandler={updateProduct} />} />
                        </Routes>
                    </div>
                </Router>
            ) : (<SignIn />)}
        </div>
    );
  };
  
  const PrivateRoute = ({ element, redirectTo, condition }) => {
    return condition ? element : <Navigate to={redirectTo} />;
  };

  //Extra Functions
  function SignIn() {
    const [error, setError] = useState(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
  
    const signInWithGoogle = async () => {
      const provider = new firebase.auth.GoogleAuthProvider();
      try {
        auth.signInWithPopup(provider);
      } catch (error) {
        if (error.code === "auth/cancelled-popup-request") {
          console.log("Popup request was canceled");
        } else {
          console.error("Error signing in with Google:", error);
        }
      }
    };
  
    const signUpWithEmail = async (event) => {
      event.preventDefault();
      const email = emailRef.current.value;
      const password = passwordRef.current.value;
  
      try {
        await auth.createUserWithEmailAndPassword(email, password);
        setError(null); // Reset the error state if sign up is successful.
      } catch (error) {
        console.error("Error signing up with email:", error);
        setError("Error signing up with email. Please try again.");
      }
    };
  
    const signInWithEmail = async (event) => {
      event.preventDefault();
      const email = emailRef.current.value;
      const password = passwordRef.current.value;
    
      try {
        await auth.signInWithEmailAndPassword(email, password);
        setError(null); // Reset the error state if sign-in is successful.
      } catch (error) {
        if (error.code === "auth/user-not-found") {
          setError("User not found. Please sign up instead.");
        } else if (error.code === "auth/wrong-password") {
          setError("Invalid password. Please try again.");
        } else {
          setError("Error signing in with email. Please try again.");
        }
      }
    };
  
    return (
      <div className='SignIn'>
        <div className='ui middle aligned center aligned two column grid'>
          <div className='column'>
            <form className='ui large form' onSubmit={signInWithEmail}>
              <div className="ui raised segment">
                <h1>Sign in</h1>
                <div className="field error">
                  <div className="ui labeled left icon input">
                    <i className="user icon"></i>
                    <input type="text" name="email" placeholder="E-mail address" ref={emailRef} />
                  </div>
                </div>
                <div className="field error">
                  <div className="ui labeled left icon input">
                    <i className="key icon"></i>
                    <input type="password" name="password" placeholder="Password" ref={passwordRef} />
                  </div>
                </div>
                <div className="ui fluid buttons">
                  <button className="ui green submit button">Login</button>
                  <div className="or"></div>
                  <button className="ui button" onClick={signUpWithEmail}>Sign Up</button>
                </div>
                {error && (
                  <div className="ui error message">
                    {error}
                  </div>
                )}
              </div>
            </form>
            <div className="ui horizontal divider">
              Or
            </div>
            <button className='ui red labeled icon button' onClick={signInWithGoogle}>
              <i className="google icon"></i>
              Sign in with Google
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  function SignOut(){
    return auth.currentUser && (
      <div className='' onClick={() => auth.signOut()}>Sign Out</div>
    )
  }
  
  function Header(){
    return(
      <div className='push'>
        <div className='ui top fluid menu'>
          <a className="right item"><SignOut/></a>
        </div>
      </div>
    )
  }



  export default App;