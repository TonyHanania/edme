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
          <p>Please set your profile</p>
          <button>
            <Link to={`/setprofile/${currentUser.email}`}>Set Profile</Link>
          </button>
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
