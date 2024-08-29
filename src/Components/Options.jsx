export default function Option({ isClicked, question, dispatch, answer }) {
  const hasAnswered = answer != null;
  return (
    <>
      {question.options.map((option, index) => (
        <button
          key={option}
          disabled={hasAnswered}
          onClick={() => {
            dispatch({ type: "newAnswer", payload: index });
            dispatch({ type: "clicked", payload: index });
          }}
          className={`
            ${
              hasAnswered
                ? index === question.correctOption
                  ? "bg-green-400"
                  : "bg-yellow-600"
                : "bg-slate-500"
            }
             text-xs md:text-lg md:w-full
            transform transition duration-300 
            disabled:opacity-80 disabled:cursor-not-allowed 
            ease-in-out hover:translate-x-4 
            sm:w-96 hover:bg-slate-700 
            rounded-ee-full rounded-ss-full w-60 py-2 shadow-lg
            ${isClicked == index ? " translate-x-8 t" : ""}
           
          `}
        >
          {option}
        </button>
      ))}
    </>
  );
}
