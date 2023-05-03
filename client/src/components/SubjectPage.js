import React from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "./UserContext";
import { useContext } from "react";
import styled from "styled-components";
import DisplayModules from "./DisplayModules";
import { Link } from "react-router-dom";

const InstructorLink = styled(Link)`
  color: black;
  text-decoration: none;
  font-weight: 700;

  :hover {
    color: #333333;
    scale: 1.2;
  }
`;

const InstructorDiv = styled.div`
  background-color: #f5fdf2;
  margin: 0 auto;
  text-align: center;
  width: 30rem;
  height: 3rem;
  margin: 5rem auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const InstructorSubjectPageContainer = styled.div`
  height: 30rem;
  text-align: center;
`;

const Circle = styled.div`
  border: red 1px solid;
  width: 10rem;
  height: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: white;
  border: rgb(221, 252, 229) 2px solid;
`;

const Subject = styled.h2`
  text-transform: capitalize;
  text-align: center;
`;
const SubjectPage = () => {
  const { subject, cohortId } = useParams();
  const { currentUser } = useContext(UserContext);

  return (
    <>
      {!currentUser ? <p>Loading</p> : null}
      {currentUser && currentUser.profile.role === "instructor" ? (
        <InstructorSubjectPageContainer>
          <Subject>{subject}</Subject>
          <p>Cohort: {cohortId}</p>
          <InstructorDiv>
            <Circle>
              <InstructorLink to={`/createmodule/${subject}/${cohortId}`}>
                Create Modules
              </InstructorLink>
            </Circle>
          </InstructorDiv>

          <InstructorDiv>
            <Circle>
              <InstructorLink
                to={`/subjectpage/${subject}/${cohortId}/${currentUser.email}/${currentUser.profile.role}`}
              >
                View Class Page
              </InstructorLink>
            </Circle>
          </InstructorDiv>

          <InstructorDiv>
            <Circle>
              <InstructorLink
                to={`/${subject.subject}/${currentUser.profile.activeCohort}/gradebook/${currentUser.profile.role}`}
              >
                Gradebook
              </InstructorLink>
            </Circle>
          </InstructorDiv>
        </InstructorSubjectPageContainer>
      ) : null}

      {currentUser && currentUser.profile.role === "student" ? (
        <>
          <DisplayModules />
        </>
      ) : null}
    </>
  );
};
const Lesson = styled.div`
  white-space: pre-wrap;
`;
const AdvancedImage = styled.img``;
export default SubjectPage;
