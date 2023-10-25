import React, { useState } from "react";
import "./ResetPassMolecule.style.scss";
import { useForm } from "react-hook-form";
import Button from "../../atoms/Buttons/Button";
import PasswordInput from "../../atoms/PasswordInput/PasswordInput";
import LinearLoader from "../../atoms/LinearLoader/LinearLoader";
import { useParams } from "react-router-dom";
import customAxios from "../../../Utils/customAxios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";



const ResetPassMolecule = () => {
  const navigate = useNavigate();
  const {id, token} = useParams();
  const [loading, setLoading] = useState(false);
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = (data) => {
    const bodydata = {
      password: data.password,
      token: token,
      id: id,
    };
    setLoading(true);
    customAxios
      .post("/auth/reset-password", bodydata)
      .then((res) => {
        setLoading(false);
        reset();
        toast.success(res.data.message);
        navigate("/signin");
      })
      .catch((err) => {
        setLoading(false);
        if(err.response.status === 400){
          toast.error(err.response.data.error[0].msg);
        }else{
          toast.error(err.response.data.message);
        }
      });
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <PasswordInput control={control} errors={errors} />
      <PasswordInput
        control={control}
        errors={errors}
        text="Confirm password"
        watch={watch}
      />
      {loading ? (
        <Button type="submit" disabled={true} text={<LinearLoader />} />
      ) : (
        <Button type="submit" text="Reset" />
      )}
    </form>
  );
};

export default ResetPassMolecule;
