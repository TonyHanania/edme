import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ContactUs = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/contactus", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(formData),
    }).then((res) => {
      if (res.status > 500) {
        navigate("/errorpage");
      } else {
        res
          .json()
          .then((resData) => {
            window.alert(resData.message);
            window.location.href = "/";
          })
          .catch((err) => window.alert(err));
      }
    });
  };

  return (
    <div className="wrapper">
      <form className="form" onSubmit={handleSubmit}>
        <h2>Please enter your information here: </h2>
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

        <label htmlFor="message">Message</label>
        <textarea
          type="text"
          id="message"
          name="message"
          placeholder="Your message"
          value={formData.message}
          onChange={handleInputChange}
          required
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ContactUs;
