import React from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
const AdminDashboardContainer = styled.div`
  display: flex;
  flex-direction: column;

  height: 30vh;
  justify-content: space-between;
`;
const AdminDashboard = () => {
  const { email, admin } = useParams();
  console.log(email, admin);
  return (
    <>
      <h1>Welcome, {email} </h1>
      <h2>Administrative Dashboard</h2>
      <AdminDashboardContainer>
        <Link to={`/admin/${email}/contactus`}>Customer Support</Link>
        <Link to={`/admin/createcohort/${email}`}>Class Management</Link>
        <Link to={`/admin/userconfirmation/${email}`}>
          Instructor and Student Account Confirmation Page
        </Link>
      </AdminDashboardContainer>
    </>
  );
};

export default AdminDashboard;
