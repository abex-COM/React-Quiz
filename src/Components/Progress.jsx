export default function Progress({
  numQuestion,
  index,
  points,
  totalPoints,
  answer,
}) {
  return (
    <header className=" my-3 px-5 flex flex-col  gap-3 items-center  ">
      <progress
        className=" rounded-md w-72 md:w-full "
        value={index + Number(answer != null)}
        max={numQuestion}
      ></progress>
      <div className="flex  justify-between w-full border-collapse ">
        <p>
          Question <strong>{index + 1}</strong>/{numQuestion}
        </p>
        <p>
          <strong>{points} </strong>/{totalPoints} Points
        </p>
      </div>
    </header>
  );
}
