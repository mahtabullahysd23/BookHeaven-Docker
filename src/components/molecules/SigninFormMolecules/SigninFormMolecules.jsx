import "./SigninFormMolecules.style.scss";
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

const SigninFormMolecules = () => {

  const { control,handleSubmit,errors,onSubmit,loading} = useLogin();
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
      <PasswordInput control={control} errors={errors}/>
      <div className="input-group-checkbox">
        <div>
          <Checkbox text="Remember me" display="flex"/>
        </div>
        <div>
          <Link to="/forgot-password">
            <p>Forgot Password?</p>
          </Link>
        </div>
      </div>
      {
          loading ?<Button type="submit" disabled={true} text={<LinearLoader/>} />:<Button type="submit" text="Login" />
      }
      
    </form>
  );
};

export default SigninFormMolecules;
