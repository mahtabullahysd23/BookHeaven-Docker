import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import customAxios from "../../../Utils/customAxios";
import UserCard from "../../atoms/UserCard/UserCard";
import "./UserOrganism.style.scss";
import FormInput from "../../atoms/FormInput/FormInput";
import { set, useForm } from "react-hook-form";
import Button from "../../atoms/Buttons/Button";
import LinearLoader from "../../atoms/LinearLoader/LinearLoader";
import Loadder from "../../atoms/Loadder/Loadder";
import { Controller } from "react-hook-form";
import { toast } from "react-toastify"; 

const UserOrganism = () => {
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
      .get("/auth/all")
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
        <div className= "form-div-user">
          <div className="USER-CONTAINER">
            {users.map((user) => {
              return (
                <UserCard
                  name={user.user.name}
                  email={user.user.email}
                  address={user.user.address}
                  id={user.user._id}
                  banned={user.banned}
                  locked={user.locked}
                  role={user.role}
                  onEdit={() =>
                    handleEditSer(
                      user.user._id,
                      user.user.name,
                      user.user.address,
                      user.role,
                      user.banned,
                      user.locked
                    )
                  }
                />
              );
            })}
          </div>
          <div className="w-100 form-container">
            <h2 className="flex-center mb-1">Update User</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormInput
                labelText="Name"
                type="text"
                name="name"
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
                labelText="Address"
                type="text"
                name="address"
                control={control}
                errors={errors}
                rules={{
                  required: "Address is required",
                  maxLength: {
                    value: 20,
                    message: "Address should be less than 20 characters",
                  },
                }}
              />

              <FormInput
                labelText="Role"
                type="text"
                name="role"
                control={control}
                errors={errors}
                rules={{
                  required: "Role is required",
                  maxLength: {
                    value: 20,
                    message: "Role should be less than 20 characters",
                  },
                }}
              />

              <div>
                <label className="label" htmlFor="banned">
                  Banned status
                </label>
                <Controller
                  name="banned"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <select className="mb-1" {...field}>
                      <option value="true">True</option>
                      <option value="false">False</option>
                    </select>
                  )}
                />
              </div>
              <div>
                <label className="label" htmlFor="locked">
                  Lock status
                </label>
                <Controller
                  name="locked"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <select className="mb-1" {...field}>
                      <option value="true">True</option>
                      <option value="false">False</option>
                    </select>
                  )}
                />
              </div>

              {loading ? (
                <Button type="submit" disabled={true} text={<LinearLoader />} />
              ) : (
                <Button type="submit" text="Update User" />
              )}
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default UserOrganism;
