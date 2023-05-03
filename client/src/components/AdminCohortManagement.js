import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import AdminCohortCreateComponent from "./AdminCohortCreateComponent";
import styled from "styled-components";
const Button = styled.button`
  width: 8rem;
  background-color: #f5fdf2;
  padding: 1rem;
  border: none;
  cursor: pointer;
  font-size: 0.7rem;
  margin: 6rem;
  font-weight: 700;
  border-radius: 5px;
  :hover {
    scale: 1.2;
    border: black 1px solid;
  }
`;
const CreateCohort = () => {
  const navigate = useNavigate();
  const [cohort, setCohort] = useState({
    students: [],
    instructor: null,
    subjects: [],
  });
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [names, setNames] = useState([]);
  const [added, setadded] = useState(false);
  const { email } = useParams();

  useEffect(() => {
    fetch("/getusers")
      .then((response) => {
        if (response.status > 500) {
          navigate("/errorPage");
        } else {
          return response.json();
        }
      })
      .then((resData) => {
        setData(resData.data);
        setLoading(false);
      })
      .catch((err) => window.alert(err));
  }, [added]);
  const handleAdd = (id, role) => {
    const user = data.find((user) => user._id === id);
    if (role === "student") {
      setCohort((prevState) => ({
        ...prevState,
        students: { ...prevState.students, [id]: user },
      }));
    } else if (role === "instructor") {
      setCohort((prevState) => ({
        ...prevState,
        instructor: user,
      }));
    }
  };

  const handleMinus = (id, role) => {
    if (role === "student") {
      setCohort((prevState) => {
        const students = { ...prevState.students };
        delete students[id];
        return { ...prevState, students };
      });
    } else if (role === "instructor") {
      setCohort((prevState) => ({ ...prevState, instructor: null }));
    }
  };

  const handleSubmit = () => {
    fetch("/admin/createcohort", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cohort: cohort }),
    })
      .then((response) => {
        console.log(response); // Print the response object
        if (response.status > 500) {
          navigate("/errorPage");
        } else {
          // return response.json();
          console.log(response.json());
        }
      })
      .then((resData) => {
        console.log(resData);
        setCohort({
          students: [],
          instructor: null,
        });
        setadded(false);
        window.location.reload();
      })
      .catch((err) => window.alert(err));
  };
  if (loading) {
    return <p>loading</p>;
  }
  // console.log(
  //   data.filter((user) =>
  //     user.profile && user.profile.role && user.profile.activeCohort === ""
  //       ? user.profile.role === "student"
  //       : null
  //   ).length
  // );
  return (
    <>
      <Link to={`/admin/dashboard/${email}`}> ↩ Admin Dashboard</Link>
      <p>Create Cohort</p>
      {data.filter((user) =>
        user.profile && user.profile.role && user.profile.activeCohort === ""
          ? user.profile.role === "student"
          : null
      ).length > 0 ? (
        <h3>Students</h3>
      ) : (
        <h2>All students in database enrolled</h2>
      )}

      {data
        .filter((user) =>
          user.profile && user.profile.role
            ? user.profile.role === "student"
            : null
        )
        .map((user) =>
          user.profile.activeCohort === "" ? (
            <div key={user._id}>
              <AdminCohortCreateComponent
                data={user}
                handleMinus={handleMinus}
                handleAdd={handleAdd}
                added={added}
                setadded={setadded}
              />
            </div>
          ) : null
        )}

      <h3>Instructors</h3>
      {data
        .filter((user) =>
          user.profile && user.profile.role
            ? user.profile.role === "instructor"
            : null
        )
        .map((user) => (
          <div key={user._id}>
            <AdminCohortCreateComponent
              data={user}
              handleMinus={handleMinus}
              handleAdd={handleAdd}
            />
          </div>
        ))}

      <ul>
        {cohort.instructor ? <h4>Instructor</h4> : null}
        {cohort.instructor ? <li>cohort.instructor.email</li> : null}
      </ul>
      <ul>
        {cohort.students && Object.keys(cohort.students).length > 0 ? (
          <h4>Students</h4>
        ) : null}
        {Object.keys(cohort.students).map((studentId) => (
          <li key={studentId}>{cohort.students[studentId].email}</li>
        ))}
      </ul>

      <Button type="submit" onClick={handleSubmit}>
        Create Cohort
      </Button>
    </>
  );
};

export default CreateCohort;
