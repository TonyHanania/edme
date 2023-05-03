// import React from "react";
// import styled from "styled-components";
// import { UserContext } from "./UserContext";
// import { useContext } from "react";
// import { useParams } from "react-router-dom";
// import { useState, useEffect } from "react";
// const TrackerDiv = styled.div`
//   background-color: white;
// `;
// const Tracker = ({ subject }) => {
//   const { currentUser } = useContext(UserContext);
//   const { email } = useParams();
//   const [grades, setGrades] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [moduleInfo, setModuleInfo] = useState(null);

//   useEffect(() => {
//     fetch("/getgrades").then((response) => {
//       if (response.status > 500) {
//         console.error("Server error");
//       } else {
//         response.json().then((resData) => {
//           setGrades(resData.data);
//         });
//       }
//     });

//     fetch(`/displaymodule`).then((response) => {
//       if (response.status > 500) {
//       } else {
//         response
//           .json()
//           .then((resData) => {
//             setLoading(false);
//             setModuleInfo(resData.data);
//           })
//           .catch((err) => console.log(err));
//       }
//     });
//   }, []);

//   const moduleArray = moduleInfo
//     ? moduleInfo.filter(
//         (module) =>
//           module.cohortId === currentUser.profile.activeCohort &&
//           module.subject === subject
//       )
//     : null;

//   const filteredGrades = grades.filter(
//     (grade) =>
//       grade.cohortId === currentUser.profile.activeCohort &&
//       grade.subject === subject &&
//       grade.studentEmail === email
//   );

//   const numQuizzesCompleted = filteredGrades.length;
//   const numQuizzesTotal = moduleArray ? moduleArray.length : 0;
//   const userGrade = {
//     cohortId: currentUser.profile.activeCohort,
//     email: email,
//     firstName: currentUser.profile.firstName,
//     lastName: currentUser.profile.lastName,
//     grades: [],
//     role: currentUser.profile.role,
//   };

//   filteredGrades.forEach((grade) => {
//     if (grade.studentEmail === email) {
//       userGrade.grades.push(grade.grade);
//     }
//   });

//   const userGrades = [userGrade];
//   console.log(
//     "tracker",
//     currentUser,
//     email,
//     subject,
//     moduleArray,
//     "i am user grades   ",
//     userGrades
//   );
//   return (
//     <>
//       <TrackerDiv>tracker</TrackerDiv>

//       <p>
//         {" "}
//         <span>
//           {numQuizzesCompleted}/{numQuizzesTotal} quizzes completed
//         </span>
//       </p>
//     </>
//   );
// };

// export default Tracker;
import React from "react";
import styled from "styled-components";
import { UserContext } from "./UserContext";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const TrackerContainer = styled.div`
  display: flex;
  align-items: center;
  height: 8px;
  width: 10rem;
  border-radius: 15px;

  background-color: red;
`;

const TrackerProgress = styled.div`
  height: 100%;
  border-radius: 15px;
  background-color: ${(props) => (props.completed ? "green" : "green")};
  width: ${(props) => props.width}%;
`;

const Tracker = ({ subject }) => {
  const { currentUser } = useContext(UserContext);
  const { email } = useParams();
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [moduleInfo, setModuleInfo] = useState(null);

  useEffect(() => {
    fetch("/getgrades").then((response) => {
      if (response.status > 500) {
        console.error("Server error");
      } else {
        response.json().then((resData) => {
          setGrades(resData.data);
        });
      }
    });

    fetch(`/displaymodule`).then((response) => {
      if (response.status > 500) {
      } else {
        response
          .json()
          .then((resData) => {
            setLoading(false);
            setModuleInfo(resData.data);
          })
          .catch((err) => console.log(err));
      }
    });
  }, []);

  const moduleArray = moduleInfo
    ? moduleInfo.filter(
        (module) =>
          module.cohortId === currentUser.profile.activeCohort &&
          module.subject === subject
      )
    : null;

  const filteredGrades = grades.filter(
    (grade) =>
      grade.cohortId === currentUser.profile.activeCohort &&
      grade.subject === subject &&
      grade.studentEmail === email
  );

  const numQuizzesCompleted = filteredGrades.length;
  const numQuizzesTotal = moduleArray ? moduleArray.length : 0;
  const progressPercent = (numQuizzesCompleted / numQuizzesTotal) * 100;

  const userGrade = {
    cohortId: currentUser.profile.activeCohort,
    email: email,
    firstName: currentUser.profile.firstName,
    lastName: currentUser.profile.lastName,
    grades: [],
    role: currentUser.profile.role,
  };

  filteredGrades.forEach((grade) => {
    if (grade.studentEmail === email) {
      userGrade.grades.push(grade.grade);
    }
  });

  const userGrades = [userGrade];
  console.log(
    "tracker",
    currentUser,
    email,
    subject,
    moduleArray,
    "i am user grades   ",
    userGrades
  );

  return (
    <div>
      <TrackerContainer>
        <TrackerProgress
          completed={progressPercent === 100}
          width={progressPercent}
        />
      </TrackerContainer>
    </div>
  );
};

export default Tracker;
