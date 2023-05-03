// import React from "react";
// import { useParams } from "react-router-dom";
// import { useState } from "react";
// import { useEffect } from "react";
// const StudentSubjectGrades = () => {
//   const { subject, cohortId, email } = useParams();
//   const [grades, setGrades] = useState();
//   console.log(subject);
//   useEffect(() => {
//     fetch(`/getgrades`).then((response) => {
//       if (response.status > 500) {
//       } else {
//         response.json().then((resData) => {
//           setGrades(resData.data);
//         });
//       }
//     });
//   }, []);

//   const myGrades = grades
//     ? grades.filter(
//         (grade) =>
//           grade.subject === subject &&
//           grade.studentEmail === email &&
//           grade.cohortId === cohortId
//       )
//     : null;
//   console.log(myGrades);
//   return (
//     <>
//       {myGrades
//         ? myGrades.map((myGrade, index) => {
//             return (
//               <>
//                 <p>Module: {index + 1}</p>
//                 <p>Grade: {myGrade.grade}</p>
//               </>
//             );
//           })
//         : null}
//     </>
//   );
// };

// export default StudentSubjectGrades;
// import React from "react";
// import { useParams } from "react-router-dom";
// import { useState } from "react";
// import { useEffect } from "react";

// const StudentSubjectGrades = () => {
//   const { subject, cohortId, email } = useParams();
//   const [grades, setGrades] = useState();

//   useEffect(() => {
//     fetch(`/getgrades`).then((response) => {
//       if (response.status > 500) {
//       } else {
//         response.json().then((resData) => {
//           setGrades(resData.data);
//         });
//       }
//     });
//   }, []);

//   const myGrades = grades
//     ? grades.filter(
//         (grade) =>
//           grade.subject === subject &&
//           grade.studentEmail === email &&
//           grade.cohortId === cohortId
//       )
//     : null;

//   return (
//     <div>
//       <h1>My {subject} grades:</h1>
//       {myGrades ? (
//         <>
//           <table>
//             <thead>
//               <tr>
//                 <th>Module</th>
//                 <th>Grade</th>
//               </tr>
//             </thead>
//             <tbody>
//               {myGrades.map((myGrade, index) => (
//                 <tr key={index}>
//                   <td>{index + 1}</td>
//                   <td>{myGrade.grade}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </>
//       ) : null}
//     </div>
//   );
// };

// export default StudentSubjectGrades;
import React from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
const StudentSubjectGrades = () => {
  const { subject, cohortId, email } = useParams();
  const [grades, setGrades] = useState();

  useEffect(() => {
    fetch(`/getgrades`).then((response) => {
      if (response.status > 500) {
      } else {
        response.json().then((resData) => {
          setGrades(resData.data);
        });
      }
    });
  }, []);

  const myGrades = grades
    ? grades.filter(
        (grade) =>
          grade.subject === subject &&
          grade.studentEmail === email &&
          grade.cohortId === cohortId
      )
    : null;

  const averageGrade =
    myGrades &&
    myGrades.reduce((total, grade) => total + grade.grade, 0) / myGrades.length;

  return (
    <Div>
      {myGrades ? (
        <table>
          <thead>
            <tr>
              <th>Module</th>
              <th>Grade</th>
            </tr>
          </thead>
          <tbody>
            {myGrades.map((myGrade, index) => (
              <tr key={index}>
                <td>Module {index + 1}</td>
                <td>{myGrade.grade}</td>
              </tr>
            ))}
            <tr>
              <td>Overall Grade</td>
              <td>{averageGrade.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      ) : null}
    </Div>
  );
};

const Div = styled.div`
  table,
  tr,
  td,
  th {
    border: black solid 1px;
  }
  table {
    margin: 3rem auto;
  }
`;

export default StudentSubjectGrades;
