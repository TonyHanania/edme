import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
const Button = styled.button`
  width: 8rem;
  background-color: #f5fdf2;
  padding: 1rem;
  border: none;
  cursor: pointer;
  font-size: 0.7rem;
  margin: 1rem;
  margin-bottom: 3rem;
  font-weight: 700;
  border-radius: 5px;
  :hover {
    scale: 1.2;
    border: black 1px solid;
  }
`;
const AdminCohortCreateComponent = ({ data, handleAdd, handleMinus }) => {
  const [cohort, setCohort] = useState("");
  const [names, setNames] = useState([]);
  const [added, setadded] = useState(false);

  return (
    <>
      <p>
        {data.profile.firstName} {data.profile.lastName}
        {"  "}
        <span>{data.profile.role}</span> <span>{data._id}</span>
      </p>

      <Button
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
      </Button>
    </>
  );
};
export default AdminCohortCreateComponent;
