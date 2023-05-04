import React from "react";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import { useContext } from "react";
import Tracker from "./Tracker";
const DashBoardCardContainer = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  padding: 1rem;
`;
const DashboardCard = styled.div`
  border: rgb(221, 252, 229) 2px solid;

  width: 12rem;

  border-radius: 5px;
  height: 13rem;
  text-align: center;

  @media (max-width: 1140px) {
    width: 12rem;
    margin-top: 1rem;
  }

  @media (max-width: 725px) {
    width: 35rem;
    :last-of-type {
      margin-bottom: 8rem;
    }
  }

  h1 {
    text-align: center;
    width: 100%;
    border-bottom: black 1px solid;
    background-color: #f5fdf2;
    height: 5rem;
    margin-top: 0;
    text-transform: capitalize;
  }
`;

const SubjectLink = styled(Link)`
  font-size: 1rem;
  text-decoration: none;
  color: black;
`;
const TrackerDiv = styled.div`
  margin-top: 2rem;
  display: flex;
  justify-content: center;
`;
const SubjectCards = () => {
  const { currentUser } = useContext(UserContext);
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
                <span>
                  {currentUser.profile.role === "instructor" ? (
                    <div>
                      {" "}
                      <SubjectLink
                        to={`/${subject.subject}/${currentUser.profile.activeCohort}/gradebook/${currentUser.profile.role}`}
                      >
                        Gradebook
                      </SubjectLink>
                    </div>
                  ) : (
                    <SubjectLink
                      to={`/${subject.subject}/${currentUser.profile.activeCohort}/${currentUser.email}/grades`}
                    >
                      Gradebook
                    </SubjectLink>
                  )}
                </span>
                <div>
                  <SubjectLink
                    to={`/subjectpage/${subject.subject}/${currentUser.profile.activeCohort}/${currentUser.email}`}
                  >
                    Go to subject page
                  </SubjectLink>
                </div>
                {currentUser.profile.role === "student" ? (
                  <TrackerDiv>
                    {" "}
                    <Tracker subject={subject.subject} />
                  </TrackerDiv>
                ) : null}
              </DashboardCard>
            </>
          );
        })}
      </DashBoardCardContainer>
    </>
  );
};
export default SubjectCards;
