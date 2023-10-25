import React from "react";
import BooksOrganism from "../../organisms/BooksOrganism/BooksOrganism";
import "./Books.style.scss";
import PaginationOrganism from "../../organisms/PaginationOrganism/PaginationOrganism";
import FilterHeaderOrganism from "../../organisms/FilterHeaderOrganism/FilterHeaderOrganism";
import FilterOptionOrganism from "../../organisms/FilterOptionOrganism/FilterOptionOrganism";
import Modal from "../../atoms/Modal/Modal";
import SingleProuctOrganism from "../../organisms/SingleProuctOrganism/SingleProuctOrganism";
import { useSelector,useDispatch } from "react-redux";
import { closeModal } from "../../../Store/Slices/modalSlice";
  

const Books = () => {
  const dispatch = useDispatch();
  const isModalOpen = useSelector((state) => state.modal.eyeModal);
  const modalClose = () => {
    dispatch(closeModal("eyeModal"));
  };
  return (
    <>
      <div className="filteriheader-container">
        <FilterHeaderOrganism />
      </div>
      <div className="flex-container">
        <div className="book-page-container">
          <div className="books-left">
            <FilterOptionOrganism />    
          </div>
          <div className="books-right">
            <BooksOrganism />
          </div>
        </div>
      </div>
      <PaginationOrganism />
      <div>
      <Modal isOpen={isModalOpen} onClose={modalClose}>
        <SingleProuctOrganism />
      </Modal>
    </div>
    </>
  );
};

export default Books;
