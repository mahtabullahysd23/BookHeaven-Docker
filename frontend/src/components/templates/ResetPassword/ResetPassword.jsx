import React from "react";
import "./ResetPassword.style.scss";
import ForogtPassFormMolecule from "../../molecules/ForogtPassFormMolecule/ForogtPassFormMolecule";
import ResetPassMolecule from "../../molecules/ResetPassMolecule/ResetPassMolecule";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import customAxios from "../../../Utils/customAxios";
import { toast } from "react-toastify";
import Loadder from "../../atoms/Loadder/Loadder";

const ResetPassword = () => {
  const { id, token } = useParams();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    customAxios
      .post(`/auth/check-token`, { id, token })
      .then((res) => {
        setLoading(false);
      })
      .catch((err) => {
        toast.error("Resend Password Reset Request");
        setLoading(false);
        navigate("/forgot-password");
      });
  }, []);
  return (

    loading ? (
      <Loadder />
    ) : (
    <div className="forgot-pass-container">
      <div className="forgot-pass-form">
      <h1 className="flex-center mb-1">Reset Password</h1>
        <ResetPassMolecule />
      </div>
    </div>
    )
  );
};

export default ResetPassword;
