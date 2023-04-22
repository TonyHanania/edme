import React from "react";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import { useContext } from "react";
const DashBoardCardContainer = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;
const DashboardCard = styled.div`
  border: blue 1px solid;
  width: 20rem;

  h1 {
    text-align: center;
    width: 100%;
    padding-bottom: 2rem;
    border-bottom: black 1px solid;
  }
`;

const SubjectCard = () => {
  const { userRole } = useContext(UserContext);

  const [data, setData] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    fetch(`/subjects`).then((response) => {
      if (response.status > 500) {
        navigate("/errorPage");
      } else {
        response
          .json()
          .then((resData) => {
            setData(resData.data);
            console.log(resData);
          })
          .catch((err) => console.log(err));
      }
    });
  }, []);
  console.log("I am data  ", userRole);
  if (!data) {
    return null;
  }
  return (
    <>
      <DashBoardCardContainer>
        {data.map((subject) => {
          return (
            <>
              <DashboardCard>
                <h1>{subject.subject}</h1>
                <p>Last visited: </p>
                <p>{userRole === "admin" ? "Gradebook" : "Tracker"}</p>
                <Link to={`/subjectpage/${subject.subject}`}>
                  Go to subject page
                </Link>
              </DashboardCard>
            </>
          );
        })}
      </DashBoardCardContainer>
    </>
  );
};
export default SubjectCard;
