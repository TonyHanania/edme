import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faRectangleXmark } from "@fortawesome/free-solid-svg-icons";
import Logo from "../assets/logo.png";
import styled from "styled-components";
import { UserContext } from "./UserContext";
import { useAuth0 } from "@auth0/auth0-react";
import { useContext } from "react";
const Navbar = () => {
  //hamburger menu
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser, setCurrentUser } = useContext(UserContext);
  function toggleMenu() {
    setIsOpen(!isOpen);
  }
  const { isAuthenticated, logout, loginWithRedirect, user } = useAuth0();
  return (
    <>
      <NavBarWrapper>
        <img src={Logo} className="logo" />
        <nav className="navMenu">
          <div className="hamburgerMenu">
            <Button className="hamburgerMenuButton" onClick={toggleMenu}>
              {!isOpen ? (
                <FontAwesomeIcon icon={faBars} size="2x" />
              ) : (
                <FontAwesomeIcon icon={faRectangleXmark} size="2x" />
              )}
            </Button>
            {isOpen && (
              <>
                <ul className="hamburgerUl">
                  <li>
                    {currentUser ? (
                      <NavLink to={`/dashboard/${currentUser.email}`}>
                        Dashboard
                      </NavLink>
                    ) : (
                      <NavLink to="/services">Services</NavLink>
                    )}
                  </li>
                  <li>
                    <NavLink to="/contactus">Contact us</NavLink>
                  </li>
                  <li>
                    {!isAuthenticated ? (
                      <Button
                        onClick={() => {
                          loginWithRedirect();
                        }}
                      >
                        Sign in!
                      </Button>
                    ) : (
                      <Button onClick={() => logout()}> Sign out!</Button>
                    )}
                  </li>
                </ul>
              </>
            )}
          </div>

          <ul className="navMenuList">
            <li className="navMenuListItem">
              {currentUser ? (
                <NavLink to={`/dashboard/${currentUser.email}`}>
                  Dashboard
                </NavLink>
              ) : (
                <NavLink to="/services">Services</NavLink>
              )}
            </li>
            <li className="navMenuListItem">
              <NavLink to="/contactus">Contact us</NavLink>
            </li>
            <li className="navMenuListItem">
              {!isAuthenticated ? (
                <Button onClick={() => loginWithRedirect()}>Sign in!</Button>
              ) : (
                <Button onClick={() => logout()}> Sign out!</Button>
              )}
            </li>
          </ul>
        </nav>
      </NavBarWrapper>
    </>
  );
};

const NavBarWrapper = styled.div`
  border: rgb(221, 252, 229) 2px solid;
  background-color: #f5fdf2;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 6rem;
  .hamburgerUl {
    list-style: none;
  }
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
    margin-top: 1rem;
  }

  .navMenuListItem {
    font-size: 1rem;
  }

  .hamburgerMenu {
    display: none;
    position: absolute;
    right: 1rem;
    top: 1rem;
    z-index: 1;

    width: 80%;

    .hamburgerUl {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-content: flex-start;
      height: 3rem;
      margin-right: 2rem;
    }
  }

  .hamburgerMenuButton {
    position: absolute;
    right: 0;
    border-radius: 50%;
    background-color: #f5fdf2;
    font-size: 1rem;
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
const Button = styled.button`
  background-color: #f5fdf2;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
`;

const NavLink = styled(Link)`
  font-size: 1.5rem;
  text-decoration: none;
  color: black;
`;
export default Navbar;
