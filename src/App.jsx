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
import { QuizProvider, useQuiz } from "./Contexts/QuizContext";

export default function App() {
  return (
    <div className="bg-slate-600 text-slate-100 min-w-fit flex justify-center min-h-screen">
      <div>
        <QuizProvider>
          <QuizContent />
        </QuizProvider>
      </div>
    </div>
  );
}

function QuizContent() {
  const { status } = useQuiz();
  return (
    <>
      <Header />
      <Main>
        {status === "active" && <Timer />}
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartScreen />}
        {status === "active" && <Progress />}
        {status === "active" && <Questions />}
        {status === "finished" && <FinishScreen />}
      </Main>
      <Footer>
        <NextBtn />
      </Footer>
    </>
  );
}
