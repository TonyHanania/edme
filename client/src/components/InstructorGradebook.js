import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import styled from "styled-components";
const Button = styled.button`
  width: 8rem;
  background-color: #f5fdf2;
  padding: 1rem;
  border: none;
  cursor: pointer;
  font-size: 0.7rem;
  margin: 1rem;
  font-weight: 700;
  border-radius: 5px;
  :hover {
    scale: 1.2;
    border: black 1px solid;
  }
`;
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
  text-align: center;
`;

const P = styled.p`
  text-transform: capitalize;
`;
const InstructorGradebook = () => {
  const { subject, cohortId } = useParams();
  const [grades, setGrades] = useState([]);
  const [users, setUsers] = useState([]);
  const [moduleInfo, setModuleInfo] = useState(null);
  const [loading, setLoading] = useState(true);
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
    fetch(`/getusers`).then((response) => {
      if (response.status > 500) {
        console.error("Server error");
      } else {
        response.json().then((resData) => {
          setUsers(resData.data);
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
        (module) => module.cohortId === cohortId && module.subject === subject
      )
    : null;
  console.log("hie its me  ", moduleArray ? moduleArray.length : "hmmmmm");
  const filteredGrades = grades.filter(
    (grade) => grade.cohortId === cohortId && grade.subject === subject
  );

  const userGrades = users.map((user) => {
    const userGrade = {
      cohortId: user.profile.activeCohort,
      email: user.email,
      firstName: user.profile.firstName,
      lastName: user.profile.lastName,
      grades: [],
      role: user.profile.role,
    };
    filteredGrades.forEach((grade) => {
      if (grade.studentEmail === user.email) {
        userGrade.grades.push(grade.grade);
      }
    });
    return userGrade;
  });
  console.log("i am users ", users);
  console.log(filteredGrades);
  const moduleHeaders = moduleArray
    ? moduleArray.map((_, i) => <th key={i}>Module {i + 1}</th>)
    : null;
  const downloadExcel = () => {
    const headings = [
      "Student Name",
      ...moduleArray.map((_, i) => `Module ${i + 1}`),
    ];
    const rows = userGrades.map((userGrade) => [
      userGrade.cohortId === cohortId && userGrade.role === "student"
        ? `${userGrade.firstName} ${userGrade.lastName}`
        : null,
      ...userGrade.grades,
    ]);
    const data = [headings, ...rows];
    const csvContent =
      "data:text/csv;charset=utf-8," + data.map((e) => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "gradebook.csv");
    document.body.appendChild(link);
    link.click();
  };

  return (
    <Div>
      <h2>
        <P>{subject} - </P> cohort {cohortId}
      </h2>

      <table>
        <thead>
          <tr>
            <th>Student Name</th>
            {moduleHeaders}
          </tr>
        </thead>
        <tbody>
          {userGrades.map((userGrade) => (
            <tr key={userGrade.email}>
              <td>
                {userGrade.cohortId === cohortId && userGrade.role === "student"
                  ? userGrade.firstName
                  : null}
              </td>
              {userGrade.grades.map((grade, i) => (
                <td key={i}>{grade}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <Button onClick={downloadExcel}>Download Excel</Button>
    </Div>
  );
};

export default InstructorGradebook;
