import React from "react";
import "./CheckoutFormMolecule.style.scss";
import FormInput from "../../atoms/FormInput/FormInput";
import jwtDecode from "jwt-decode";
const CheckoutFormMolecule = ({ control, errors }) => {
  const user = jwtDecode(localStorage.getItem("token")).data;
  return (
    <>
      <div className="checkout-form-div">
        <FormInput
          labelText="Name"
          type="text"
          name="name"
          defaultValue={user.user.name}
          control={control}
          errors={errors}
          rules={{
            required: "Name is required",
            maxLength: {
              value: 20,
              message: "Name should be less than 20 characters",
            },
          }}
        />

        <FormInput
          labelText="Country/Region"
          type="text"
          name="country"
          defaultValue={user.country}
          control={control}
          errors={errors}
          rules={{
            required: "Country is required",
            maxLength: {
              value: 20,
              message: "Country should be less than 20 characters",
            },
          }}
        />

        <FormInput
          labelText="Street Address"
          type="text"
          name="streetAddress"
          control={control}
          errors={errors}
          defaultValue=""
          rules={{
            required: "Street Address is required",
            maxLength: {
              value: 50,
              message: "Street Address should be less than 50 characters",
            },
          }}
        />

        <FormInput
          labelText="City"
          type="text"
          name="city"
          defaultValue=""
          control={control}
          errors={errors}
          rules={{
            required: "City is required",
            maxLength: {
              value: 20,
              message: "City should be less than 20 characters",
            },
          }}
        />

        <FormInput
          labelText="Zip Code"
          type="number"
          name="zipCode"
          defaultValue=""
          control={control}
          errors={errors}
          rules={{
            required: "Zip Code is required",
            maxLength: {
              value: 20,
              message: "Zip Code should be less than 20 characters",
            },
          }}
        />
      </div>
    </>
  );
};

export default CheckoutFormMolecule;
