export default function NextBtn({ answer, dispatch, index, numQuestion }) {
  if (answer === null) return null;
  if (index < numQuestion - 1)
    return (
      <div className="p-3 flex justify-end">
        <button
          onClick={() => dispatch({ type: "nextQuestion" })}
          className="bg-slate-500 py-2 px-4 rounded-full hover:bg-slate-400"
        >
          Next
        </button>
      </div>
    );
  if (index === numQuestion - 1)
    return (
      <div className="p-3 flex justify-end">
        <button
          onClick={() => {
            dispatch({ type: "finish" });
            dispatch({ type: "nextQuestion" });
          }}
          className="bg-slate-500 py-2 px-4 rounded-full hover:bg-slate-400"
        >
          Finish
        </button>
      </div>
    );
}
