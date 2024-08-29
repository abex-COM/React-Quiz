import confetti from "canvas-confetti";

export default function FinishScreen({
  points,
  totalPoints,
  highScore,
  dispatch,
}) {
  function triggerConfetti() {
    const duration = 3000; // 3 seconds
    const end = Date.now() + duration;

    const interval = setInterval(() => {
      confetti({
        particleCount: 50, // Adjust number of particles per burst
        spread: 70,
        origin: { y: 0.9 },
        colors: ["#bb0000", "#ffffff", "#00ff00"], // Customize colors
      });

      if (Date.now() > end) {
        clearInterval(interval);
      }
    }, 250);
  }
  const percetage = (points / totalPoints) * 100;
  if (percetage >= 50) {
    triggerConfetti();
  }
  return (
    <div className="flex justify-center flex-col items-center gap-5">
      {percetage >= 50 ? (
        <h1> Congaratulation You passed the exam</h1>
      ) : (
        <h1> 😥 Sorry You failed the exam</h1>
      )}
      <p className=" bg-sky-600  p-3 rounded-full px-5 w-max ">
        you scored <strong>{points}</strong> out of {totalPoints} (
        {Math.ceil(percetage)}%)
      </p>
      <p className="bg-sky-500 p-4  rounded-md">
        (High Score : {highScore} points)
      </p>
      <div className="p-3 flex justify-end">
        <button
          onClick={() => {
            dispatch({ type: "restart" });
          }}
          className="bg-sky-500 py-2 px-4 rounded-full hover:bg-slate-400"
        >
          Restart quiz
        </button>
      </div>
    </div>
  );
}
