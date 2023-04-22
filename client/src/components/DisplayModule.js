import React, { useState } from "react";
import MakeQuiz from "./MakeQuizz";
import styled from "styled-components";

const ModuleButton = styled.button`
  width: 100%;
`;

const Lesson = styled.div`
  white-space: pre-wrap;
`;
const DisplayModule = ({ moduleData }) => {
  const [expandLesson, setExpandLesson] = useState(false);
  const [expandResourcePhoto, setExpandResourcePhoto] = useState(false);
  const [expandResourcePdf, setExpandResourcePdf] = useState(false);
  return (
    <>
      <>
        <h3>Module {moduleData.number}</h3>

        <h1>{moduleData.title}</h1>

        <div>
          {" "}
          {!expandLesson && moduleData.lesson !== "" ? (
            <ModuleButton onClick={() => setExpandLesson(true)}>
              Expand Lesson
            </ModuleButton>
          ) : moduleData.lesson !== "" ? (
            <ModuleButton onClick={() => setExpandLesson(false)}>
              Collapse Lesson
            </ModuleButton>
          ) : null}
          {expandLesson ? <Lesson>{moduleData.lesson}</Lesson> : null}
        </div>

        <div>
          {!expandResourcePhoto ? (
            <ModuleButton onClick={() => setExpandResourcePhoto(true)}>
              Expand Resource
            </ModuleButton>
          ) : (
            <ModuleButton onClick={() => setExpandResourcePhoto(false)}>
              Collapse Resource
            </ModuleButton>
          )}

          {expandResourcePhoto && moduleData.resourcePhoto !== "" ? (
            <img width="100%" height="100%" src={moduleData.resourcePhoto} />
          ) : null}
        </div>

        <div>
          {moduleData.resourcePdf !== "" ? (
            <>
              {!expandResourcePdf ? (
                <ModuleButton onClick={() => setExpandResourcePdf(true)}>
                  Expand Resource PDF
                </ModuleButton>
              ) : (
                <ModuleButton onClick={() => setExpandResourcePdf(false)}>
                  Collapse Resource PDF
                </ModuleButton>
              )}

              {expandResourcePdf && moduleData.resourcePdf !== "" ? (
                <embed
                  src={moduleData.resourcePdf}
                  width="100%"
                  height="1000px"
                  type="application/pdf"
                />
              ) : null}
            </>
          ) : null}
        </div>

        <MakeQuiz moduleData={moduleData.quiz} />
      </>
    </>
  );
};

export default DisplayModule;
