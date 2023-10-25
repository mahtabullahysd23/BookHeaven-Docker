import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    singlebook: null,
    allBooks: [],
    orientation:"book-container",
    deletedBook: null
};

const Slice = createSlice({
    name: "book",
    initialState,
    reducers: {
        addSingleBook: (state, action) => {
            state.singlebook = action.payload;
        },
        addAllBooks: (state, action) => {
            state.allBooks = action.payload;
        },
        changeOrientation: (state, action) => {
            state.orientation = action.payload;
        },
        setDeletedBook: (state, action) => {
            state.deletedBook = action.payload;
        },
    },
});

export const { addSingleBook, addAllBooks, changeOrientation ,setDeletedBook} = Slice.actions;

export default Slice.reducer;
