import React from "react";

const Dashboard = (user) => {
  console.log(user);
  return (
    <>
      <p>Admin dashboard</p>

      <div className="profile">
        <p>Welcome, username</p>
        <p>image</p>
        <p>bio word limit</p>
      </div>

      <div className="classCards">
        <div className="classcard1">Science</div>
        <div className="classcard2">Geography</div>
        <div className="classcard3">Math</div>
      </div>
    </>
  );
};
export default Dashboard;
