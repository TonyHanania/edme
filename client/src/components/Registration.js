import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
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

  console.log("I am formdata", formData);
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    formData.password = bcrypt.hashSync(formData.password, 10);
    // fetch(
    //   "/registration",

    //   {
    //     headers: {
    //       Accept: "application/json",
    //     },

    //     method: "POST",
    //     body: JSON.stringify(formData),
    //   }
    // ).then((res) => {
    //   if (res.status > 500) {
    //     navigate("/errorPage");
    //   } else {
    //     res
    //       .json()
    //       .then((resData) => {
    //         if (resData.status === 201) {
    //           navigate("/");
    //         } else {
    //           window.alert(resData.message);
    //         }
    //       })
    //       .catch((err) => {
    //         window.alert(err + "  heeeeey ");
    //       });
    //   }
    // });
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
              // checked={selectedOption === "admin"}
              onChange={handleInputChange}
            />
            Admin
          </label>
          <label>
            <input
              type="radio"
              value="student"
              name="role"
              // checked={selectedOption === "admin"}
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
