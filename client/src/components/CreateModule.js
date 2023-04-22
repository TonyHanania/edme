import React, { useState } from "react";
import FileBase64 from "react-file-base64";
const CreateModule = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [fileSelected, setFileSelected] = useState("");
  const [cloudinary, setCloudinary] = useState(false);

  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [numQuestions, setNumQuestions] = useState("");

  const [module, setModule] = useState({
    subject: "Science",
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

  const handleSubmit = (e) => {
    uploadFile();

    e.preventDefault();
    console.log(module);
    // Make a POST request to your backend API with the module data
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
          console.log(response);
        })
        .then((data) => {
          console.log(data);

          // Clear the form and set isClicked to false to close the form
          setModule({
            subject: "Science",
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
      subject: "Science",
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
    <>
      {!isClicked ? (
        <>
          <p>Create Module </p>
          <button
            onClick={() => {
              setIsClicked(true);
            }}
          >
            {" "}
            Create Module{" "}
          </button>
        </>
      ) : null}
      {isClicked ? (
        <>
          <button>Add Module</button>
          <button
            onClick={() => {
              handleCancel();
            }}
          >
            Cancel
          </button>

          <form>
            <div>
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
                Lesson:
                <textarea
                  type="input"
                  onChange={handleInputChange}
                  name="lesson"
                  value={module.lesson}
                />
              </label>
            </div>

            <div>
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
                  onChange={
                    handleQuizInputChange
                    //   (e) => {
                    //   if (category === "19" && difficulty === "easy") {
                    //     setNumQuestions("8");
                    //     e.target.value = "8";
                    //   } else if (category === "19" && difficulty === "medium") {
                    //     setNumQuestions("16");
                    //     e.target.value = "16";
                    //   } else if (
                    //     category === "19" &&
                    //     difficulty === "hard" &&
                    //     e.target.value > 12
                    //   ) {
                    //     setNumQuestions("");
                    //     alert("Choose up to 12");
                    //   } else {
                    //     setNumQuestions(e.target.value);
                    //   }
                    // }
                  }
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
              {/* <label>
                <input
                  type="input"
                  name="quiz"
                  value={module.quiz}
                  onChange={handleInputChange}
                />
              </label> */}

              <br />
            </div>
            <div></div>

            <FileBase64
              multiple={false}
              onDone={({ base64 }) =>
                setModule({ ...module, resourcePhoto: base64 })
              }
              name="resource"
              value={module.resourcePhoto}
            />
            <p>resource</p>
            <p>Upload</p>

            <input
              type="file"
              name="resourcePdf"
              onChange={(e) => {
                setFileSelected(e.target.files[0]);
              }}
            />

            <button onClick={handleSubmit}>Submit </button>
          </form>
        </>
      ) : null}
    </>
  );
};

export default CreateModule;
