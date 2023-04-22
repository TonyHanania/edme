import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminCohortCreateComponent = ({ data, handleAdd, handleMinus }) => {
  const [cohort, setCohort] = useState("");
  const [names, setNames] = useState([]);
  const [added, setadded] = useState(false);
  //   const handleAdd = (name, role) => {
  //     let newCohort = cohort;
  //     if (role === "student") {
  //       newCohort += `Student ${name}, `;
  //     } else if (role === "instructor") {
  //       newCohort += `Instructor ${name}, `;
  //     }
  //     setCohort(newCohort);
  //     setNames([...names, name]);
  //     setadded(true);
  //   };
  console.log(cohort, names);
  //   const handleMinus = (nameToRemove) => {
  //     const updatedNames = names.filter((name) => name !== nameToRemove);
  //     const updatedCohort = updatedNames
  //       .map(
  //         (name) =>
  //           `${name.role === "student" ? "Student" : "Instructor"} ${name.name}`
  //       )
  //       .join(", ");
  //     setCohort(updatedCohort);
  //     setNames(updatedNames);
  //     setadded(false);
  //   };
  return (
    <>
      <p>
        {data.profile.firstName} {data.profile.lastName}
        {"  "}
        <span>{data.profile.role}</span> <span>{data._id}</span>
      </p>
      {/* <button
        onClick={() => handleAdd(data.profile.firstName, data.profile.role)}
      >
        {!added ? "Add" : "Undo"}
      </button> */}
      <button
        onClick={
          added
            ? () => {
                handleMinus(data._id, data.profile.role);
                setadded(false);
              }
            : () => {
                handleAdd(data._id, data.profile.role);
                setadded(true);
              }
        }
      >
        {!added ? "Add" : "Undo"}
      </button>
      {/* <button
        onClick={() => handleAdd(data.profile.firstName, data.profile.role)}
      >
        Add
      </button> */}

      {/* {names.map((name) => (
        <div key={name}>
          {name}
          <button onClick={() => handleMinus(name)}>Remove</button>
        </div>
      ))} */}
    </>
  );
};
export default AdminCohortCreateComponent;
