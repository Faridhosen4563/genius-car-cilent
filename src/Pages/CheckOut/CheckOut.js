import React, { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider";

const CheckOut = () => {
  const { _id, title, price } = useLoaderData();
  const { user } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = `${form.firstName.value} ${form.lastName.value}`;
    const email = user?.email || "unregister";
    const phone = form.phone.value;
    const message = form.message.value;

    const order = {
      service: _id,
      serviceName: title,
      price,
      customer: name,
      email,
      phone,
      message,
    };

    fetch("http://localhost:5000/orders", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("geniusToken")}`,
      },
      body: JSON.stringify(order),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          alert("Order placed successfully");
          form.reset();
        }
      });
  };

  return (
    <div>
      <h1>Service Name : {title}</h1>
      <h2>Price : ${price}</h2>
      <form onSubmit={handleSubmit} className="my-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 ">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            className="input input-bordered input-success w-full"
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            className="input input-bordered input-success w-full"
          />
          <input
            type="number"
            name="phone"
            placeholder="Your Phone Number"
            className="input input-bordered input-success w-full"
            required
          />
          <input
            type="text"
            name="email"
            defaultValue={user?.email}
            readOnly
            placeholder="Your Email"
            className="input input-bordered input-success w-full"
          />
        </div>
        <textarea
          className="my-6 textarea textarea-success w-full h-44"
          placeholder="Your Message"
          name="message"
        ></textarea>
        <button
          className="btn btn-success text-white font-bold w-full"
          type="submit"
        >
          Place Order
        </button>
      </form>
    </div>
  );
};

export default CheckOut;
