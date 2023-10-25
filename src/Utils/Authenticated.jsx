import { Navigate, Outlet } from "react-router-dom";
import { useEffect} from "react";
import { useSelector } from "react-redux";

const Authenticated = () => {
    const role = useSelector((state) => state.user.role);
    return role === "user" ? (
      <div>
        <Outlet />{" "}
      </div>
    ) : (
      <>
        <Navigate to="/signin" />
      </>
    );
  };

export default Authenticated;
