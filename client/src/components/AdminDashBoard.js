import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const AdminDashboard = () => {
  return (
    <>
      <p>I am admin</p>

      <Link>Customer Support</Link>
      <Link to="/admin/createcohort">Class Management</Link>
      <Link to="/admin/userconfirmation">
        Instructor and Student Account Confirmation Page
      </Link>
      <Link>Something</Link>
    </>
  );
};

export default AdminDashboard;
