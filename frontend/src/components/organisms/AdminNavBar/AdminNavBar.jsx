import './AdminNavBar.scss'

import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import ProfileName from "../../molecules/ProfileNameMolecule/ProfileNameMolecule";
import jwtDecode from "jwt-decode";

const AdminNavBar = () => {
  const email = useSelector((state) => state.user.email);
  const [token, setToken] = useState("");
  const [user, setUser] = useState(null);

  const numOfbooks = useSelector((state) => state.cart.numberOfItems);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setUser(jwtDecode(localStorage.getItem("token")));
      setToken(localStorage.getItem("token"));
    } else {
      setToken("");
    }
  }, [email]);

  return (
    <>
      <div className="navbar">
        <div className="navbar_logo">
          <img
            style={{
              height: "71px",
            }}
            src="logo.png"
          ></img>
        </div>
        <div className="navbar_links_admin">
          <ul>
            <li>
              <NavLink activeclassname="active" to="/">
                HOME
              </NavLink>
            </li>
            <li>
              <NavLink activeclassname="active" to="/books">
                BOOKS
              </NavLink>
            </li>
            <li>
              <NavLink activeclassname="active" to="/users">
                USERS
              </NavLink>
            </li>
            <li>
              <NavLink activeclassname="active" to="/orders">
                ORDERS
              </NavLink>
            </li>
            <li>
              <NavLink activeclassname="active" to="/discounts">
                DISCOUNTS
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="nav_icons">
          <ul>
            {!token ? (
              <>
                <div className="sign-in-up">
                  <li>
                    <NavLink activeclassname="active" to="/signin">
                      SIGN IN
                    </NavLink>
                  </li>
                  <li>
                    <NavLink activeclassname="active" to="/signup">
                      SIGN UP
                    </NavLink>
                  </li>
                </div>
              </>
            ) : (
              <>
                <div class= "admin_img-div">
                  <ProfileName
                    username={user ? user.data.user.name.split(" ")[0] : ""}
                    profileImage={"//myimg.png"}
                  />
                </div>
              </>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default AdminNavBar;
