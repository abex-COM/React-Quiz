import { useEffect, useReducer } from "react";
import Header from "./Components/Header";
import Loader from "./Components/Loader";
import Error from "./Components/Error";
import Questions from "./Components/Questions";
import Main from "./Components/Main";
import StartScreen from "./Components/StartScreen";
import NextBtn from "./Components/NextBtn";
import Progress from "./Components/Progress";
import FinishScreen from "./Components/FinishScreen";

const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  isClicked: null,
  highScore: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return { ...state, status: "active" };
    case "restart":
      return { ...state, status: "ready", points: 0, index: 0 };
    case "finish":
      return {
        ...state,
        status: "finished",
        highScore:
          state.points > state.highScore ? state.points : state.highScore,
      };
    case "clicked":
      return { ...state, isClicked: action.payload };
    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
        isClicked: null,
      };
    case "newAnswer": {
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          question.correctOption === action.payload
            ? state.points + question.points
            : state.points,
      };
    }
    default:
      throw new Error("unknown action");
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { questions, status, index, answer, points, isClicked, highScore } =
    state;
  const numQuestion = questions.length;
  const totalPoints = questions.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.points;
  }, 0);
  useEffect(() => {
    fetch("http://localhost:5000/questions")
      .then((response) => response.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch(() => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <div className="bg-slate-600  text-slate-100 min-h-screen  min-w-fit">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestion={numQuestion} dispatch={dispatch} />
        )}
        {status === "active" && (
          <Progress
            numQuestion={numQuestion}
            index={index}
            points={points}
            totalPoints={totalPoints}
            answer={answer}
          />
        )}
        {status === "active" && (
          <Questions
            question={questions[index]}
            answer={answer}
            dispatch={dispatch}
            isClicked={isClicked}
            index={index}
          />
        )}
        <NextBtn
          dispatch={dispatch}
          answer={answer}
          index={index}
          numQuestion={numQuestion}
        />
        {status === "finished" && (
          <FinishScreen
            points={points}
            totalPoints={totalPoints}
            highScore={highScore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}
