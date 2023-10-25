import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import customAxios from "../../../Utils/customAxios";
import UserCard from "../../atoms/UserCard/UserCard";
import "./TransactionOrganism.style.scss";
import FormInput from "../../atoms/FormInput/FormInput";
import { set, useForm } from "react-hook-form";
import Button from "../../atoms/Buttons/Button";
import LinearLoader from "../../atoms/LinearLoader/LinearLoader";
import Loadder from "../../atoms/Loadder/Loadder";
import { Controller } from "react-hook-form";
import TransactionCard from "../../atoms/TRansactionCard/TRansactionCard";
import { toast } from "react-toastify";

const TransactionOrganism = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [loadder, setLoadder] = useState(false);
  const [userData, setUserData] = useState({});
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm({
    mode: "onChange",
  });

  const handleEditSer = (id, name, address, role, banned, locked,city) => {
    setValue("role", role);
    setValue("name", name);
    setValue("address", address);
    setValue("banned", banned);
    setValue("locked", locked);
    setUserData({ id, name, address, role, banned, locked ,city});
  };

  const onSubmit = async (data) => {
    console.log(data);
    setLoading(true);
    customAxios
      .patch(`/user/update/${userData.id}`, data)
      .then((res) => {
        setUpdated(!updated);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.response.data.data);
      });
  };

  useEffect(() => {
    setLoadder(true);
    customAxios
      .get("/transaction/all")
      .then((res) => {
        setUsers(res.data.data);
        setLoadder(false);
      })
      .catch((err) => {
        setLoadder(false);
        toast.error(err.response.data.data);
      });
  }, [updated]);
  return (
    <>
      {loadder ? (
        <Loadder />
      ) : (
        <div className=" gap-2 p-2 form-div-user">
          <div className="USER-CONTAINER">
            {users.map((user) => {
              return (
                <TransactionCard
                  name={user.user.name}
                  email={user.user.email}
                  address={user.streetAddress}
                  id={user.user._id}
                  total={user.total}
                  status={user.status}
                    city={user.city}
                />
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default TransactionOrganism;
