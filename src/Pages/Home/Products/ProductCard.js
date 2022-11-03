import React from "react";
import { FaStar } from "react-icons/fa";

const ProductCard = ({ product }) => {
  const { img, title, price } = product;
  return (
    <div className="card w-full border-2 border-gray-300 ">
      <figure className="px-10 pt-10">
        <img src={img} alt="Shoes" className="rounded-xl w-full h-44" />
      </figure>
      <div className="card-body items-center text-center">
        <div className="flex text-yellow-500">
          <FaStar></FaStar>
          <FaStar></FaStar>
          <FaStar></FaStar>
          <FaStar></FaStar>
          <FaStar></FaStar>
        </div>
        <h2 className="card-title font-bold">{title}</h2>
        <p className="text-xl text-orange-600 font-semibold"> ${price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
