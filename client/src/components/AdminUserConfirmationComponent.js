import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import styled from "styled-components";
import AdminCohortCreateComponent from "./AdminCohortCreateComponent";

const Container = styled.div`
  border: 1px red solid;
`;
const UserConfirmationComponent = ({ user, onConfirm }) => {
  const navigate = useNavigate();
  const [isClicked, setIsClicked] = useState(false);
  const [data, setData] = useState();

  return (
    <>
      <Container>
        <p>
          Name: {user.profile.firstName} {user.profile.lastName}
        </p>
        <p>{user.role}</p>
        <p>User Confirmed: {`${user.profile.isconfirmed}`}</p>
        {!user.profile.isconfirmed ? (
          <button
            onClick={() => {
              // handleConfirmation(user.email);
              // setIsClicked(true);
              onConfirm(user.email);
            }}
          >
            confirm
          </button>
        ) : null}
      </Container>
    </>
  );
};

export default UserConfirmationComponent;
