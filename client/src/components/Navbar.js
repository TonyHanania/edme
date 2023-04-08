import { Link } from "react-router-dom";
import { useState } from "react";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faRectangleXmark } from "@fortawesome/free-solid-svg-icons";
import Logo from "../assets/logo.png";
import styled from "styled-components";

import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  //hamburger menu
  const [isOpen, setIsOpen] = useState(false);

  function toggleMenu() {
    setIsOpen(!isOpen);
  }

  //getting auth0 information
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
  console.log(isAuthenticated);
  const Navigate = useNavigate();
  console.log("I am user  ", user);

  return (
    <>
      <NavBarWrapper>
        <img src={Logo} className="logo" />
        <nav className="navMenu">
          <div className="hamburgerMenu">
            <button className="hamburgerMenuButton" onClick={toggleMenu}>
              {!isOpen ? (
                <FontAwesomeIcon icon={faBars} size="2x" />
              ) : (
                <FontAwesomeIcon icon={faRectangleXmark} size="2x" />
              )}
            </button>
            {isOpen && (
              <>
                <ul>
                  <li>
                    <Link path="/aboutus">About Us</Link>
                  </li>
                  <li>
                    <Link path="services">Services</Link>
                  </li>
                  <li>
                    {!isAuthenticated ? (
                      <button onClick={() => loginWithRedirect()}>
                        Sign in
                      </button>
                    ) : (
                      <button onClick={() => logout()}> sign out</button>
                    )}
                  </li>
                </ul>
              </>
            )}
          </div>

          <ul className="navMenuList">
            <li className="navMenuListItem">
              <Link path="/aboutus">About Us</Link>
            </li>
            <li className="navMenuListItem">
              <Link path="services">Services</Link>
            </li>
            <li className="navMenuListItem">
              {!isAuthenticated ? (
                <button onClick={() => loginWithRedirect()}>Sign in</button>
              ) : (
                <button onClick={() => logout()}> sign out</button>
              )}
            </li>
          </ul>
        </nav>
      </NavBarWrapper>
    </>
  );
};

const NavBarWrapper = styled.div`
  background-color: rgb(221, 252, 229);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: fit-content;

  .navMenu {
    width: 75%;
  }

  .navMenuList {
    list-style: none;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 95%;
    height: fit-content;
  }

  .navMenuListItem {
  }

  .hamburgerMenu {
    display: none;
    position: absolute;
    right: 1.5vw;
    top: 1vh;
    z-index: 1;
    background-color: rgb(221, 252, 229);
    width: 60%;
  }

  .hamburgerMenuButton {
    position: absolute;
    right: 0;
    border-radius: 50%;
  }

  .signup {
    text-align: right;
  }

  .logo {
    width: 7rem;
  }

  @media (max-width: 768px) {
    .hamburgerMenu {
      display: block;
    }

    .navMenuList {
      display: none;
      /* Hide the navigation menu on small screens */
    }
  }
`;
export default Navbar;
