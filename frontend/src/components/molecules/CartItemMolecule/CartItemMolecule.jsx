import React from "react";
import "./CartItemMolecule.style.scss";
import Quantity from "../../atoms/Quantity/Quantity";
import CrossButton from "../../atoms/CrossButton/CrossButton";
import customAxios from "../../../Utils/customAxios";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../Store/Slices/cartSlice";
import { useEffect } from "react";
import { useState } from "react";
import RoundLoader from "../../atoms/RoundLoader/RoundLoader";
import { toast } from "react-toastify";
import { set } from "react-hook-form";

const CartItemMolecule = ({
  id,
  product_name,
  price,
  imageUrl,
  quantity,
  stock,
}) => {
  const [loading, setLoading] = useState(false);
  const [loadingCross, setLoadingCross] = useState(false);
  const [value, setValue] = useState(quantity);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(false);
    setLoadingCross(false);
  }, [price]);

 
  const callApi = (value, id, quantity) => {
    if (value > quantity) {
      const newvalueadd = value - quantity;
      customAxios
        .post("/cart/add", {
          book: id,
          quantity: newvalueadd,
        })
        .then((res) => {
          dispatch(addToCart(res.data.data));
        })
        .catch((err) => {
          toast.error(err.response.message);
        });
    }
    if (value < quantity) {
      const newvalueremove = quantity - value;
      customAxios
        .patch("/cart/remove", {
          book: id,
          quantity: newvalueremove,
        })
        .then((res) => {
          if (!res.data.data.books) {
            dispatch(
              addToCart({
                cart_total: 0,
              })
            );
          } else {
            dispatch(addToCart(res.data.data));
          }
        })
        .catch((err) => {
          toast.error(err.response.message);
        });
    }
  };

  useEffect(() => {
    const timeOutFunc = setTimeout(() => {
      callApi(value, id, quantity);
    }, 1000);

    return () => clearTimeout(timeOutFunc);
  }, [value]);

  const handleOnChange = (value) => {
    setValue(value);
    setLoading(true);
  };
  const handlecross = () => {
    setValue(0);
    setLoadingCross(true);
  };
  return (
    <div className="cart-item">
      <div className="cart-item-image">
        <img src={imageUrl} alt="product" />
      </div>
      <div className="cart-item-details">
        <div>
          <p>{product_name}</p>
          <div className="cart-item-quantity-price">
            <Quantity
              initialValue={quantity}
              min={1}
              max={stock}
              onChange={handleOnChange}
            />
            {loading ? <RoundLoader color="blackClass" /> : <h3>{price}</h3>}
          </div>
        </div>
        <div>
          {!loadingCross ?  <CrossButton onClick={handlecross} /> : <RoundLoader color="blackClass" />}
        </div>
      </div>
    </div>
  );
};

export default CartItemMolecule;
