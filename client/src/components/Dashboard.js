import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./UserContext";
import UserProfile from "./UserProfile";
import SubjectCard from "./SubjectCards";
const Dashboard = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  console.log("i am freom profile ", currentUser ? currentUser.email : null);
  if (!currentUser) {
    return <p>Loading</p>;
  }
  return (
    <>
      <button>
        <Link to={`/setprofile/${currentUser.email}`}>Profile</Link>
      </button>
      <div className="profile">
        <UserProfile />
      </div>

      <div className="classCards">
        <SubjectCard />
      </div>
    </>
  );
};
export default Dashboard;
