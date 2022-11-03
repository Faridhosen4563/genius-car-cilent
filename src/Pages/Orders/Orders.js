import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider";
import OrderRow from "./OrderRow";

const Orders = () => {
  const { user, logOut } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:5000/orders?email=${user?.email}`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("geniusToken")}`,
      },
    })
      .then((res) => {
        if (res.status === 401 || res.status === 403) {
          return logOut();
        }
        return res.json();
      })
      .then((data) => setOrders(data))
      .catch((err) => console.error(err));
  }, [user?.email, logOut]);
  const handleDelete = (id) => {
    const agree = window.confirm("Are you sure you want to delete this order");
    if (agree) {
      fetch(`http://localhost:5000/orders/${id}`, {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${localStorage.getItem("geniusToken")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount > 0) {
            alert("Order delete successfully");
            const remainingOrder = orders.filter((order) => order._id !== id);
            setOrders(remainingOrder);
          }
          console.log(data);
        });
    }
  };
  const handleStatusUpdate = (id) => {
    fetch(`http://localhost:5000/orders/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("geniusToken")}`,
      },
      body: JSON.stringify({
        status: "Approved",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          const reamining = orders.filter((ord) => ord._id !== id);
          const approve = orders.find((ord) => ord._id === id);
          approve.status = "Approved";
          const newOrders = [approve, ...reamining];
          setOrders(newOrders);
        }
      });
  };
  return (
    <div>
      <h2>You have {orders.length} orders</h2>
      <div className="my-20">
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
                <th>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>
                <th>Name</th>
                <th>Job</th>
                <th>Email</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <OrderRow
                  key={order._id}
                  order={order}
                  handleDelete={handleDelete}
                  handleStatusUpdate={handleStatusUpdate}
                ></OrderRow>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Orders;
