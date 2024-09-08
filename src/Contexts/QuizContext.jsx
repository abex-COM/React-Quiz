import { createContext, useContext, useEffect, useReducer } from "react";

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
const SEC_PER_QUESTION = 20;
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
const QuizContext = createContext();
function QuizProvider({ children }) {
  const [
    {
      questions,
      status,
      index,
      secondRemaining,
      answer,
      points,
      isClicked,
      highScore,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

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
    <QuizContext.Provider
      value={{
        questions,
        numQuestion,
        totalPoints,
        status,
        index,
        secondRemaining,
        answer,
        points,
        isClicked,
        highScore,
        dispatch,
        SEC_PER_QUESTION,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}
function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined)
    throw new Error("QuizContext used out side of Quiz Provider");
  return context;
}
export { useQuiz, QuizProvider };
