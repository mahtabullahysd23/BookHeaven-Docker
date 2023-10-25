import React from "react";
import "./SingleProductMolecule.style.scss";
import Tag from "../../atoms/Tag/Tag";
import DisplayRating from "../../atoms/DisplayRating/DisplayRating";
import Quantity from "../../atoms/Quantity/Quantity";
import Button from "../../atoms/Buttons/Button";
import { useState } from "react";
import customAxios from "../../../Utils/customAxios";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../Store/Slices/cartSlice";
import LinearLoader from "../../atoms/LinearLoader/LinearLoader";
import { useSelector } from "react-redux";
import FormInput from "../../atoms/FormInput/FormInput";
import { useForm } from "react-hook-form";
import { addAllBooks } from "../../../Store/Slices/bookSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


const SingleProductMolecule = ({ singlebook }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loadingAddtoCart, setLoadingAddtoCart] = useState(false);
  const [value, setValue] = useState(1);
  const [loading, setLoading] = useState(false);
  const role = useSelector((state) => state.user.role);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const HandleQuantity = (value) => {
    setValue(value);
    console.log(value);
  };

  const handleAddToCart = () => {
    setLoadingAddtoCart(true);
    customAxios
      .post("/cart/add", {
        book: singlebook._id,
        quantity: value,
      })
      .then((res) => {
        dispatch(addToCart(res.data.data));
        toast.success(res.data.message);
        setLoadingAddtoCart(false);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          navigate("/signin");
          toast.error("Please Signin to add to cart");
        } else {
          toast.error(err.response.data.error[0].msg);
        }
        setLoadingAddtoCart(false);
      });
  };

  const onSubmit = (data) => {
    setLoading(true);
    customAxios
      .patch(`/books/update/${singlebook._id}`, data)
      .then((res) => {
        toast.success(res.data.message);
        dispatch(addAllBooks(singlebook._id));
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        setLoading(false);
      });
  }

  return (
    
    <div className="single-product-right">
      <Tag text={singlebook.tag} color="green" />
      <h2>{singlebook.name}</h2>
      <div className="rating-single-product">
        <DisplayRating rating={singlebook.rating} />
        <p>
          {`${parseFloat(singlebook.rating.toFixed(2))} Rating (${
            singlebook.reviews.length
          } Customer reviews)`}{" "}
        </p>
      </div>
      <p>{singlebook.description}</p>
      <div className="price-quantity">
        <div className="price-single-product">
          <p>Price :</p>
          <h2>{`$ ${singlebook.price}`}</h2>
        </div>
        {role != "admin" && (
          <div className="quantity-single-product">
            <p>Quantity :</p>
            <Quantity
              initialValue={value}
              min={1}
              max={singlebook.stock}
              onChange={HandleQuantity}
            />
          </div>
        )}
      </div>
      {role != "admin" && (
        <div className="btn-group-single-prouct">
          {loadingAddtoCart ? (
            <Button
              className="black-button w-100"
              disabled={true}
              text={<LinearLoader />}
            />
          ) : (
            <Button
              text="Add To Cart"
              className="black-button w-100"
              onClick={handleAddToCart}
            />
          )}
          <Button text="Add To WishList" className="ash-button  w-100" />
        </div>
      )}

      {
        role!="admin" &&
        <div className="product-info">
        <div className="single-info">
          <h5>ISBN:</h5>
          <p>{singlebook.isbn}</p>
        </div>
        <div className="single-info">
          <h5>Author:</h5>
          <p>{singlebook.author}</p>
        </div>
        <div className="single-info">
          <h5>Publisher:</h5>
          <p>{singlebook.publisher}</p>
        </div>
        <div className="single-info">
          <h5>Language:</h5>
          <p>{singlebook.language}</p>
        </div>
        <div className="single-info">
          <h5>Pages:</h5>
          <p>{singlebook.pages}</p>
        </div>
      </div>
}
      {role == "admin" && (
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormInput
              labelText="Name"
              type="text"
              name="name"
              control={control}
              errors={errors}
              defaultValue={singlebook.name}
              rules={{
                required: "Name is required",
                maxLength: {
                  value: 20,
                  message: "Name should be less than 20 characters",
                },
              }}
            />

            <FormInput
              labelText="Author"
              type="text"
              name="author"
              control={control}
              errors={errors}
              defaultValue={singlebook.author}
              rules={{
                required: "Author is required",
                maxLength: {
                  value: 20,
                  message: "Author should be less than 20 characters",
                },
              }}
            />

            <FormInput
              labelText="Publisher"
              type="text"
              name="publisher"
              control={control}
              errors={errors}
              defaultValue={singlebook.publisher}
              rules={{
                required: "Publisher is required",
                maxLength: {
                  value: 20,
                  message: "Publisher should be less than 20 characters",
                },
              }}
            />
            <FormInput
              labelText="Language"
              type="text"
              name="language"
              control={control}
              errors={errors}
              defaultValue={singlebook.language}
              rules={{
                required: "Language is required",
                maxLength: {
                  value: 20,
                  message: "Language should be less than 20 characters",
                },
              }}
            />

            <FormInput
              labelText="Pages"
              type="number"
              name="pages"
              control={control}
              errors={errors}
              defaultValue={singlebook.pages}
              rules={{
                required: "Pages is required",
                maxLength: {
                  value: 20,
                  message: "Pages should be less than 20 characters",
                },
              }}

            />

            <FormInput
              labelText="Price"
              type="number"
              name="price"
              control={control}
              errors={errors}
              defaultValue={singlebook.price}
              rules={{
                required: "Price is required",
                maxLength: {
                  value: 20,
                  message: "Price should be less than 20 characters",
                },
              }}        />  

            <FormInput
              labelText="Stock"
              type="number"
              name="stock"
              control={control}
              errors={errors}
              defaultValue={singlebook.stock}
              rules={{
                required: "Stock is required",
                maxLength: {
                  value: 20,
                  message: "Stock should be less than 20 characters",
                },
              }}
            />

            
             { loading ? (
                <Button type="submit" disabled={true} text={<LinearLoader />} />
              ) : (
                <Button type="submit" text="Update Book" />
              )
              }



          </form>
        </div>
      )}
    </div>
  );
};

export default SingleProductMolecule;
