import React from "react";
import styled from "styled-components";
import { useContext } from "react";
import { UserContext } from "./UserContext";

const Container = styled.div``;
const DashBoardDisplay = () => {
  const { currentUser } = useContext(UserContext);
  console.log(currentUser);
  //check to see if user selected profile or not

  //if no profile display sert profile dialog

  //if yes message, check if confirmed by admin

  //if confirmed display profile else message

  return (
    <>
      <Container></Container>
    </>
  );
};
