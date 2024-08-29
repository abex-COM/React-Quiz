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
import Footer from "./Components/Footer";
import Timer from "./Components/Timer";

const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  isClicked: null,
  highScore: 0,
  secondRemaining: null,
};
const SEC_PER_QUESTION = 30;
function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        secondRemaining: state.questions.length * SEC_PER_QUESTION,
      };
    case "tick":
      return {
        ...state,
        secondRemaining:
          state.secondRemaining > 0
            ? state.secondRemaining - 1
            : state.secondRemaining,
        status: state.secondRemaining === 0 ? "finished" : state.status,
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
    case "finish":
      return {
        ...state,
        status: "finished",
        highScore:
          state.points > state.highScore ? state.points : state.highScore,
      };
    case "restart":
      return {
        ...initialState,
        status: "ready",

        questions: state.questions,
      };
    default:
      throw new Error("unknown action");
  }
}
export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const {
    questions,
    status,
    index,
    secondRemaining,
    answer,
    points,
    isClicked,
    highScore,
  } = state;
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
    <div className="bg-slate-600 text-slate-100 min-w-fit flex justify-center min-h-screen">
      <div>
        <Header />
        <Main>
          {status === "active" && (
            <Timer dispatch={dispatch} secondRemaining={secondRemaining} />
          )}
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
          {status === "finished" && (
            <FinishScreen
              points={points}
              totalPoints={totalPoints}
              highScore={highScore}
              dispatch={dispatch}
            />
          )}
        </Main>
        <Footer>
          <NextBtn
            dispatch={dispatch}
            answer={answer}
            index={index}
            numQuestion={numQuestion}
          />
          
        </Footer>
      </div>
    </div>
  );
}
