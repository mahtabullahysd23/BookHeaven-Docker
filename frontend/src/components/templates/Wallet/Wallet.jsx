import React from "react";
import { useEffect } from "react";
import customAxios from "../../../Utils/customAxios";
import { useState } from "react";
import FormInput from "../../atoms/FormInput/FormInput";
import Button from "../../atoms/Buttons/Button";
import LinearLoader from "../../atoms/LinearLoader/LinearLoader";
import { set, useForm } from "react-hook-form";
import "./Wallet.scss"
import { toast } from "react-toastify";

const Wallet = () => {
  const [wallet, setWallet] = useState([]);
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState(0);
  const [updated, setUpdated] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onChange",
  });

    const onSubmit = async (data) => {  
        setLoading(true);
        customAxios
        .post(`/wallet/add`, data)
        .then((res) => {
          toast.success(res.data.message);
          setBalance(res.data.data.balance);
          setUpdated(!updated);
            setLoading(false);
        })
        .catch((err) => {
          toast.error(err.response.data.data);
            setLoading(false);
        });

        reset();
    }

  useEffect(() => {
    setLoading(true);
    customAxios
      .get("/wallet/mywallet")
      .then((res) => {
        console.log(res.data.data);
        setWallet(res.data.data);
        setBalance(res.data.data.balance);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.response.data.data);
        setLoading(false);
      });
  }, [updated]);

  return (
    <div className="wallet-container">
      <h1 className="mb-1">Wallet</h1>
      <div>
        <h2 className="mb-1" >Wallet Balance</h2>
     <h1 className="flex-center">{wallet.balance}</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>

      <FormInput
                labelText="Amount"
                type="text"
                name="amount"
                control={control}
                errors={errors}
                rules={{
                  required: "Amount is required",
                  maxLength: {
                    value: 20,
                    message: "Amount should be less than 20 characters",
                  },
                  max:{
                    value:50000,
                    message:"Amount should be less than 50000"
                  }
                }}
              />
        {loading ? (
          <Button type="submit" disabled={true} text={<LinearLoader />} />
        ) : (
          <Button type="submit" text="Add Balance" />
        )}
      </form>
    </div>
  );
};

export default Wallet;
