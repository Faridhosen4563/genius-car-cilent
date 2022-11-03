import React from "react";
import About from "../About/About";
import Banner from "../Banner/Banner";
import Feature from "../Features/Feature";
import Products from "../Products/Products";
import Services from "../Services/Services";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <About></About>
      <Services></Services>
      <Products></Products>
      <Feature></Feature>
    </div>
  );
};

export default Home;
