import { useState, useEffect } from "react";
import customAxios from "../Utils/customAxios";
import { useSelector } from "react-redux";
import { addFilter } from "../Store/Slices/filterSlice";
import { useDispatch } from "react-redux";

const useBook = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const searchQuery = useSelector((state) => state.filter.filterString);
  const deletedBook = useSelector((state) => state.book.allBooks);
  const [first,setFirst] = useState(true);
  const dispatch = useDispatch();

  const callApi = () => {
    setLoading(true);
    customAxios
      .get(!first?searchQuery:"/books?Page=1&")
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        setBooks([]);
        setLoading(false);
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    dispatch(addFilter("/books?Page=1&"));  
    setFirst(false);
  }, []);

  useEffect(() => {

    window.scrollTo(0, 0);
    if (searchQuery.includes("Search")) {
      const timeOut = setTimeout(() => {
        callApi();
      }, 1000);
      return () => clearTimeout(timeOut);
    } else {
      callApi();
    }
  }, [searchQuery,deletedBook]);

  return { books, loading };
};

export default useBook;
