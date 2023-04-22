import React, { useState } from "react";
import { Form } from "react-router-dom";
import { Image } from "cloudinary-react";

const Upload = () => {
  const [fileSelected, setFileSelected] = useState("");
  const formData = new FormData();
  const uploadFile = () => {
    formData.append("file", fileSelected);
    formData.append("upload_preset", "wnk8cmtt");

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "https://api.cloudinary.com/v1_1/dluedukuc/image/upload");
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    xhr.send(formData);
    console.log(formData);
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          const response = JSON.parse(xhr.responseText);
          console.log(response);
        } else {
          console.log(xhr.status);
        }
      }
    };
  };

  console.log(fileSelected);
  // fetch(`https://api.cloudinary.com/v1_1/dluedukuc/image/upload`);
  return (
    <>
      <p>Upload</p>

      <input
        type="file"
        onChange={(e) => {
          setFileSelected(e.target.files[0]);
        }}
      />
      <button type="submit" onClick={uploadFile}>
        Submit{" "}
      </button>

      <Image
        cloudName="dluedukuc"
        publicId="https://res.cloudinary.com/dluedukuc/image/upload/v1681263230/zxyplbgdhqo5vaniipbo.webp"
      />
      <embed
        src="https://res.cloudinary.com/dluedukuc/image/upload/v1681262359/yvdhpaxce7max5azn97k.pdf"
        type="application/pdf"
      />

      <embed
        src="https://res.cloudinary.com/dluedukuc/image/upload/v1681592895/n3eh2lnjmwfqwiuisgue.pdf"
        type="application/pdf"
      />
    </>
  );
};

export default Upload;
