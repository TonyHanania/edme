import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import UserConfirmationComponent from "./AdminUserConfirmationComponent";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
const UserConfirmation = () => {
  const navigate = useNavigate();
  const { email } = useParams();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [isClicked, setIsClicked] = useState(true);

  useEffect(() => {
    if (isClicked) {
      fetch("/getusers").then((response) => {
        if (response.status > 500) {
          navigate("/errorPage");
        } else {
          response
            .json()
            .then((resData) => {
              setData(resData.data);
              setLoading(false);
            })
            .catch((err) => window.alert(err));
        }
      });
      setIsClicked(false);
    }
  }, [isClicked]);

  const handleOnConfirm = (email) => {
    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isconfirmed: true }),
    };

    fetch(`/user/${email}/confirm`, requestOptions)
      .then((response) => {
        if (response.status > 500) {
          navigate("/errorPage");
        } else {
          setIsClicked(true);
        }
      })
      .catch((err) => window.alert(err));
  };

  if (loading) {
    return <p>loading</p>;
  }

  return (
    <>
      <Link to={`/admin/dashboard/${email}`}> ↩ Admin Dashboard</Link>
      {data.map((user) => {
        return user.profile ? (
          <>
            <UserConfirmationComponent
              user={user}
              onConfirm={handleOnConfirm}
            />
          </>
        ) : null;
      })}
    </>
  );
};

export default UserConfirmation;
