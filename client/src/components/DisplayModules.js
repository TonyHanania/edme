import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MakeQuiz from "./MakeQuizz";
import DisplayModule from "./DisplayModule";
const Lesson = styled.div`
  white-space: pre-wrap;
`;

const DisplayModules = () => {
  const [moduleInfo, setModuleInfo] = useState(null);
  const [moduleId, setModuleId] = useState(null);
  const [clicked, setIsClicked] = useState(false);
  const [expandLesson, setExpandLesson] = useState(false);
  const [expandResourcePhoto, setExpandResourcePhoto] = useState(false);
  const [expandResourcePdf, setExpandResourcePdf] = useState(false);
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    setLoading(true);
    fetch(`/displaymodule`).then((response) => {
      if (response.status > 500) {
      } else {
        response
          .json()
          .then((resData) => {
            setData(resData.data);
            setLoading(false);
            setModuleInfo(resData.data);
            setModuleId(resData.data.map((id) => id._id));
            // fetch(
            //   `https://opentdb.com/api.php?amount=${data.quiz.numQuestions}&category=${data.quiz.category}&difficulty=${data.quiz.difficulty}&type=multiple`
            // ).then((response) => {
            //   if (response.status > 500) {
            //     // handle error here
            //   } else {
            //     response
            //       .json()
            //       .then((loadedQuestions) => {
            //         console.log(response);
            //         setQuestions(loadedQuestions.results);
            //       })
            //       .catch((err) => console.log(err));
            //   }
            // });
          })
          .catch((err) => console.log(err));
      }
    });
  }, []);

  if (loading) {
    return <p>loading</p>;
  }
  console.log("I am module info  ", moduleInfo);
  return (
    <>
      {moduleInfo.map((moduleData) => {
        return (
          <>
            <div key={moduleData._id}>
              <DisplayModule moduleData={moduleData} />
            </div>
          </>
        );
      })}
    </>
  );
};

export default DisplayModules;
