import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import styled from "styled-components";
import AdminCohortCreateComponent from "./AdminCohortCreateComponent";

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
const Container = styled.div`
  border: rgb(221, 252, 229) 2px solid;
  display: flex;
`;
const UserConfirmationComponent = ({ user, onConfirm }) => {
  const navigate = useNavigate();
  const [isClicked, setIsClicked] = useState(false);
  const [data, setData] = useState();

  return (
    <>
      <Container>
        <div>
          <img src={user.profile.image} height="100px" />
        </div>

        <div>
          <p>
            Name: {user.profile.firstName} {user.profile.lastName}
          </p>
          <p>{user.role}</p>
          <p>User Confirmed: {`${user.profile.isconfirmed}`}</p>
          <p>Role: {user.profile.role}</p>
          {!user.profile.isconfirmed ? (
            <Button
              onClick={() => {
                // handleConfirmation(user.email);
                // setIsClicked(true);
                onConfirm(user.email);
              }}
            >
              confirm
            </Button>
          ) : null}
        </div>
      </Container>
    </>
  );
};

export default UserConfirmationComponent;
