import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Warehouses from "../str/mng/Warehouses/Warehouses";

const Main = () => {
  const userMenu = useSelector((state) => state.user.userMenu);
  const phsMenu = useSelector((state) => state.user.PhsMenu);

  return (
    <>
    <Header userMenu={userMenu} phsMenu={phsMenu}>

    </Header>
    <div>
    
    </div>
    <Footer>

    </Footer>
    </>
    );
};
export default Main;
