import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { addRole, addUser } from "../Store/Slices/userSlice";
import customAxios from "../Utils/customAxios";
import { useState } from "react";
import {toast} from "react-toastify";
const useLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

const [loading, setLoading] = useState(false);
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = (data) => {
    setLoading(true);
    customAxios
      .post("/auth/login", data)
      .then((res) => {
        localStorage.setItem("token", res.data.data.token);
        navigate("/books");
        dispatch(addRole(res.data.data.role));
        dispatch(addUser(data));
        toast.success("Login Successfull");
        reset();
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        setLoading(false);
      });
  };
  return {
    handleSubmit,
    control,
    errors,
    onSubmit,
    loading,
  };
};

export default useLogin;
