import React from "react";
import "./ForgotPassword.style.scss";
import ForogtPassFormMolecule from "../../molecules/ForogtPassFormMolecule/ForogtPassFormMolecule";

const ForgotPassword = () => {
  return (
    <div className="forgot-pass-container">
     
      <div className="forgot-pass-form">
      <h1 className="flex-center mb-1">Forget Password</h1>
        <ForogtPassFormMolecule />
      </div>
    </div>
  );
};

export default ForgotPassword;
