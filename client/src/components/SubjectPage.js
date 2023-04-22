import React from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import FileBase64 from "react-file-base64";
import styled from "styled-components";
import Upload from "./Upload";

import { fill } from "@cloudinary/url-gen/actions/resize";
import { CloudinaryImage } from "@cloudinary/url-gen";
import { Image, Video, Transformation } from "cloudinary-react";
const ScreenSplit = styled.div``;

const SubjectPage = () => {
  const [fileSelected, setFileSelected] = useState("");
  const { subject } = useParams();
  const [isClicked, setIsClicked] = useState(false);
  const formData = new FormData();
  formData.append("file", fileSelected);
  formData.append("upload_preset", "wnk8cmtt");

  const [module, setModule] = useState({
    subject: subject,
    number: "",
    title: "",
    quiz: "",
    lesson: "",
    resource: "",
  });

  console.log(module);
  const handleInputChange = (e) => {
    setModule({
      ...module,
      [e.target.name]: e.target.value,
    });
  };
  console.log(subject);
  const handleAdd = () => {
    setIsClicked(true);
  };

  const handleCancel = () => {
    setIsClicked(false);
    setModule({ number: "", title: "", quiz: "", lesson: "", resource: "" });
  };

  const uploadFile = () => {
    const formData = new FormData();
    formData.append("file", fileSelected);
    formData.append("upload_preset", "wnk8cmtt");

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "https://api.cloudinary.com/v1_1/dluedukuc/image/upload");
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    xhr.send(formData);
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          console.log(xhr.responseText);
        } else {
          console.log(xhr.status);
        }
      }
    };
  };

  const handleSubmit = () => {
    uploadFile();
  };
  return (
    <>
      <h1>{subject}</h1>
      <ScreenSplit>
        <div>
          <h2> Subject page Admin</h2>

          <button onClick={!isClicked ? handleAdd : handleSubmit}>
            {!isClicked ? "Create module" : "Add module"}
          </button>
          {isClicked ? (
            <form>
              <div>
                <button>Cancel</button>
                <label>
                  Number in series:
                  <input
                    onChange={handleInputChange}
                    name="number"
                    value={module.number}
                    type="input"
                  />
                </label>
                <label>
                  title
                  <input
                    onChange={handleInputChange}
                    name="title"
                    value={module.title}
                    type="input"
                  />
                </label>
              </div>

              <div>
                <label>
                  quiz: Yes
                  <input
                    type="radio"
                    onChange={handleInputChange}
                    name="quiz"
                    value="yes"
                  />
                </label>

                <label>
                  No
                  <input
                    type="radio"
                    onChange={handleInputChange}
                    name="quiz"
                    value="no"
                  />
                </label>
              </div>

              <div>
                <label>
                  Lesson:
                  <textarea
                    type="input"
                    onChange={handleInputChange}
                    name="lesson"
                    value={module.lesson}
                  />
                </label>
              </div>

              <FileBase64
                multiple={false}
                onDone={({ base64 }) =>
                  setModule({ ...module, resource: base64 })
                }
                name="resource"
                value={module.resource}
              />
              <p>resource</p>
              <p>Upload</p>

              <input
                type="file"
                onChange={(e) => {
                  setFileSelected(e.target.files[0]);
                }}
              />
              <button onClick={uploadFile}>Submit </button>
            </form>
          ) : null}
        </div>

        <div>
          <h2>Student View</h2>
          <h1>{module.title}</h1>
          <Lesson>{module.lesson}</Lesson>
        </div>

        <img width="100%" height="100%" src={module.resource} />

        <embed
          src="https://res.cloudinary.com/dluedukuc/image/upload/v1681262359/yvdhpaxce7max5azn97k.pdf"
          type="application/pdf"
        />
      </ScreenSplit>
    </>
  );
};
const Lesson = styled.div`
  white-space: pre-wrap;
`;
const AdvancedImage = styled.img``;
export default SubjectPage;
