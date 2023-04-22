import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserConfirmationComponent from "./AdminUserConfirmationComponent";
import AdminCohortCreateComponent from "./AdminCohortCreateComponent";
const CreateCohort = () => {
  const navigate = useNavigate();
  const [cohort, setCohort] = useState({
    students: [],
    instructor: null,
  });
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [names, setNames] = useState([]);
  const [added, setadded] = useState(false);

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
    fetch("/createcohort", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cohort: cohort }),
    })
      .then((response) => {
        if (response.status > 500) {
          navigate("/errorPage");
        } else {
          return response.json();
        }
      })
      .then((resData) => {
        setCohort({
          students: [],
          instructor: null,
        });
        setadded(false);
      })
      .catch((err) => window.alert(err));
  };

  if (loading) {
    return <p>loading</p>;
  }

  return (
    <>
      <p>Create Cohort</p>

      <h3>Students</h3>
      {data
        .filter((user) =>
          user.profile && user.profile.role
            ? user.profile.role === "student"
            : null
        )
        .map((user) => (
          <div key={user._id}>
            <AdminCohortCreateComponent
              data={user}
              handleMinus={handleMinus}
              handleAdd={handleAdd}
              added={added}
              setadded={setadded}
            />
          </div>
        ))}

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
      {/* //names is cohort */}
      <h3>Cohort</h3>

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

      <button type="submit" onClick={handleSubmit}>
        create cohort
      </button>
    </>
  );
};

export default CreateCohort;
