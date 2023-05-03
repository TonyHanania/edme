import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./UserContext";
const ModuleButton = styled.button`
  width: 100%;
  height: 3rem;
  background-color: #f5fdf2;
  border: white solid 3px;
  font-size: 1rem;
  padding: 1rem;
`;

const QuizDiv = styled.div``;

const MakeQuiz = ({
  moduleData,
  moduleId,
  setQuizCompleted,
  quizCompleted,
}) => {
  const [grades, setGrades] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [expandQuiz, setExpandQuiz] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [grade, setGrade] = useState();
  const [submitQuiz, setSubmitQuiz] = useState(false);

  const { currentUser } = useContext(UserContext);

  const onSubmit = () => {
    fetch(
      `https://opentdb.com/api.php?amount=${moduleData.quiz.numOfQuestions}&category=${moduleData.quiz.category}&difficulty=${moduleData.quiz.difficulty}&type=multiple`
    ).then((response) => {
      if (response.status > 500) {
        // handle error here
      } else {
        response
          .json()
          .then((loadedQuestions) => {
            const shuffledQuestions = loadedQuestions.results.map(
              (question) => ({
                ...question,
                answers: shuffleArray([
                  ...question.incorrect_answers,
                  question.correct_answer,
                ]),
              })
            );
            setQuestions(shuffledQuestions);
          })
          .catch((err) => console.log(err));
      }
    });
  };

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const handleAnswerSelect = (questionIndex, answer) => {
    setSelectedAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[questionIndex] = answer;
      return updatedAnswers;
    });
  };

  const gradeQuiz = () => {
    let score = 0;
    questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correct_answer) {
        score++;
      }
    });
    if ((score / questions.length) * 100 < 50) {
      setExpandQuiz(false);
    }
    if ((score / questions.length) * 100 >= 50) {
      let newScore = (score / questions.length) * 100;
      setExpandQuiz(false);
      setSubmitQuiz(true);
      setGrade(newScore);
      // setQuizCompleted(true);
      fetch(`/postgrades`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          grade: newScore,
          studentEmail: currentUser.email,
          moduleId: moduleId,
          subject: moduleData.subject,
          cohortId: moduleData.cohortId,
        }),
      })
        .then((response) => {
          response.json();
          window.location.reload();
        })
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      <QuizDiv>
        {!expandQuiz && !grade ? (
          <ModuleButton
            width="100%"
            onClick={() => {
              onSubmit();
              setExpandQuiz(true);
            }}
          >
            Open Quiz
          </ModuleButton>
        ) : (
          <>
            <ModuleButton onClick={() => setExpandQuiz(false)}>
              Collapse Quiz
            </ModuleButton>
            {questions.map((question, index) => (
              <div key={question.question}>
                <p>
                  {index + 1}. {question.question}
                </p>
                {question.answers.map((answer) => (
                  <label key={answer}>
                    <input
                      type="radio"
                      name={question.question}
                      value={answer}
                      checked={selectedAnswers[index] === answer}
                      onChange={() => {
                        handleAnswerSelect(index, answer);
                      }}
                    />
                    {answer}
                  </label>
                ))}
              </div>
            ))}
            <button onClick={gradeQuiz}>Submit</button>{" "}
          </>
        )}
      </QuizDiv>
    </>
  );
};

export default MakeQuiz;
