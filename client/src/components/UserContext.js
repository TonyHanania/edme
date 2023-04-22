import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { useState } from "react";
import { useEffect, createContext } from "react";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const { isAuthenticated, user } = useAuth0();
  const [currentUser, setCurrentUser] = useState(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));

    return user;
  });

  const [userRole, setUserRole] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    if (isAuthenticated) {
      fetch(`/getuser/${user.email}`)
        .then((res) => {
          return res.json();
        })
        .then((parsedData) => {
          setCurrentUser(parsedData.data);
          setStatus("idle");
          console.log("i am fdrom context  ", parsedData.data);
        })

        .catch((error) => {
          setStatus("error");
        });
    }
  }, [isAuthenticated]);
  console.log(user, isAuthenticated);
  return (
    <>
      <UserContext.Provider
        value={{ currentUser, status, setCurrentUser, setUserRole, userRole }}
      >
        {children}
      </UserContext.Provider>
    </>
  );
};
