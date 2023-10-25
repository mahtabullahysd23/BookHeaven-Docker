import React, { useEffect } from "react";
import { SlPencil } from "react-icons/sl";
import { SlTrash } from "react-icons/sl";
import BUtton from "../Buttons/Button";

const TransactionCard = ({ name,total, email, address,onEdit,status,city}) => {

    const handleEdit = () => {
        onEdit();
    }
  return (
    <div className="main-card-user transaction">
      <div className="image-user">
        <img src="/myimg.png"></img>
      </div>
      <div>
        <div className="name-user">
          <h3>{name}</h3>
        </div>
        <div className="email-user">
          <p>{email}</p>
        </div>
      </div>
      <div>
        <div className="address-user">
            <h5>Address</h5>
          <p>{address}</p>
        </div>
      </div>
      <div>
        <div className="address-user">
            <h5>city</h5>
          <p>{city}</p>
        </div>
      </div>
      <div className="address-user">
            <h5>Total</h5>
          <p>{total}</p>
        </div>
      <div className="address-user">
            <h5>Status</h5>
          <p>{status}</p>
        </div>
    </div>
  );
};

export default TransactionCard;
