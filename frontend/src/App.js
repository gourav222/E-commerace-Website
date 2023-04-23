import "./App.css";
import Header from "./components/layouts/header/Header";
import { BrowserRouter as Router } from "react-router-dom";
import Webfont from "webfontloader";
import React from "react";
import Footer from "./components/layouts/footer/Footer";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import ProductDetails from "./components/Home/product/ProductDetails";
function App() {
  React.useEffect(() => {
    Webfont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
  }, []);
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route extact path="/" element={<Home/>} />
          <Route extact path ="/product/:id" element={<ProductDetails />}/>
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
