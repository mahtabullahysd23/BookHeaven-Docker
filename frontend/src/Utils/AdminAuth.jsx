import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AdminAuth = () => {
  const role = useSelector((state) => state.user.role);
  return role === "admin" ? (
    <div>
      <Outlet />{" "}
    </div>
  ) : (
    <>
      <Navigate to="/signin" />
    </>
  );
};

export default AdminAuth;
