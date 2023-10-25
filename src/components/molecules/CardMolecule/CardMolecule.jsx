import DisplayRating from "../../atoms/DisplayRating/DisplayRating";
import Tag from "../../atoms/Tag/Tag";
import "./CardMolecule.style.scss";
import { FaEye } from "react-icons/fa";
import { BsFillCartPlusFill } from "react-icons/bs";
import { RiHeart2Fill } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { openModal } from "../../../Store/Slices/modalSlice";
import { addToCart } from "../../../Store/Slices/cartSlice";
import customAxios from "../../../Utils/customAxios";
import { addAllBooks, addSingleBook } from "../../../Store/Slices/bookSlice";
import RoundLoader from "../../atoms/RoundLoader/RoundLoader";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { BiEditAlt } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import setDeletedBook from "../../../Store/Slices/bookSlice";
import { toast } from "react-toastify";

const CardMolecule = ({
  id,
  name,
  price,
  rating,
  discount,
  tag,
  imgUrl,
  stock,
}) => {
  const [loading, setLoading] = useState(false);
  const [loadingeye, setLoadingeye] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const role = useSelector((state) => state.user.role);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClickAddtoCart = (event) => {
    event.stopPropagation();
    setLoading(true);
    customAxios
      .post("/cart/add", {
        book: id,
        quantity: 1,
      })
      .then((res) => {
        setLoading(false);
        dispatch(addToCart(res.data.data));
        toast.success(res.data.message);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          navigate("/signin");
          toast.error("Please Signin to add to cart");
        } else {
          toast.error(err.response.data.error[0].msg);
        }
        setLoading(false);
      });
  };

  const handleClickQuickView = (event) => {
    event.stopPropagation();
    setLoadingeye(true);
    customAxios.get(`/books/${id}`).then((res) => {
      dispatch(addSingleBook(res.data.data));
      dispatch(openModal("eyeModal"));
      setLoadingeye(false);
    });
  };

  const handleEdit = (event) => {
    event.stopPropagation();
    navigate(`/edit/${id}`);
  };

  const handleDelete = (event) => {
    event.stopPropagation();
    customAxios
      .delete(`/books/delete/${id}`)
      .then((res) => {
        toast.success(res.data.message);
        dispatch(addAllBooks(id));
        setDeleted(!deleted);
        navigate("/books");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const handleClickSingleBookPage = (event) => {
    event.stopPropagation();
    navigate(`/books/${id}`);
  };

  return (
    <>
      <div className="card" onClick={handleClickSingleBookPage}>
        <div className="icon-button-group">
          {role != "admin" ? (
            <div
              className="icon-button"
              onClick={!loadingeye ? handleClickQuickView : undefined}
            >
              {!loadingeye ? <FaEye /> : <RoundLoader color="whiteClass" />}
            </div>
          ) : (
            <div
              className="icon-button"
              onClick={!loadingeye ? handleClickQuickView : undefined}
            >
              {!loadingeye ? <BiEditAlt /> : <RoundLoader color="whiteClass" />}
            </div>
          )}
          {role !== "admin" ? (
            <div className="icon-button">
              <RiHeart2Fill />
            </div>
          ) : (
            <div
              className="icon-button"
              onClick={!loading ? handleDelete : undefined}
            >
              {!loading ? (
                <AiOutlineDelete />
              ) : (
                <RoundLoader color="whiteClass" />
              )}
            </div>
          )}

          {role !== "admin" ? (
            <div
              className="icon-button"
              onClick={!loading ? handleClickAddtoCart : undefined}
            >
              {!loading ? (
                <BsFillCartPlusFill />
              ) : (
                <RoundLoader color="whiteClass" />
              )}
            </div>
          ) : null}
        </div>
        <div className="header-card">
          <Tag text={discount} color="black" />
          <Tag text={tag} color="green" />
        </div>
        <div className="card-image-div">
          <img
          style={{ height: "auto" }}
          src={imgUrl ? imgUrl : "https://picsum.photos/200/300"}
          alt={name}
        />
        </div>
        <div className="card-div">
          <h3>{name}</h3>
          <p className={stock > 0 ? "stock-class" : "stock-class-red"}>
            {stock > 0 ? "(In Sotck)" : "(Out of Stock)"}
          </p>
          <div className="rating-card-view">
            <DisplayRating rating={rating} />
          </div>
          <p>{price}</p>
        </div>
      </div>
    </>
  );
};

export default CardMolecule;
