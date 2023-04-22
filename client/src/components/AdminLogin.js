import React from "react";
import { useNavigate } from "react-router-dom";

import { useState } from "react";
const AdminLogin = () => {
  //   const navigate = useNavigate();
  //   const [formData, setFormData] = useState({
  //     email: "",
  //     password: "",
  //   });

  //   const handleChange = (e) => {
  //     setFormData({ ...formData, [e.target.name]: e.target.value });
  //   };

  //   const handleSubmit = (e) => {
  //     console.log(formData);
  //     e.preventDefault();
  //     fetch("/getpasswordverification", {
  //       method: "POST",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(formData),
  //     })
  //       .then((res) => {
  //         console.log("Response status: ", res.status); // log the response status
  //         console.log("Response headers: ", res.headers); // log the response headers

  //         console.log(res);

  //         // parse the response body as JSON
  //         res
  //           .json()
  //           .then((resData) => {
  //             console.log("Response data: ", resData); // log the response data

  //             if (resData.status === 201) {
  //               navigate("/dashboard");
  //             } else {
  //               window.alert(resData.message);
  //             }
  //           })
  //           .catch((err) => {
  //             window.alert(err + "  heeeeey 1");
  //           });
  //       })
  //       .catch((err) => {
  //         window.alert(err + "  heeeeey 2");
  //       })
  //       .catch((err) => window.alert(err));
  //   };
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

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
        console.log("Response status: ", res.status);
        console.log("Response headers: ", res.headers);

        if (res.status === 200) {
          navigate("/admin/dashboard");
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
          <button type="submit" className="signInButton" onClick={handleSubmit}>
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

export default AdminLogin;
