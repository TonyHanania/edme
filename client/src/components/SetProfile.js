import React from "react";
import FileBase64 from "react-file-base64";
import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "./UserContext";
import { useNavigate } from "react-router-dom";
const SetProfile = () => {
  const [profile, setProfile] = useState({
    bio: "",
    role: "",
    firstName: "",
    lastName: "",
    image: "",
    isconfirmed: false,
    isSelected: false,
  });
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [isProfileSet, setIsProfileSet] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (profile.bio !== "" && profile.image !== "" && profile.role !== "") {
      setIsProfileSet(true);
      setProfile({
        ...profile,
        isSelected: true,
      });
    }
    console.log("isprofile is ", isProfileSet);

    fetch(`/setprofile/${currentUser}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profile),
    })
      .then((response) => {
        navigate("/dashboard");
      })
      .catch((error) => {
        // Handle error here
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* <label>
        Upload picture:
        <input type="file" onChange={handleInputChange} />
      </label> */}
      <FileBase64
        multiple={false}
        onDone={({ base64 }) => setProfile({ ...profile, image: base64 })}
        name="image"
        value={profile.image}
      />
      <label>
        bio:
        <textarea
          type="input"
          onChange={handleInputChange}
          name="bio"
          value={profile.bio}
        />
      </label>

      <label>
        First Name:
        <input
          onChange={handleInputChange}
          name="firstName"
          value={profile.firstName}
          type="input"
        />
      </label>

      <label>
        Last Name:
        <input
          type="input"
          onChange={handleInputChange}
          name="lastName"
          value={profile.lastName}
        />
      </label>

      <div>
        <label>
          {" "}
          Role
          <input
            type="radio"
            value="instructor"
            name="role"
            // checked={selectedOption === "admin"}
            onChange={handleInputChange}
          />
          Instructor
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

      <button type="submit">Submit</button>
      {profile.image && (
        <img
          src={profile.image}
          alt="Selected picture"
          width="100px"
          height="100px"
        />
      )}
    </form>
  );
};

export default SetProfile;
