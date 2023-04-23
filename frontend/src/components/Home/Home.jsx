import React, { useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import "./home.css";
import Product from "./product/Product";
import MetaData from "../layouts/MetaData";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productActions";
import Loader from "../layouts/loader/Loader";
import {useAlert} from "react-alert";
const Home = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, error, product, productCount } = useSelector(
    (state) => state.products
  );
  // console.log("ERE",error);
  useEffect(() => {
    
    if(error)
    {
      alert.error(error);
      dispatch(clearErrors);
    }
    
    dispatch(getProduct());
  }, [dispatch,error,alert ]);
  return (
    <>
      {loading ? (
        <Loader/>
      ) : (
        <>
          <MetaData title={"E-commerace"} />
          <div className="banner">
            <p>Welcome to Ecommerace</p>
            <h1>Find amazing product below</h1>
            <a href="#container">
              <button>
                Scroll
                <CgMouse />
              </button>
            </a>
          </div>
          <h2 className="homeHeading">Featured Products</h2>
          <div id="feature">
            {product && product.map((item,index) => <Product key = {index} product={item} />)}
          </div>
          <div className="container" id="container"></div>
        </>
      )}
    </>
  );
};

export default Home;
