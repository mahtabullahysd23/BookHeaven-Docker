import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import customAxios from "../../../Utils/customAxios";
import UserCard from "../../atoms/UserCard/UserCard";
import FormInput from "../../atoms/FormInput/FormInput";
import { set, useForm } from "react-hook-form";
import Button from "../../atoms/Buttons/Button";
import LinearLoader from "../../atoms/LinearLoader/LinearLoader";
import Loadder from "../../atoms/Loadder/Loadder";
import { Controller } from "react-hook-form";
import TransactionCard from "../../atoms/TRansactionCard/TRansactionCard";
import { toast } from "react-toastify";

const UserTransactionOrganism = () => {
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

  const handleEditSer = (id, name, address, role, banned, locked) => {
    setValue("role", role);
    setValue("name", name);
    setValue("address", address);
    setValue("banned", banned);
    setValue("locked", locked);
    setUserData({ id, name, address, role, banned, locked });
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
      .get("/transaction/view")
      .then((res) => {
        setUsers(res.data.data);
        setLoadder(false);
      })
      .catch((err) => console.log(err));
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
                  name={user._id}
                  email={user.createdAt}
                  address={user.streetAddress}
                  city={user.city}
                //   id={user.user._id}
                  total={user.total}
                   status={"pending"}
                />
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default UserTransactionOrganism;
