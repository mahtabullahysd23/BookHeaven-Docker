import React from "react";
import "./UserProfile.style.scss";
import { get, set, useForm } from "react-hook-form";
import FormInput from "../../atoms/FormInput/FormInput";
import customAxios from "../../../Utils/customAxios";
import { useState } from "react";
import { useEffect } from "react";
import Button from "../../atoms/Buttons/Button";
import LinearLoader from "../../atoms/LinearLoader/LinearLoader";
import { toast } from "react-toastify";
import Loadder from "../../atoms/Loadder/Loadder";

const UserProfile = () => {
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [mainloading, setMainLoading] = useState(true);
  const allowedExtensions = ["jpg", "jpeg", "png", "gif"];
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    mode: "onChange",
  });

  useEffect(() => {
    setMainLoading(true);
    customAxios
      .get("/user/my-profile")
      .then((res) => {
        setImage(res.data.data.imageUrl);
        setValue("name", res.data.data.name);
        setValue("email", res.data.data.email);
        setValue("number", res.data.data.number);
        setValue("address", res.data.data.address);
        setValue("city", res.data.data.city);
        setValue("country", res.data.data.country);
        setMainLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setMainLoading(false);
      });
  }, []);

  const handeChange = (e) => {
    const file = e.target.files[0];
    const extension = file.name.split(".").pop();
    if (!allowedExtensions.includes(extension.toLowerCase())) {
      toast.error("Only images are allowed(jpg,jpeg,png,gif)");
      return;
    }
    const formData = new FormData();
    formData.append("file_to_upload", e.target.files[0]);
    customAxios
      .post("/files/upload-image", formData)
      .then((res) => {
        const fileName = res.data.data.key.split("/").pop();
        setImage(fileName);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onSubmit = (data) => {
    window.scrollTo(0, 0);
    setLoading(true);
    setMainLoading(true);
    customAxios
      .post("/user/update-profile", { ...data, imageUrl: image })
      .then((res) => {
        toast.success(res.data.message);
        setMainLoading(false);
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        setLoading(false);
        setMainLoading(false);
      });
  };

  return (
    <>
      {mainloading ? (
        <Loadder />
      ) : (
        <>
          <div className="user-profile-container">
            <div className="user-profile-content">
              <h1 className="flex-center mb-1">Edit Profile</h1>
              <div class="round-image">
                <img
                  src={
                    //sudo-venom-bucket.s3.eu-west-3.amazonaws.com/images/1698742485670_1698740357543_08.jpg
                    `https://${import.meta.env.VITE_APP_AWS_BUCKET_NAME}.s3.${
                      import.meta.env.VITE_APP_AWS_BUCKET_REGION
                    }.amazonaws.com/images/${image}`
                  }
                  alt="Your Image"
                />
              </div>
              <div className="user-profile-form">
                <div className="input-group">
                  <label htmlFor="image">Choose image</label>
                  <input
                    type="file"
                    id="image"
                    onChange={(e) => {
                      handeChange(e);
                    }}
                  />
                  <span className="error">*</span>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="tow-column-form">
                      <div className="w-100">
                        <FormInput
                          labelText="Name"
                          type="text"
                          name="name"
                          defaultValue={""}
                          control={control}
                          errors={errors}
                          rules={{
                            required: "Name is required",
                          }}
                        />
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
                        <FormInput
                          labelText="Number"
                          type="text"
                          name="number"
                          defaultValue={""}
                          control={control}
                          errors={errors}
                          rules={{
                            required: "Number is required",
                          }}
                        />
                      </div>
                      <div className="w-100">
                        <FormInput
                          labelText="Address"
                          type="text"
                          name="address"
                          defaultValue={""}
                          control={control}
                          errors={errors}
                          rules={{
                            required: "Address is required",
                          }}
                        />
                        <FormInput
                          labelText="City"
                          type="text"
                          name="city"
                          defaultValue={""}
                          control={control}
                          errors={errors}
                          rules={{
                            required: "City is required",
                          }}
                        />
                        <FormInput
                          labelText="Country"
                          type="text"
                          name="country"
                          defaultValue={""}
                          control={control}
                          errors={errors}
                          rules={{
                            required: "Country is required",
                          }}
                        />
                      </div>
                    </div>
                    <div className="button-save">
                      {loading ? (
                        <Button
                          type="submit"
                          disabled={true}
                          text={<LinearLoader />}
                        />
                      ) : (
                        <Button type="submit" text="Save" />
                      )}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default UserProfile;
