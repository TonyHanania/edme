import React from "react";

const CircularLoader = () => {
  const loaderStyle = {
    border: "rgb(221, 252, 229) 2px solid",
    borderTopColor: "white",
    borderRadius: "50%",
    width: "50px",
    height: "50px",
    animation: "spin 1s linear infinite",
    margin: "0 auto",
  };

  return (
    <div style={loaderStyle}>
      <style>
        {`
          @keyframes spin {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
    </div>
  );
};

export default CircularLoader;
