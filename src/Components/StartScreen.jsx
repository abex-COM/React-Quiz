import { useQuiz } from "../Contexts/QuizContext";

export default function StartScreen() {
  const { numQuestion, dispatch } = useQuiz();
  return (
    <div className=" items-center flex flex-col gap-3 w-full">
      <h1 className="font-bold text-xl  ">WelCome to Reac Quiz!</h1>
      <p className="text-xl font-semibold font-mono ">
        {numQuestion} questions to test your React Mastery
      </p>
      <button
        className="bg-slate-500 rounded-full py-2 hover:bg-slate-400 px-4 w-max text-sm
      "
        onClick={() => dispatch({ type: "start" })}
      >
        Let&apos;s start
      </button>
    </div>
  );
}
