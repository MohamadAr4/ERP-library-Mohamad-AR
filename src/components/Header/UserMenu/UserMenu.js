import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../../Store/UserSlice";
import { useNavigate } from "react-router-dom";

const UserMenu = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    // Optionally, you can also redirect the user to the login page after logging out
    navigate("/login");
  };

  return (
    <>
      <a
        class="nav-link nav-profile d-flex align-items-center px-0"
        href="#"
        data-bs-toggle="dropdown"
      >
        <span class="d-none d-md-block dropdown-toggle px-2">
          {props.userMenu[0].name}
        </span>
        <img
          src="/assets/media/avatars/avatar-manager1_256.png"
          alt="Profile"
          class="rounded-circle"
        />
      </a>

      <ul
        className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile"
        style={{ maxWidth: "80vh", overflow: "auto" }}
      >
        {props.userMenu[0].aList.map((item, index) => (
          <li key={index}>
            <a
              className="dropdown-item d-flex align-items-center"
              href={item.url}
            >
              <i className={`bi ${item.icon}`}></i>
              <span>{item.name}</span>
            </a>
          </li>
        ))}
        <li>
          <hr className="dropdown-divider" />
        </li>
        <li className="logout">
          <a
            className="dropdown-item d-flex align-items-center"
            href="#"
            onClick={handleLogout}
          >
            <i className="bi bi-box-arrow-right"></i>
            <span>تسجيل الخروج</span>
          </a>
        </li>
      </ul>
    </>
  );
};
export default UserMenu;
