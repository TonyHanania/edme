import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import Dashboard from "./Dashboard";
import React from "react";
import { useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs";
const Login = () => {
  const navigate = useNavigate();
  //   const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

  // if (isAuthenticated) {
  //   Navigate("/dashboard");
  // }
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    formData.password = bcrypt.hashSync(formData.password, 10);
    fetch("/getpasswordverification", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        console.log("Response status: ", res.status); // log the response status
        console.log("Response headers: ", res.headers); // log the response headers

        console.log(res);

        // parse the response body as JSON
        res
          .json()
          .then((resData) => {
            console.log("Response data: ", resData); // log the response data

            if (resData.status === 201) {
              navigate("/login");
            } else {
              window.alert(resData.message);
            }
          })
          .catch((err) => {
            window.alert(err + "  heeeeey ");
          });
      })
      .catch((err) => {
        window.alert(err + "  heeeeey ");
      })
      .catch((err) => window.alert(err));
  };
  return (
    <>
      <div className="wrapper">
        <form className="form" onSubmit={handleSubmit}>
          <h1 className="pageTitle signInTitle">Sign In</h1>
          <label htmlFor="firstName">Email</label>
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
          <button className="signInButton" type="submit" onClick={handleSubmit}>
            Submit
          </button>
        </form>
        <button
          className="signInButton"
          type="submit"
          onClick={() => navigate("/passwordreset")}
        >
          Reset password
        </button>
      </div>
    </>
  );
};

export default Login;
