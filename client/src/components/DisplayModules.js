import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MakeQuiz from "./MakeQuizz";
import DisplayModule from "./DisplayModule";
import { useParams } from "react-router-dom";
import { UserContext } from "./UserContext";
import { useContext } from "react";
const Container = styled.div`
  border: red 1px solid;

  div {
    border: red 1px solid;
  }
`;
const P = styled.p`
  font-weight: 700;
  font-size: 1rem;
  text-align: center;
`;
const DisplayModules = () => {
  const [moduleInfo, setModuleInfo] = useState(null);
  const { currentUser } = useContext(UserContext);
  const { subject, cohortId } = useParams();

  const [loading, setLoading] = useState(true);
  const [shouldModuleUpdate, setShouldModuleUpdate] = useState(true);
  const [grades, setGrades] = useState(null);
  useEffect(() => {
    setLoading(true);
    fetch(`/displaymodule`).then((response) => {
      if (response.status > 500) {
      } else {
        response
          .json()
          .then((resData) => {
            setLoading(false);
            setModuleInfo(resData.data);
            setShouldModuleUpdate(false);
          })
          .catch((err) => console.log(err));
      }
    });
    fetch(`/getgrades`).then((response) => {
      if (response.status > 500) {
      } else {
        response.json().then((resData) => {
          setGrades(resData.data);
        });
      }
    });
  }, [shouldModuleUpdate]);

  if (loading) {
    return <p>loading</p>;
  }

  const moduleArray = moduleInfo
    ? moduleInfo.filter(
        (module) => module.cohortId === cohortId && module.subject === subject
      )
    : null;
  const complete =
    grades &&
    moduleInfo &&
    currentUser &&
    grades.filter((grade) => {
      return currentUser.email === grade.studentEmail;
    });
  const incomplete = moduleArray
    ? moduleArray.filter((moduleData) => {
        const isComplete =
          complete && complete.some((c) => c.moduleId === moduleData._id);
        return !isComplete;
      })
    : [];

  console.log(complete);
  return (
    <Container>
      {currentUser &&
        currentUser.profile.role === "student" &&
        moduleArray.map((moduleData, index) => {
          const isComplete =
            complete && complete.some((c) => c.moduleId === moduleData._id);
          return isComplete ? (
            <>
              <div key={moduleData._id}>
                <div key={moduleData._id}>
                  <DisplayModule
                    setShouldModuleUpdate={setShouldModuleUpdate}
                    shouldModuleUpdate={shouldModuleUpdate}
                    moduleData={moduleData}
                  />
                </div>
              </div>
            </>
          ) : null;
        })}
      {currentUser &&
        currentUser.profile.role === "student" &&
        incomplete.length > 0 && (
          <div key={incomplete[0]._id}>
            <div key={incomplete[0]._id}>
              <DisplayModule
                setShouldModuleUpdate={setShouldModuleUpdate}
                shouldModuleUpdate={shouldModuleUpdate}
                moduleData={incomplete[0]}
              />
            </div>

            <P>
              {incomplete.length - 1} more{" "}
              {incomplete.length - 1 === 1 ? "module" : "modules"} to go!
            </P>
          </div>
        )}

      {currentUser &&
        currentUser.profile.role === "instructor" &&
        moduleArray.map((moduleData, index) => {
          return (
            <>
              <div key={moduleData._id}>
                <div key={moduleData._id}>
                  <DisplayModule
                    setShouldModuleUpdate={setShouldModuleUpdate}
                    shouldModuleUpdate={shouldModuleUpdate}
                    moduleData={moduleData}
                  />
                </div>
              </div>
            </>
          );
        })}
    </Container>
  );
};

export default DisplayModules;

// import React, { useEffect, useState } from "react";
// import styled from "styled-components";
// import MakeQuiz from "./MakeQuizz";
// import DisplayModule from "./DisplayModule";
// import { useParams } from "react-router-dom";

// const Lesson = styled.div`
//   white-space: pre-wrap;
// `;

// const DisplayModules = () => {
//   const [moduleInfo, setModuleInfo] = useState(null);
//   const [currentModule, setCurrentModule] = useState(0);

//   const { subject, cohortId } = useParams();

//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     setLoading(true);
//     fetch(`/displaymodule`).then((response) => {
//       if (response.status > 500) {
//       } else {
//         response
//           .json()
//           .then((resData) => {
//             setLoading(false);
//             setModuleInfo(resData.data);
//           })
//           .catch((err) => console.log(err));
//       }
//     });
//   }, []);

//   if (loading) {
//     return <p>loading</p>;
//   }

//   const moduleArray = moduleInfo
//     ? moduleInfo.filter(
//         (module) => module.cohortId === cohortId && module.subject === subject
//       )
//     : null;
//   console.log("hie its me  ", moduleArray.length);
//   return (
//     <>
//       {moduleInfo.map((moduleData, index) => {
//         const isCurrentModule = index === currentModule;
//         const isCompleted = index < currentModule;
//         return (
//           <>
//             <div key={moduleData._id}>
//               {moduleData.subject === subject &&
//               moduleData.cohortId === cohortId ? (
//                 <div key={moduleData._id}>
//                   {isCurrentModule ? (
//                     <MakeQuiz
//                       moduleData={moduleData}
//                       onComplete={() => setCurrentModule(index + 1)}
//                     />
//                   ) : isCompleted ? (
//                     <DisplayModule moduleData={moduleData} />
//                   ) : null}
//                 </div>
//               ) : null}
//             </div>
//           </>
//         );
//       })}
//     </>
//   );
// };

// export default DisplayModules;
