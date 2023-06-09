import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import bcrypt from "bcryptjs";
const SignUpForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
    profile: {
      image: "",
      bio: "",
    },
  });

  
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    formData.password = bcrypt.hashSync(formData.password, 10);
    
    fetch(
      "/registration",

      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },

        method: "POST",
        body: JSON.stringify(formData),
      }
    )
      .then((res) => {
        console.log("Response status: ", res.status); 
        console.log("Response headers: ", res.headers); 

        console.log(res);

        res
          .json()
          .then((resData) => {
            console.log("Response data: ", resData); 

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
      });
  };

  return (
    <div className="wrapper registrationWrapper">
      <form className="form" onSubmit={handleSubmit}>
        <h2 className="pageTitle signInTitle">Sign Up</h2>
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleInputChange}
          required
        />
        <label htmlFor="email">Email Address</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
          required
        />

        <div>
          <label>
            <input
              type="radio"
              value="admin"
              name="role"
     
              onChange={handleInputChange}
            />
            Admin
          </label>
          <label>
            <input
              type="radio"
              value="student"
              name="role"
              
              onChange={handleInputChange}
            />
            Student
          </label>
        </div>
        <button classanme="signUpButton" type="submit">
          Sign up
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
