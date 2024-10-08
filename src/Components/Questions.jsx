import { useQuiz } from "../Contexts/QuizContext";
import Option from "./Options";

export default function Questions() {
  const { questions, answer, dispatch, isClicked, index } = useQuiz();
  const question = questions[index];

  return (
    <div className="flex px-2 items-center flex-col w-full    justify-center gap-3">
      <h4 className="sm:text-xl">
        <strong>{index + 1}.</strong> {question.question}
      </h4>
      <div className="flex flex-col   items-center gap-5 w-full">
        <Option
          question={question}
          isClicked={isClicked}
          answer={answer}
          dispatch={dispatch}
        />
      </div>
    </div>
  );
}
