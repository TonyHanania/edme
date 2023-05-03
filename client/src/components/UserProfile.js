import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import { useContext } from "react";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import FileBase64 from "react-file-base64";

const UserProfile = () => {
  const navigate = useNavigate();
  const { currentUser, userRole, setUserRole } = useContext(UserContext);
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({
    bio: "",
    image: "",
  });
  const { user } = useAuth0();

  const [isClicked, setIsClicked] = useState(false);
  const [isImageClicked, setIsImageClicked] = useState(false);
  const [shouldUserFetch, setShouldUserFetch] = useState(true);
  const handleInputChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (shouldUserFetch) {
      setLoading(true);
      fetch(`/getuser/${user.email}`).then((response) => {
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
              setShouldUserFetch(false);
            })
            .catch((err) => console.log(err));
        }
      });
    }
  }, [currentUser, shouldUserFetch]);
  console.log(profile.bio, profile.image, profile);
  const openupdatebio = () => {
    setIsClicked(true);
  };
  const openImage = () => {
    setIsImageClicked(true);
  };
  const handleCloseImage = () => {
    setIsImageClicked(false);
  };

  const handleCancel = () => {
    setIsClicked(false);
  };

  const handleUpdateProfile = () => {
    const updatedProfile = {};

    if (profile.bio !== "") {
      updatedProfile.bio = profile.bio;
    }

    if (profile.image !== "") {
      updatedProfile.image = profile.image;
    }
    console.log(profile.image);
    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedProfile),
    };

    fetch(`/user/${currentUser.email}/updateprofile`, requestOptions)
      .then((response) => {
        if (response.status > 500) {
          navigate("/errorPage");
        } else {
          setIsClicked(false);
          setIsImageClicked(false);
          setShouldUserFetch(true);
        }
      })
      .catch((err) => window.alert(err));
  };

  if (loading) {
    return null;
  }

  return (
    <ProfileContainer>
      <NamePic>
        <div className="nameDiv">
          {" "}
          <P>
            Name:{" "}
            <Span>
              {data.profile.firstName} {data.profile.lastName}
            </Span>
          </P>{" "}
          <P>
            Role: <Span>{data.profile.role}</Span>
          </P>
        </div>
        <ImageDiv>
          <div>
            <img src={data.profile.image} />
          </div>

          <div>
            {isImageClicked ? (
              <>
                <div>
                  <FileBase64
                    multiple={false}
                    onDone={({ base64 }) =>
                      setProfile({ ...profile, image: base64 })
                    }
                    name="image"
                  />
                  <Button onClick={handleUpdateProfile}>Submit</Button>
                </div>
              </>
            ) : null}
            <Button onClick={!isImageClicked ? openImage : handleCloseImage}>
              {!isImageClicked ? "Change Image" : "cancel"}
            </Button>
          </div>
        </ImageDiv>
      </NamePic>

      <Bio>
        {!isClicked ? (
          <>
            <P>Bio:</P>
            <p>{data.profile.bio}</p>
          </>
        ) : (
          <>
            <Label>
              bio:
              <textarea
                type="input"
                onChange={handleInputChange}
                name="bio"
                value={profile.bio}
              />
            </Label>
          </>
        )}
        <Button onClick={!isClicked ? openupdatebio : handleUpdateProfile}>
          {!isClicked ? "Update bio" : "Submit"}
        </Button>
        {isClicked ? <Button onClick={handleCancel}>Cancel</Button> : null}
      </Bio>
    </ProfileContainer>
  );
};

const ProfileContainer = styled.div`
  textarea {
    width: 100%;
    height: 5rem;
  }

  display: flex;

  justify-content: space-around;

  img {
    width: 15rem;
    height: 15rem;
    border-radius: 50%;
    border: rgb(221, 252, 229) 3px solid;
  }
  .nameDiv {
    border-bottom: rgb(221, 252, 229) 2px solid;
    width: 35rem;
    margin-bottom: 1rem;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: center;

    div {
      width: 100%;
      height: 15rem;
      button {
        height: 2rem;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }

    button {
      font-size: 0.6rem;
      font-weight: 900;
    }
  }
`;
const Span = styled.span`
  text-transform: capitalize;
  font-weight: 400;
`;

const Bio = styled.div`
  font-size: 1.5rem;
  width: 45%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 2rem;
  border-radius: 15px;
  height: 17rem;
  align-self: center;
  border: rgb(221, 252, 229) 2px solid;
  @media (max-width: 725px) {
    height: 3rem;
    font-size: 1rem;
    justify-content: flex-end;
    width: 60px;
    border: none;
  }
`;
const Button = styled.button`
  width: 8rem;
  background-color: #f5fdf2;
  padding: 1rem;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  margin: 1rem;

  border-radius: 5px;
  :hover {
    scale: 1.2;
  }
`;

const P = styled.p`
  font-weight: 700;
`;
const NamePic = styled.div`
  display: flex;
  flex-direction: column;
  height: 22rem;
`;

const ImageDiv = styled.div`
  display: flex;

  div {
    width: 50%;
  }
  button {
    margin: 1rem;
  }
`;
const Label = styled.label``;

export default UserProfile;
