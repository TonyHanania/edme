import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./UserContext";
import UserProfile from "./UserProfile";
import SubjectCards from "./SubjectCards";
import styled from "styled-components";
const Div = styled.div`
  height: 15rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  width: 8rem;
  background-color: #f5fdf2;
  padding: 0.5rem;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  margin: 1rem;
  .link {
    color: black;
    text-decoration: none;
    font-size: 1rem;
  }

  border-radius: 5px;
  :hover {
    scale: 1.2;
  }
`;
const Dashboard = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  console.log(currentUser);

  console.log("i am freom profile ", currentUser ? currentUser.email : null);
  if (!currentUser) {
    return <p>Loading hi</p>;
  }

  console.log("i am from dashboard", currentUser);
  return (
    <>
      {!currentUser.profile.isSelected && !currentUser.profile.isconfirmed ? (
        <>
          <h2>Please set your profile</h2>
          <Button>
            <Link className="link" to={`/setprofile/${currentUser.email}`}>
              Set Profile
            </Link>
          </Button>
        </>
      ) : null}{" "}
      {currentUser.profile.isSelected && !currentUser.profile.isconfirmed ? (
        <Div>
          {" "}
          <p>Your profile is under review!</p>{" "}
        </Div>
      ) : null}
      {currentUser.profile.isconfirmed ? (
        <div className="profile">
          <UserProfile />
        </div>
      ) : null}
      {currentUser.profile.activeCohort !== "" &&
      currentUser.profile.isconfirmed ? (
        <SubjectCards />
      ) : (
        <Div>
          <p>You are not enrolled in a cohort!</p>
        </Div>
      )}
    </>
  );
};
export default Dashboard;
