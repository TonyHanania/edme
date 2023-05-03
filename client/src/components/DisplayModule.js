import React, { useContext, useState, useEffect } from "react";
import MakeQuiz from "./MakeQuizz";
import styled from "styled-components";
import { UserContext } from "./UserContext";
import FileBase64 from "react-file-base64";
const ModuleButton = styled.button`
  width: 100%;
  height: 3rem;
  background-color: #f5fdf2;
  border: white solid 3px;
  font-size: 1rem;
  padding: 1rem;
`;
const P = styled.p`
  font-weight: 700;
  text-align: center;
`;
const Lesson = styled.div`
  white-space: pre-wrap;
`;
const H1 = styled.h1`
  font-size: 1.5rem;
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

const Div = styled.div`
  .lessonUpdate {
    display: flex;
    flex-direction: column;
    textarea {
      margin-left: 1rem;
      height: 20rem;
      @media (max-width: 2000px) {
        width: 70rem;
      }
      @media (max-width: 900px) {
        width: 70rem;
      }
      @media (max-width: 700px) {
        width: 60rem;
      }

      @media (max-width: 400px) {
        width: 20rem;
      }

      @media (max-width: 300px) {
        width: 15rem;
      }

      /* @media (min-width: 900px) {
        width: 60rem;
      } */
    }
  }
`;
const DisplayModule = ({
  moduleData,
  setShouldModuleUpdate,
  shouldModuleUpdate,
}) => {
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [moduleCompleted, setModuleCompleted] = useState(false);
  const [cloudinary, setCloudinary] = useState(false);
  const [fileSelected, setFileSelected] = useState("");
  const [expandLesson, setExpandLesson] = useState(false);
  const [expandResourcePhoto, setExpandResourcePhoto] = useState(false);
  const [expandResourcePdf, setExpandResourcePdf] = useState(false);
  const { currentUser } = useContext(UserContext);
  const [grades, setGrades] = useState(null);
  const [cancelPhoto, setCancelPhoto] = useState(false);
  const [module, setModule] = useState({
    lesson: "",
    _id: moduleData ? moduleData._id : null,
    resourcePhoto: "",
    resourcePdf: "",
  });

  const [isLessonUpdateClicked, setIsLessonUpdateClicked] = useState(false);
  const [
    isResourcePhotoUpdateClicked,
    setIsResourcePhotoUpdateClicked,
  ] = useState(false);
  const [isResourcePdfClicked, setIsResourcePdfClicked] = useState(false);

  const [isClicked, setIsClicked] = useState(false);

  // const complete =
  //   grades &&
  //   moduleData &&
  //   currentUser &&
  //   grades.filter((grade) => {
  //     return (
  //       currentUser.email === grade.studentEmail &&
  //       grade.moduleId === moduleData._id
  //     );
  //   });

  const complete =
    grades &&
    moduleData &&
    currentUser &&
    grades.find((grade) => {
      return (
        currentUser.email === grade.studentEmail &&
        grade.moduleId === moduleData._id
      );
    });

  const handleInputChange = (e) => {
    setModule({
      ...module,
      [e.target.name]: e.target.value,
    });
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
          } else {
            console.log(xhr.status);
          }
        }
      };
    }
  };

  const handleUpdateModule = (e) => {
    e.stopPropagation();

    const updatedModule = {};
    if (module.lesson !== "") {
      updatedModule.lesson = module.lesson;
    }

    if (module.resourcePhoto !== "") {
      updatedModule.resourcePhoto = module.resourcePhoto;
    }

    if (module.resourcePdf !== "") {
      updatedModule.resourcePdf = module.resourcePdf;
      uploadFile();
    }

    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedModule),
    };

    fetch(`/subject/${moduleData._id}/updatemodule`, requestOptions)
      .then((response) => {
        if (response.status > 500) {
          // navigate("/errorPage");
        } else {
          setIsClicked(false);
          setIsLessonUpdateClicked(false);
          setExpandResourcePdf(false);
          setExpandLesson(false);
          setExpandResourcePhoto(false);
          setModule({});
          setShouldModuleUpdate(true);
        }
      })
      .catch((err) => window.alert(err));
  };

  useEffect(() => {
    fetch(`/getgrades`).then((response) => {
      if (response.status > 500) {
      } else {
        response.json().then((resData) => {
          setGrades(resData.data);
        });
      }
    });
  }, []);
  const handleCancelLessonUpdate = () => {
    setIsLessonUpdateClicked(false);
    setModule({
      ...module,
      lesson: "",
    });
  };
  const handleOpenLessonUpdate = () => {
    setIsLessonUpdateClicked(true);
  };

  const handleOpenResourcePhotoUpdate = () => {
    setIsResourcePhotoUpdateClicked(true);
    setCancelPhoto(true);
  };
  const handleCancelResourcePhotoUpdate = () => {
    setIsResourcePhotoUpdateClicked(false);
    setModule({
      ...module,
      resourcePhoto: "",
    });
  };
  const handleOpenResourcePdfUpdate = () => {
    setIsResourcePdfClicked(true);
  };
  const handleCancelResourcePdfUpdate = () => {
    setIsResourcePdfClicked(false);
    setModule({
      ...module,
      resourcePdf: "",
    });
  };
  if (!moduleData) {
    return <p>loading</p>;
  }
  return (
    <>
      <Div>
        <h3>Module {moduleData.number}</h3>

        <H1>{moduleData.title}</H1>

        <div>
          {" "}
          {!expandLesson && moduleData.lesson !== "" ? (
            <ModuleButton onClick={() => setExpandLesson(true)}>
              Expand Lesson
            </ModuleButton>
          ) : moduleData.lesson !== "" ? (
            <ModuleButton
              onClick={() => {
                setExpandLesson(false);
                setIsLessonUpdateClicked(false);
              }}
            >
              Collapse Lesson
            </ModuleButton>
          ) : null}
          {expandLesson && currentUser.profile.role === "instructor" ? (
            <Button
              onClick={
                !isLessonUpdateClicked
                  ? handleOpenLessonUpdate
                  : handleCancelLessonUpdate
              }
            >
              {!isLessonUpdateClicked ? "Edit" : "Cancel"}
            </Button>
          ) : null}
          <div className="lessonUpdate">
            {isLessonUpdateClicked ? (
              <>
                <label>
                  Lesson:
                  <textarea
                    type="input"
                    onChange={handleInputChange}
                    name="lesson"
                    value={module.lesson}
                  />
                </label>

                <Button onClick={handleUpdateModule}>Submit</Button>
              </>
            ) : null}
          </div>
          {/* {isLessonUpdateClicked ? (
            <Button onClick={handleUpdateModule}>Submit</Button>
          ) : null} */}
          {expandLesson ? (
            <>
              <Lesson>{moduleData.lesson}</Lesson>
            </>
          ) : null}
        </div>

        <div>
          {moduleData.resourcePhoto !== "" ? (
            <>
              {!expandResourcePhoto ? (
                <ModuleButton onClick={() => setExpandResourcePhoto(true)}>
                  Expand Resource
                </ModuleButton>
              ) : (
                <ModuleButton
                  onClick={() => {
                    setExpandResourcePhoto(false);
                    setIsResourcePhotoUpdateClicked(false);
                  }}
                >
                  Collapse Resource
                </ModuleButton>
              )}
            </>
          ) : null}
          {expandResourcePhoto && currentUser.profile.role === "instructor" ? (
            <Button
              onClick={
                !isResourcePhotoUpdateClicked
                  ? handleOpenResourcePhotoUpdate
                  : handleCancelResourcePhotoUpdate
              }
            >
              {!isResourcePhotoUpdateClicked ? "Edit" : "cancel"}
            </Button>
          ) : null}

          {isResourcePhotoUpdateClicked ? (
            <>
              <FileBase64
                multiple={false}
                onDone={({ base64 }) =>
                  setModule({ ...module, resourcePhoto: base64 })
                }
                name="resource"
                value={module.resourcePhoto}
              />
            </>
          ) : null}
          {isResourcePhotoUpdateClicked ? (
            <Button onClick={handleUpdateModule}>submit</Button>
          ) : null}

          {expandResourcePhoto && moduleData.resourcePhoto !== "" ? (
            <>
              <img width="100%" height="100%" src={moduleData.resourcePhoto} />
            </>
          ) : null}
        </div>

        <div>
          {moduleData && moduleData.resourcePdf !== "" ? (
            <>
              {!expandResourcePdf ? (
                <ModuleButton onClick={() => setExpandResourcePdf(true)}>
                  Expand Resource PDF
                </ModuleButton>
              ) : (
                <ModuleButton
                  onClick={() => {
                    {
                      setExpandResourcePdf(false);
                      setIsResourcePdfClicked(false);
                    }
                  }}
                >
                  Collapse Resource PDF
                </ModuleButton>
              )}
              {expandResourcePdf &&
              currentUser.profile.role === "instructor" ? (
                <Button
                  onClick={
                    !isResourcePdfClicked
                      ? handleOpenResourcePdfUpdate
                      : handleCancelResourcePdfUpdate
                  }
                >
                  {!isResourcePdfClicked ? "Edit" : "Cancel"}
                </Button>
              ) : null}
              {isResourcePdfClicked && expandResourcePdf ? (
                <>
                  <input
                    type="file"
                    name="resourcePdf"
                    onChange={(e) => {
                      setFileSelected(e.target.files[0]);
                    }}
                  />
                </>
              ) : null}
              {isResourcePdfClicked ? (
                <Button onClick={handleUpdateModule}>submit</Button>
              ) : null}
              {expandResourcePdf && moduleData.resourcePdf !== "" ? (
                <>
                  <embed
                    src={moduleData.resourcePdf}
                    width="100%"
                    height="1000px"
                    type="application/pdf"
                  />
                </>
              ) : null}
            </>
          ) : null}
        </div>

        {complete && <P>Quiz Complete. Grade: {complete.grade}</P>}

        {!complete && currentUser && currentUser.profile.role === "student" ? (
          <MakeQuiz
            moduleData={moduleData}
            moduleId={moduleData._id}
            quizCompleted={quizCompleted}
            setQuizCompleted={setQuizCompleted}
          />
        ) : null}

        {currentUser &&
        currentUser.profile.role === "instructor" &&
        moduleData.quiz.numOfQuestions !== "" ? (
          <MakeQuiz
            moduleData={moduleData}
            moduleId={moduleData._id}
            quizCompleted={quizCompleted}
            setQuizCompleted={setQuizCompleted}
          />
        ) : null}
      </Div>
    </>
  );
};

export default DisplayModule;
