import React, { useState } from "react";
import FileBase64 from "react-file-base64";
import DisplayModule from "./DisplayModule";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const CreateModuleContainer = styled.div`
  form {
    height: 30rem;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    margin-top: 2rem;
    @media (max-width: 900px) {
      margin-top: 5rem;
      height: 50rem;
    }
    @media (max-width: 500px) {
      height: 50rem;
    }
  }
  .title {
    width: 100%;
    display: flex;
    justify-content: space-around;
    height: 6rem;
  }
  textarea {
    width: 50rem;
    height: 15rem;
    @media (max-width: 700px) {
      width: 25rem;
    }
  }
  div {
    margin: 1rem;
  }
`;

const Button = styled.button`
  width: 8rem;
  background-color: #f5fdf2;
  padding: 1rem;
  border: none;
  cursor: pointer;
  font-size: 0.7rem;
  margin: 1rem;
  font-weight: 900;
  border-radius: 5px;
  :hover {
    scale: 1.2;
  }
`;

const Quiz = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  @media (max-width: 700px) {
    flex-direction: column;
  }
`;
const CreateModule = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [fileSelected, setFileSelected] = useState("");
  const [cloudinary, setCloudinary] = useState(false);
  const { cohortId, subject } = useParams();
  console.log(cohortId);
  const [module, setModule] = useState({
    subject: subject,
    number: "",
    title: "",
    quiz: {
      numOfQuestions: "",
      category: "",
      difficulty: "",
    },
    lesson: "",
    resourcePhoto: "",
    resourcePdf: "",
    cohortId: cohortId,
  });
  const handleInputChange = (e) => {
    setModule({
      ...module,
      [e.target.name]: e.target.value,
    });
  };

  const handleQuizInputChange = (e) => {
    const { name, value } = e.target;
    setModule((prevState) => ({
      ...prevState,
      quiz: {
        ...prevState.quiz,
        [name]: value,
      },
    }));
  };

  const uploadFile = () => {
    setCloudinary(true);

    if (fileSelected) {
      const formData = new FormData();
      formData.append("file", fileSelected);
      formData.append("upload_preset", "wnk8cmtt");

      const xhr = new XMLHttpRequest();
      xhr.open(
        "POST",
        "https://api.cloudinary.com/v1_1/dluedukuc/image/upload"
      );
      xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
      xhr.send(formData);
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            const responseJson = JSON.parse(xhr.responseText);
            console.log(responseJson);

            setModule({
              ...module,
              resourcePdf: responseJson.url,
            });

            console.log("i am the random  ", module);
          } else {
            console.log(xhr.status);
          }
        }
      };
    }
  };
  console.log("outsiode path ", cloudinary);
  const handleSubmit = (e) => {
    uploadFile();
    e.preventDefault();
    console.log("inside", cloudinary);

    cloudinary &&
      fetch("/createmodule", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(module),
      })
        .then((response) => {
          response.json();
          setCloudinary(false);
          console.log(response);
        })
        .then((data) => {
          console.log(data);
          window.location.reload();
          setModule({
            subject: "",
            number: "",
            title: "",
            quiz: {
              numOfQuestions: "",
              category: "",
              difficulty: "",
            },
            lesson: "",
            resourcePhoto: "",
            resourcePdf: "",
          });
          setIsClicked(false);
        })
        .catch((error) => console.error(error));
  };

  const handleCancel = (e) => {
    setModule({
      subject: "",
      number: "",
      title: "",
      quiz: {
        numOfQuestions: "",
        category: "",
        difficulty: "",
      },
      lesson: "",
      resourcePhoto: "",
      resourcePdf: "",
    });
    setIsClicked(false);
  };

  console.log(module, fileSelected);
  return (
    <CreateModuleContainer>
      {!isClicked ? (
        <>
          <p>Create Module </p>

          <Button
            onClick={() => {
              setIsClicked(true);
            }}
          >
            {" "}
            Create Module{" "}
          </Button>
        </>
      ) : null}
      {isClicked ? (
        <>
          <Button
            onClick={() => {
              handleCancel();
            }}
          >
            Cancel
          </Button>

          <form>
            <div className="title">
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
                Title
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
                Lesson:
                <textarea
                  type="input"
                  onChange={handleInputChange}
                  name="lesson"
                  value={module.lesson}
                />
              </label>
            </div>

            <Quiz>
              <label>
                Category:
                <select
                  name="category"
                  value={module.quiz.category}
                  onChange={handleQuizInputChange}
                >
                  <option value="17">Science & Nature 50</option>
                  <option value="18">
                    Computer Science 34 easy 50 medium 34 hard
                  </option>
                  <option value="22">Geography 50 </option>
                  <option value="19">Math 8 easy 16 medium 12 hard </option>
                  <option value="23">History 50 </option>
                </select>
              </label>

              <br />

              <label>
                Number of Questions:
                <input
                  name="numOfQuestions"
                  type="number"
                  value={module.quiz.numOfQuestionsQuestions}
                  onChange={handleQuizInputChange}
                />
              </label>

              <br />

              <label>
                Difficulty Level:
                <br />
                <label>
                  <input
                    type="radio"
                    value="easy"
                    name="difficulty"
                    checked={module.quiz.difficulty === "easy"}
                    onChange={handleQuizInputChange}
                  />
                  Easy
                </label>
                <br />
                <label>
                  <input
                    type="radio"
                    value="medium"
                    name="difficulty"
                    checked={module.quiz.difficulty === "medium"}
                    onChange={handleQuizInputChange}
                  />
                  Medium
                </label>
                <br />
                <label>
                  <input
                    type="radio"
                    value="hard"
                    checked={module.quizdifficulty === "hard"}
                    onChange={handleQuizInputChange}
                  />
                  Hard
                </label>
              </label>

              <br />
            </Quiz>
            <div>
              <span>Upload Image Files: </span>
              <FileBase64
                multiple={false}
                onDone={({ base64 }) =>
                  setModule({ ...module, resourcePhoto: base64 })
                }
                name="resource"
                value={module.resourcePhoto}
              />
            </div>

            <div>
              <span>Upload PDF Files: </span>

              <input
                type="file"
                name="resourcePdf"
                onChange={(e) => {
                  setFileSelected(e.target.files[0]);
                }}
              />
            </div>

            <Button onClick={handleSubmit}>Submit </Button>
          </form>
        </>
      ) : null}
      <h3>Student View</h3>
      <DisplayModule moduleData={module} />
    </CreateModuleContainer>
  );
};

export default CreateModule;
