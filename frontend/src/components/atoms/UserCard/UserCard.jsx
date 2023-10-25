import React, { useEffect } from "react";
import "./UserCard.style.scss";
import { SlPencil } from "react-icons/sl";
import { SlTrash } from "react-icons/sl";

const UserCard = ({role, name,banned, email, address,onEdit,locked}) => {

    const handleEdit = () => {
        onEdit();
    }
  return (
    <div className="main-card-user ">
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
      <div className="address-user">
            <h5>Banned</h5>
          <p>{banned?'Banned':'N/A'}</p>
        </div>
      <div className="address-user">
            <h5>locked</h5>
          <p>{locked?'Locked':'N/A'}</p>
        </div>
        <div className="address-user">
            <h5>Role</h5>
          <p>{role}</p>
        </div>
      <div className="pencil">
        <SlPencil onClick={handleEdit} />
      </div>
    </div>
  );
};

export default UserCard;
