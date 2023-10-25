import React from "react";
import CardMolecule from "../../molecules/CardMolecule/CardMolecule";
import "./BooksOrganism.style.scss";
import useBook from "../../../CustomHooks/useBook";
import Loader from "../../atoms/Loadder/Loadder";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const BooksOrganism = () => {
  const { books, loading } = useBook();
  const orientation = useSelector((state) => state.book.orientation);
  useEffect(() => {
    // const grid_list =()=>{
    //   orientation=== "list" ? "list-container" : orientation === "grid2x" ? "grid-2x" : "book-container"
    // } 
  }, [orientation]);


  return (
    <div className={orientation}>
      {loading ? (
        <Loader />
      ) : books.books ? (
        books.books.map((book) => {
          return (   
            <CardMolecule
              key={book._id}
              id={book._id}
              name={book.name}
              author={book.author}
              price={`$${book.price}`}
              rating={book.rating}
              discount={book.discount}
              tag={book.tag}
              imgUrl={book.imageUrl}
              stock={book.stock}
            />
          );
        })
      ) : (
        <div className="no-book">No book found !</div>
      )}
    </div>
  );
};

export default BooksOrganism;
