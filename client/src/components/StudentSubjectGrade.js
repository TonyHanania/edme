
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
