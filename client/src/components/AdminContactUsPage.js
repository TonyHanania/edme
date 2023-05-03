import React, { useEffect, useState } from "react";
import ContactUsComponent from "./AdminContactUsComponent";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
const ContactUsPage = () => {
  const [data, setData] = useState();
  const { email } = useParams();
  useEffect(() => {
    fetch(`/admin/customersupport`).then((response) => {
      if (response.status > 500) {
      } else {
        response
          .json()
          .then((resData) => {
            setData(resData.data);
          })
          .catch((err) => console.log(err));
      }
    });
  }, []);

  if (!data) {
    return <p>loading</p>;
  }
  console.log(
    data.map((customerRequest) => {
      return customerRequest.firstName;
    })
  );
  return (
    <>
      <Link to={`/admin/dashboard/${email}`}> ↩ Admin Dashboard</Link>
      <h2>Contact Us Support Page</h2>
      {data.map((customerRequest) => {
        return (
          <>
            <ContactUsComponent contactUsData={customerRequest} />
          </>
        );
      })}{" "}
    </>
  );
};

export default ContactUsPage;
