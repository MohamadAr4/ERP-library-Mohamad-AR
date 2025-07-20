import React, { useState } from "react";
import Header from "../../components/Header/Header";
import { useDispatch, useSelector } from "react-redux";

const Dashboard = () => {
  const userMenu = useSelector((state) => state.user.userMenu);
  const phsMenu = useSelector((state) => state.user.PhsMenu);

  return (
    <Header userMenu={userMenu} phsMenu={phsMenu}>

    </Header>
    );
};
export default Dashboard;
