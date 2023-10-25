import React from "react";
import "./SingleProuctOrganism.style.scss";
import SingleProductMolecule from "../../molecules/SingleProductMolecule/SingleProductMolecule";
import { useSelector } from "react-redux";
const SingleProuctOrganism = () => {
  const singlebook = useSelector((state) => state.book.singlebook);
  const role = useSelector((state) => state.user.role);
  return (
    <div className="single-product-modal-container">
      {role !== "admin" && (  
      <div className="spmc-image">
        <img src={singlebook && singlebook.imageUrl} alt="product"/>
      </div>
      )}
      <div className="spmc-details">
        {singlebook && <SingleProductMolecule singlebook={singlebook} />}
      </div>
    </div>
  );
};

export default SingleProuctOrganism;
