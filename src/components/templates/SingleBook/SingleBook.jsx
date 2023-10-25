import React from "react";
import "./SingleBook.style.scss";
import SingleProuctOrganism from "../../organisms/SingleProuctOrganism/SingleProuctOrganism";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import customAxios from "../../../Utils/customAxios";
import { useDispatch, useSelector } from "react-redux";
import { addSingleBook } from "../../../Store/Slices/bookSlice";
import Loadder from "../../atoms/Loadder/Loadder";
import DisplayRating from "../../atoms/DisplayRating/DisplayRating";
import RatingStatsMolecule from "../../molecules/RatingStatesMolecule/RatingStatsMolecule";
import DisplayReviewMolecule from "../../molecules/DisplayReviewMolecule/DisplayReviewMolecule";
import FormInput from "../../atoms/FormInput/FormInput";
import { useForm } from "react-hook-form";
import Button from "../../atoms/Buttons/Button";
import LinearLoader from "../../atoms/LinearLoader/LinearLoader";
import StarRadio from "../../atoms/StarRadio/StarRadio";
import { Controller } from "react-hook-form";
import { toast } from "react-toastify";
const SingleBook = () => {
  const [loading, Setloading] = useState(false);
  const [posted, Setposted] = useState(false);
  const dispatch = useDispatch();
  const { id } = useParams();
  const singlebook = useSelector((state) => state.book.singlebook);
  const [loadingPost, SetloadingPost] = useState(false);
  const role = useSelector((state) => state.user.role);
const deleted = useSelector((state) => state.book.allBooks);


  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onChange",
  });

  useEffect(() => {
    console.log(id);
    Setloading(true);
    window.scrollTo(0, 0);
    customAxios
      .get(`/books/${id}`)
      .then((res) => {
        dispatch(addSingleBook(res.data.data));
        Setloading(false);
        console.log(res.data.data);
      })
      .catch((err) => {
        Setloading(false);
        toast.error(err.response.data.message);
      });
  }, [posted,deleted]);

  const calculateRatingCounts = (reviews) => {
    const ratingCounts = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    };

    for (const review of reviews) {
      const rating = review.rating;
      ratingCounts[rating]++;
    }
    return ratingCounts;
  };

  const onSubmit = (data) => {
    data.rating = parseInt(data.rating);
    if (data.rating === 0) {
      delete data.rating;
    }
    if (data.review === "") {
      delete data.review;
    }
    SetloadingPost(true);
    const modifiedData = {
      ...data,
      book: id,
    };
    customAxios
      .post(`/reviews/post`, modifiedData)
      .then((res) => {
        SetloadingPost(false);
        toast.success(res.data.message);
        Setposted(!posted);
        reset();
      })
      .catch((err) => {
        SetloadingPost(false);
        if (err.response.status === 400 || err.response.status === 401) {
          return toast.error(err.response.data.message);
        } else {
          toast.error(err.response.data.error[0].msg);
        }
      });
  };

  return (
    <>
      {loading ? (
        <Loadder />
      ) : (
        <div className="single-book-container">
          <div className="top-portion">
            <SingleProuctOrganism />
          </div>
          <div className="single-book-rating-details">
            <div className="rating-title flex-center pb-2 bb-1">
              <h3>Rating & Reviews</h3>
            </div>
            <div className="rating-content-group">
              <div className="rating-details w-100">
                <div className="rating-value flex-column-center w-100">
                  <h1>
                    {singlebook ? parseFloat(singlebook.rating.toFixed(2)) : 0}
                  </h1>
                  <DisplayRating rating={singlebook ? singlebook.rating : 0} />
                  <p>{`(${
                    singlebook ? singlebook.reviews.length : 0
                  } Customer Review)`}</p>
                </div>
                <RatingStatsMolecule
                  one={
                    singlebook
                      ? calculateRatingCounts(singlebook.reviews)[1]
                      : 0
                  }
                  two={
                    singlebook
                      ? calculateRatingCounts(singlebook.reviews)[2]
                      : 0
                  }
                  three={
                    singlebook
                      ? calculateRatingCounts(singlebook.reviews)[3]
                      : 0
                  }
                  four={
                    singlebook
                      ? calculateRatingCounts(singlebook.reviews)[4]
                      : 0
                  }
                  five={
                    singlebook
                      ? calculateRatingCounts(singlebook.reviews)[5]
                      : 0
                  }
                  total={singlebook ? singlebook.reviews.length : 0}
                />
              </div>
              <div className="post-review">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="input-rating flex-column-center mb-2">
                    <label>Your Rating:</label>
                    <Controller
                      name="rating"
                      control={control}
                      defaultValue={0}
                      render={({ field }) => (
                        <StarRadio
                          field={field}
                          initialRating={field.value}
                          onRatingChange={field.onChange}
                        />
                      )}
                    />
                  </div>
                  <FormInput
                    labelText="Comment"
                    type="text"
                    name="review"
                    defaultValue={""}
                    control={control}
                    errors={errors}
                    rules={{
                      maxLength: {
                        value: 50,
                        message: "Name should be less than 50 characters",
                      },
                    }}
                  />
                  {loadingPost ? (
                    role!="admin" && 
                    <Button
                      type="submit"
                      disabled={true}
                      text={<LinearLoader />}
                    />
                  ) : (
                    role!="admin" && 
                    <Button type="submit" text="Post" />
                  )}
                </form>
              </div>
            </div>
            <div className="reviews-content">
              {singlebook ? (
                singlebook.reviews.map((review, index) => (
                  <DisplayReviewMolecule
                    key={index}
                    userImage="/myimg.png"
                    userName={review.user.name}
                    rating={review.rating}
                    comment={review.review}
                    dateTime={review.createdAt}
                    userId={review.user._id}
                    reviewId={review._id}
                  />
                ))
              ) : (
                <h1>No Review</h1>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SingleBook;
