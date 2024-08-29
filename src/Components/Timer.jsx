import { useEffect } from "react";

export default function Timer({ secondRemaining, dispatch }) {
  const minutes = Math.floor(secondRemaining / 60);
  const seconds = Math.floor(secondRemaining % 60);
  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: "tick" });
    }, 1000);
    return () => clearInterval(id);
  }, [dispatch]);
  return (
    <div className="rounded-md flex  justify-end w-full  select-none mb-4">
      <div className=" flex justify-end gap-3">
        <span>Timer</span>
        <p className=" w-max rounded-full bg-transparent">
          {minutes < 10 && "0"}
          {minutes} :{seconds < 10 && "0"}
          {seconds}
        </p>
      </div>
    </div>
  );
}
