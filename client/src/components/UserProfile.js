import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import { useContext } from "react";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
const UserProfile = () => {
  const navigate = useNavigate();
  const { currentUser, userRole, setUserRole } = useContext(UserContext);
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  console.log("I am current user  ", currentUser);
  const { user } = useAuth0();
  console.log(user);
  useEffect(() => {
    setLoading(true);
    fetch(`/getuser/${currentUser}`).then((response) => {
      if (response.status > 500) {
        navigate("/errorPage");
      } else {
        response
          .json()
          .then((resData) => {
            setData(resData.data);
            console.log("look at me  ", resData.data);
            setUserRole(resData.data.profile.role);
            console.log(resData.data);
            setLoading(false);
          })
          .catch((err) => console.log(err));
      }
    });
  }, [currentUser]);

  console.log(data);
  if (loading) {
    return <p>Loading</p>;
  }
  return (
    <ProfileContainer>
      <div>
        <p>
          {data.profile.firstName}. {data.profile.role}
        </p>

        <img src={data.profile.image} />
      </div>
      <div>
        <p>{data.profile.bio}</p>
      </div>
    </ProfileContainer>
  );
};

const ProfileContainer = styled.div`
  display: flex;
  border: red 1px solid;
  justify-content: space-between;

  img {
    width: 15rem;
    height: 15rem;
    border-radius: 50%;
  }
  div {
    width: 50%;
    border: red 1px solid;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: center;

    div {
      width: 100%;
      border: red 1px solid;
    }
  }
`;

export default UserProfile;
