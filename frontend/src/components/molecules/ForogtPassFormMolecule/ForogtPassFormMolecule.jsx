import React, { useState } from "react";
import "./ForogtPassFormMolecule.style.scss";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Checkbox from "../../atoms/Checkbox/Checkbox";
import { useNavigate } from "react-router-dom";
import FormInput from "../../atoms/FormInput/FormInput";
import Button from "../../atoms/Buttons/Button";
import PasswordInput from "../../atoms/PasswordInput/PasswordInput";
import { useDispatch } from "react-redux";
import { addUser } from "../../../Store/Slices/userSlice";
import customAxios from "../../../Utils/customAxios";
import useLogin from "../../../CustomHooks/useLogin";
import RoundLoader from "../../atoms/RoundLoader/RoundLoader";
import LinearLoader from "../../atoms/LinearLoader/LinearLoader";
import { toast } from "react-toastify";

const ForogtPassFormMolecule = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onChange",
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = (data) => {
    setLoading(true);
    customAxios
      .post("/auth/forgot-password", data)
      .then((res) => {
        setLoading(false);
        reset();
        toast.success(res.data.message);
      })
      .catch((err) => {
        setLoading(false);
        if(err.response.status === 400){
          toast.error(err.response.data.error[0].msg);
        }
        else{
          toast.error(err.response.data.message);
        }
      });
      reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormInput
        labelText="Email"
        type="email"
        name="email"
        defaultValue={""}
        control={control}
        errors={errors}
        rules={{
          required: "Email is required",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Invalid email address",
          },
        }}
      />
      {loading ? (
        <Button type="submit" disabled={true} text={<LinearLoader />} />
      ) : (
        <Button type="submit" text="Send Email" />
      )}
    </form>
  );
};

export default ForogtPassFormMolecule;
