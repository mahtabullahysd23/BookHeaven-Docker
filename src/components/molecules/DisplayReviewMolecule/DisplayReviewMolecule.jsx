import React from "react";
import "./DisplayReviewMolecule.style.scss";
import DisplayRating from "../../atoms/DisplayRating/DisplayRating";
import CrossButton from "../../atoms/CrossButton/CrossButton";
import customAxios from "../../../Utils/customAxios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addAllBooks } from "../../../Store/Slices/bookSlice";
const Review = ({ userImage, userName, rating, comment, dateTime ,reviewId}) => {
const dispatch = useDispatch();

  const handleDeleteClice = () => {
    customAxios
      .delete(`/reviews/delete/${reviewId}`)
      .then((res) => {
        console.log(res);
        toast.success("Review Deleted Successfully");
        dispatch(addAllBooks(reviewId));
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
      });
      
  }
  return (
    <div className="review">
      <div className="user-info">
        <img src={userImage} alt={`User ${userName}`} className="user-image" />
        <div className="user-details">
          <p className="user-name">{userName}</p>
          <div className="rating">
            <DisplayRating rating={rating} />
          </div>
        </div>
        <div className="review-cross">
           <CrossButton onClick={handleDeleteClice}/>
        </div>
      </div>
      <p className="comment">{comment}</p>
      <p className="date-time">{dateTime}</p>
    </div>
  );
};

export default Review;
