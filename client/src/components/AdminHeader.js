import React from "react";
import styled from "styled-components";
import Logo from "../assets/logo.png";
import { Link, useLocation } from "react-router-dom";

const NavBarWrapper = styled.div`
  border: rgb(221, 252, 229) 2px solid;
  background-color: #f5fdf2;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 6rem;
`;

const AdminHeader = () => {
  const { pathname } = useLocation();

  const isAdminPath =
    pathname.startsWith("/admin") && pathname !== "/admin/login";

  return (
    <>
      <NavBarWrapper>
        <img src={Logo} className="logo" />
        <h2>Administration Portal</h2>
        {isAdminPath && <Link to="/admin/login">Sign out!</Link>}
      </NavBarWrapper>
    </>
  );
};

export default AdminHeader;
