import React from "react";
import FileBase64 from "react-file-base64";
import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "./UserContext";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";


const FormContainer = styled.div`
  border: rgb(221, 252, 229) 3px solid;
  border-radius: 15px;
  padding: 2rem;
  height: 30rem;
  width: 60rem;
  margin: 4rem auto;
  display: flex;
  flex-direction: column;

  label {
    margin: 1rem;
  }
  form {
    display: flex;
    flex-direction: column;
    justify-items: space-evenly;

    align-items: center;
    div {
      margin: 1rem;
    }
    textarea {
      width: 30rem;
      height: 10rem;
    }
  }
`;

const Button = styled.button`
  width: 8rem;
  background-color: #f5fdf2;
  padding: 1rem;
  border: none;
  cursor: pointer;
  font-size: 0.7rem;
  margin: 1rem;

  border-radius: 5px;
  :hover {
    scale: 1.2;
  }
`;
const SetProfile = () => {
  const [profile, setProfile] = useState({
    bio: "",
    role: "",
    firstName: "",
    lastName: "",
    image: "",
    isconfirmed: false,
    isSelected: false,
    activeCohort: "",
  });
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [isProfileSet, setIsProfileSet] = useState(false);
  console.log(currentUser);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (profile.bio !== "" && profile.role !== "") {
      setIsProfileSet(true);
    }

    fetch(`/setprofile/${currentUser.email}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...profile, isSelected: true }),
    })
      .then((response) => {
        if (response.ok) {
          setCurrentUser({
            ...currentUser,
            profile: { ...profile, isSelected: true },
          });
          navigate(`/dashboard/${currentUser.email}`);
        } else {
          throw new Error("Failed to update profile");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  console.log(profile);
  console.log("isprofile is ", profile.isSelected, profile.activeCohort);
  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>
        <div>
          <span>Upload your Image: </span>
          <FileBase64
            multiple={false}
            onDone={({ base64 }) => setProfile({ ...profile, image: base64 })}
            name="image"
            value={profile.image}
          />
        </div>

        <div>
          {" "}
          <label>
            Bio:
            <textarea
              type="input"
              onChange={handleInputChange}
              name="bio"
              value={profile.bio}
            />
          </label>
        </div>

        <div>
          {" "}
          <label>
            First Name:
            <input
              onChange={handleInputChange}
              name="firstName"
              value={profile.firstName}
              type="input"
            />
          </label>
        </div>
        <div>
          <label>
            Last Name:
            <input
              type="input"
              onChange={handleInputChange}
              name="lastName"
              value={profile.lastName}
            />
          </label>
        </div>

        <div>
          <label>
            {" "}
            Role:
            <input
              type="radio"
              value="instructor"
              name="role"
              onChange={handleInputChange}
            />
            Instructor
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

        <Button type="submit">Submit</Button>
      </form>
    </FormContainer>
  );
};

export default SetProfile;
