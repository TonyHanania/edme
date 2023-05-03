import React from "react";
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
const ContactUsComponent = ({ contactUsData }) => {
  if (!contactUsData) {
    return null;
  }
  return (
    <>
      <div>
        <p>First name: {contactUsData.firstName}</p>
        <p>Last name: {contactUsData.lastName}</p>
        <p>Email: {contactUsData.email}</p>
        <p>Message: : {contactUsData.message}</p>
        <Button>Resolve</Button>
      </div>
    </>
  );
};
export default ContactUsComponent;
