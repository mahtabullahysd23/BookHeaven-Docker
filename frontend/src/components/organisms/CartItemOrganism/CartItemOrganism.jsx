import React, { useEffect } from "react";
import "./CartItemOrganism.style.scss";
import CartItemMolecule from "../../molecules/CartItemMolecule/CartItemMolecule";
import Button from "../../atoms/Buttons/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { closeModal } from "../../../Store/Slices/modalSlice";
import customAxios from "../../../Utils/customAxios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { addNumberOfItems } from "../../../Store/Slices/cartSlice";
import { BsCartX } from "react-icons/bs";
import { toast } from "react-toastify";

const CartItemOrganism = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [books, setBooks] = useState([]);

  const booksinCart = useSelector((state) => state.cart.cart.cart_total);
  const email = useSelector((state) => state.user.email);
  useEffect(() => {
    customAxios
      .get("/cart/view")
      .then((res) => {
        setBooks(res.data.data);
        dispatch(addNumberOfItems(res.data.data.books.length));
      })
      .catch((err) => {
        setBooks([]);
        dispatch(addNumberOfItems(0));
      });
  }, [booksinCart, email]);

  return (
    <div className="cart-side-modal">
      <div className="cart-side-modal-header">
        <h3>Cart</h3>
      </div>
      <div className="flex-column-between h-75 gap-3 ">
        <div className="w-100">
          <div className="Item-list">
            {books.books ? (
              books.books.map((book) => (
                <CartItemMolecule
                  key={book.book._id}
                  id={book.book._id}
                  product_name={book.book.name}
                  price={book.Item_total}
                  imageUrl={book.book.imageUrl}
                  quantity={book.quantity}
                  stock={book.book.stock}
                />
              ))
            ) : (
              <h3 className="flex-center mt-2 mb-2">No items in cart</h3>
            )}
          </div>
          {books.cart_total ? (
            <div className="flex-between mt-1 ">
              <h3>Subtotal:</h3>
              <h3>{books.cart_total}</h3>
            </div>
          ) : null}
        </div>
        <div className="w-100">
          <div className="cart-button-group mb-1">
            <Button
              className="black-button w-100 mt-1"
              text="Checkout"
              onClick={() => {
                books.books&&navigate("/checkout");
                dispatch(closeModal("cartModal"));
                !books.books&&toast.error("No items in cart");
              }}
            />
            <Button
              className="ash-button w-100 mt-1"
              onClick={() => {
                navigate("/books");
                dispatch(closeModal("cartModal"));
              }}
              text="Continue Shopping"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItemOrganism;
