// import React, { useEffect, useState } from "react";
// import styled from "styled-components";
// const ModuleButton = styled.button`
//   width: 100%;
// `;
// const MakeQuiz = ({ moduleData }) => {
//   const [questions, setQuestions] = useState([]);
//   const [expandQuiz, setExpandQuiz] = useState(false);
//   const [selectedAnswers, setSelectedAnswers] = useState([]);
//   const onSubmit = () => {
//     fetch(
//       `https://opentdb.com/api.php?amount=${moduleData.numOfQuestions}&category=${moduleData.category}&difficulty=${moduleData.difficulty}&type=multiple`
//     ).then((response) => {
//       if (response.status > 500) {
//         // handle error here
//       } else {
//         response
//           .json()
//           .then((loadedQuestions) => {
//             console.log(response);
//             setQuestions(loadedQuestions.results);
//             setSelectedAnswers(
//               Array(loadedQuestions.results.length).fill(null)
//             );
//           })
//           .catch((err) => console.log(err));
//       }
//     });
//   };

//   const handleAnswerSelect = (questionIndex, answerIndex) => {
//     const updatedSelectedAnswers = [...selectedAnswers];
//     updatedSelectedAnswers[questionIndex] = answerIndex;
//     setSelectedAnswers(updatedSelectedAnswers);
//   };

//   console.log(questions, selectedAnswers);
//   return (
//     <>
//       {!expandQuiz ? (
//         <ModuleButton
//           width="100%"
//           onClick={() => {
//             onSubmit();
//             setExpandQuiz(true);
//           }}
//         >
//           Quiz
//         </ModuleButton>
//       ) : (
//         <ModuleButton onClick={() => setExpandQuiz(false)}>
//           Collapse Quiz
//         </ModuleButton>
//       )}
//       {expandQuiz &&
//         questions.map((question) => (
//           <div key={question.question}>
//             <p> {question.question}</p>
//             {question.incorrect_answers.map((answer) => (
//               <>
//                 <label>
//                   <input
//                     type="radio"
//                     key={answer}
//                     // checked={selectedOption === "admin"}
//                     // onChange={handleInputChange}
//                   />
//                   {answer}
//                 </label>
//               </>
//             ))}
//             <label>
//               <input
//                 type="radio"
//                 key={question.correct_answer}
//                 // checked={selectedOption === "admin"}
//                 // onChange={handleInputChange}
//               />
//               {question.correct_answer}
//             </label>

//             {/* <p>{question.question}</p>
//           <ul>
//             {question.incorrect_answers.map((answer) => (
//               <li key={answer}>{answer}</li>
//             ))}
//             <li key={question.correct_answer}>{question.correct_answer}</li>
//           </ul> */}
//           </div>
//         ))}
//     </>
//   );
// };

// export default MakeQuiz;
// import React, { useEffect, useState } from "react";
// import styled from "styled-components";

// const ModuleButton = styled.button`
//   width: 100%;
// `;

// const MakeQuiz = ({ moduleData }) => {
//   const [questions, setQuestions] = useState([]);
//   const [expandQuiz, setExpandQuiz] = useState(false);
//   const [selectedAnswers, setSelectedAnswers] = useState([]);

//   const onSubmit = () => {
//     fetch(
//       `https://opentdb.com/api.php?amount=${moduleData.numOfQuestions}&category=${moduleData.category}&difficulty=${moduleData.difficulty}&type=multiple`
//     ).then((response) => {
//       if (response.status > 500) {
//         // handle error here
//       } else {
//         response
//           .json()
//           .then((loadedQuestions) => {
//             console.log(response);
//             setQuestions(loadedQuestions.results);
//             setSelectedAnswers(
//               Array(loadedQuestions.results.length).fill(null)
//             );
//           })
//           .catch((err) => console.log(err));
//       }
//     });
//   };

//   const handleAnswerSelect = (questionIndex, answerIndex) => {
//     const updatedSelectedAnswers = [...selectedAnswers];
//     updatedSelectedAnswers[questionIndex] = answerIndex;
//     setSelectedAnswers(updatedSelectedAnswers);
//   };

//   console.log(questions);
//   console.log(selectedAnswers);

//   return (
//     <>
//       {!expandQuiz ? (
//         <ModuleButton
//           width="100%"
//           onClick={() => {
//             onSubmit();
//             setExpandQuiz(true);
//           }}
//         >
//           Quiz
//         </ModuleButton>
//       ) : (
//         <ModuleButton onClick={() => setExpandQuiz(false)}>
//           Collapse Quiz
//         </ModuleButton>
//       )}
//       {expandQuiz &&
//         questions.map((question, index) => (
//           <div key={question.question}>
//             <p> {question.question}</p>
//             {question.incorrect_answers.map((answer, answerIndex) => (
//               <label key={answer}>
//                 <input
//                   type="radio"
//                   checked={selectedAnswers[index] === answerIndex}
//                   onChange={() => handleAnswerSelect(index, answerIndex)}
//                 />
//                 {answer}
//               </label>
//             ))}
//             <label key={question.correct_answer}>
//               <input
//                 type="radio"
//                 checked={
//                   selectedAnswers[index] === question.incorrect_answers.length
//                 }
//                 onChange={() =>
//                   handleAnswerSelect(index, question.incorrect_answers.length)
//                 }
//               />
//               {question.correct_answer}
//             </label>
//           </div>
//         ))}
//     </>
//   );
// };

// export default MakeQuiz;

// import React, { useEffect, useState } from "react";
// import styled from "styled-components";

// const ModuleButton = styled.button`
//   width: 100%;
// `;

// const MakeQuiz = ({ moduleData }) => {
//   const [questions, setQuestions] = useState([]);
//   const [expandQuiz, setExpandQuiz] = useState(false);

//   const onSubmit = () => {
//     fetch(
//       `https://opentdb.com/api.php?amount=${moduleData.numOfQuestions}&category=${moduleData.category}&difficulty=${moduleData.difficulty}&type=multiple`
//     ).then((response) => {
//       if (response.status > 500) {
//         // handle error here
//       } else {
//         response
//           .json()
//           .then((loadedQuestions) => {
//             const shuffledQuestions = loadedQuestions.results.map(
//               (question) => ({
//                 ...question,
//                 answers: shuffleArray([
//                   ...question.incorrect_answers,
//                   question.correct_answer,
//                 ]),
//               })
//             );
//             setQuestions(shuffledQuestions);
//           })
//           .catch((err) => console.log(err));
//       }
//     });
//   };

//   const shuffleArray = (array) => {
//     for (let i = array.length - 1; i > 0; i--) {
//       const j = Math.floor(Math.random() * (i + 1));
//       [array[i], array[j]] = [array[j], array[i]];
//     }
//     return array;
//   };

//   return (
//     <>
//       {!expandQuiz ? (
//         <ModuleButton
//           width="100%"
//           onClick={() => {
//             onSubmit();
//             setExpandQuiz(true);
//           }}
//         >
//           Quiz
//         </ModuleButton>
//       ) : (
//         <ModuleButton onClick={() => setExpandQuiz(false)}>
//           Collapse Quiz
//         </ModuleButton>
//       )}
//       {expandQuiz &&
//         questions.map((question, index) => (
//           <div key={question.question}>
//             <p>
//               {" "}
//               {index + 1}. {question.question}
//             </p>
//             {question.answers.map((answer) => (
//               <label key={answer}>
//                 <input type="radio" name={question.question} value={answer} />
//                 {answer}
//               </label>
//             ))}
//           </div>
//         ))}
//     </>
//   );
// };

// export default MakeQuiz;

import React, { useEffect, useState } from "react";
import styled from "styled-components";

const ModuleButton = styled.button`
  width: 100%;
`;

const MakeQuiz = ({ moduleData }) => {
  const [questions, setQuestions] = useState([]);
  const [expandQuiz, setExpandQuiz] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState([]);

  const onSubmit = () => {
    fetch(
      `https://opentdb.com/api.php?amount=${moduleData.numOfQuestions}&category=${moduleData.category}&difficulty=${moduleData.difficulty}&type=multiple`
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

  // The function initializes a loop starting from the last index of the array and going backwards until the first index.
  // In each iteration of the loop, it generates a random index between 0 and the current index (inclusive).
  // It swaps the elements at the current index and the randomly generated index using array destructuring.
  // After the loop completes, the function returns the shuffled array.
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
      console.log(question, index, question.correct_answer, selectedAnswers);
    });
    alert(`Your score is ${score} out of ${questions.length}`);
  };

  return (
    <>
      {!expandQuiz ? (
        <ModuleButton
          width="100%"
          onClick={() => {
            onSubmit();
            setExpandQuiz(true);
          }}
        >
          Quiz
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
                      console.log(answer, index);
                    }}
                  />
                  {answer}
                </label>
              ))}
            </div>
          ))}
          <button onClick={gradeQuiz}>Submit</button>
        </>
      )}
    </>
  );
};

export default MakeQuiz;
