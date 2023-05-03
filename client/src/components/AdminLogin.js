import React from "react";
import { useNavigate } from "react-router-dom";

import { useState } from "react";
import { UserContext } from "./UserContext";
import { useContext } from "react";

import styled from "styled-components";
const Button = styled.button`
  width: 8rem;
  background-color: #f5fdf2;
  padding: 0.5rem;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  margin: 1rem;

  border-radius: 5px;
  :hover {
    scale: 1.2;
  }
`;

const Container = styled.div`
  height: 20rem;

  input,
  label {
    font-size: 1rem;
  }
`;

const Span = styled.span``;
const AdminLogin = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  setCurrentUser(formData.email);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("/getpasswordverification", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        console.log("Response status: ", res.status, res);
        console.log("Response headers: ", res.headers);

        if (res.status === 200) {
          navigate(`/admin/dashboard/${formData.email}`);
        } else {
          res.json().then((data) => {
            window.alert(data.message);
          });
        }
      })
      .catch((error) => {
        console.error(error);
        window.alert("Server error");
      });
  };

  return (
    <>
      <Container>
        <form onSubmit={handleSubmit}>
          <h1>Sign In</h1>
          <label htmlFor="firstName">
            <Span></Span>Email
          </label>
          <input
            type="text"
            id="email"
            name="email"
            placeholder="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <Button type="submit" className="signInButton" onClick={handleSubmit}>
            Submit
          </Button>
        </form>
      </Container>
    </>
  );
};

export default AdminLogin;
