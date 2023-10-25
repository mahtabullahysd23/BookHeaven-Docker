import userReducer from "./Slices/userSlice";
import modalReducer from "./Slices/modalSlice";
import filterReducer from "./Slices/filterSlice";
import cartReducer from "./Slices/cartSlice";
import bookReducer from "./Slices/bookSlice";
import { combineReducers } from "redux";
const rootReducer = combineReducers({
  user: userReducer,
  modal: modalReducer,
  filter: filterReducer,
  cart: cartReducer,
  book: bookReducer,
});

export default rootReducer;
