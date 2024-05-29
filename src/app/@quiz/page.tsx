"use client";
import { useEffect, useState } from "react";
import useQuiz from "../store";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { Player } from "@lottiefiles/react-lottie-player";
import fallbackQuestions from "./fallbackQuestions.json";
import { ModeToggle } from "@/components/darkmodeui";

const Page = () => {
  const [questions, setQuestions] = useState<any>([]);
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const config = useQuiz((state: any) => state.config);
  const addScore = useQuiz((state: any) => state.addScore);

  interface QuestionData {
    type: string;
    difficulty: string;
    category: string;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
    answers?: string[];
  }

  useEffect(() => {
    const getQuestions = async () => {
      setLoading(true);
      try {
        if (questions.length === 0) {
          const numberOfQuestions = config.numberOfQuestions || 5;
          const response = await fetch(
            `https://opentdb.com/api.php?amount=${numberOfQuestions}&category=${config.category.id}&difficulty=${config.level}&type=${config.type}`
          );

          if (!response.ok) {
            throw new Error("Network response was not ok");
          }

          const { results } = await response.json();
          console.log("api results", results);

          if (results.length === 0) {
            // API call failed, use the fallback JSON data
            let shuffledResults: QuestionData[] = fallbackQuestions.results.map(
              (e: QuestionData) => {
                let value = [...e.incorrect_answers, e.correct_answer]
                  .map((value) => ({ value, sort: Math.random() }))
                  .sort((a, b) => a.sort - b.sort)
                  .map(({ value }) => value);
                e.answers = [...value];
                return e;
              }
            );
            console.log(shuffledResults, "Json shuffled");
            setQuestions([...shuffledResults]);
            return;
          }

          let shuffledResults: QuestionData[] = results.map(
            (e: QuestionData) => {
              let value = [...e.incorrect_answers, e.correct_answer]
                .map((value) => ({ value, sort: Math.random() }))
                .sort((a, b) => a.sort - b.sort)
                .map(({ value }) => value);
              e.answers = [...value];
              return e;
            }
          );
          console.log(shuffledResults, "Api shuffled");
          setQuestions([...shuffledResults]);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getQuestions();
  }, []);

  const answerCheck = (ans: string) => {
    if (ans === questions[0].correct_answer) {
      addScore();
    }
    setAnswer(questions[0].correct_answer);
  };

  const handleNext = () => {
    let remainingQuestions = [...questions];
    remainingQuestions.shift();
    setQuestions([...remainingQuestions]);
    setAnswer("");
  };

  return (
    <section className="flex flex-col justify-center items-center min-h-screen p-4 bg-gray-100 dark:bg-gray-900">
      <ModeToggle />
      {questions?.length ? (
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-gray-200">
          Question No{" "}
          <span className="text-blue-600 dark:text-blue-500">
            #{config.numberOfQuestions - questions.length + 1}
          </span>
          .
        </h1>
      ) : null}
      {loading && (
        <div className="flex flex-col">
          <Skeleton className="w-full h-16 my-10 rounded-sm" />
          <Skeleton className="w-full h-64 rounded-sm" />
        </div>
      )}

      {!loading && !!questions?.length && (
        <p className="text-2xl text-gray-900 dark:text-gray-200">
          Score: {config.score}
        </p>
      )}
      {!questions?.length && !loading && (
        <div className="flex flex-col justify-center items-center">
          <Player
            src="https://lottie.host/f172f0c2-7fec-4df9-b6cc-a2e99f33d6ef/hq04VOExek.json"
            className="player"
            loop
            autoplay
            style={{ height: "400px", width: "400px" }}
          />
          <h1 className="mt-10 text-center font-extrabold text-transparent text-8xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            YOUR SCORE :{" "}
            <span className="font-extrabold text-transparent text-10xl bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
              {config.score}
            </span>
          </h1>
          <button
            onClick={() => {
              window.location.reload();
            }}
            className="mt-6 px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
          >
            Start Over
          </button>
        </div>
      )}

      {!!questions && !!questions?.length && (
        <section className="w-full max-w-md p-6 mt-6 bg-white rounded-md shadow-md dark:bg-gray-800">
          <h4 className="mb-4 text-xl font-bold text-center text-blue-600 dark:text-blue-500">
            {questions[0].question}
          </h4>
          <div className="flex flex-wrap justify-between mt-6">
            {questions[0].answers.map((e: string) => {
              return (
                <button
                  key={e}
                  onClick={() => answerCheck(e)}
                  className={cn(
                    "w-full sm:w-48 mb-4 px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:hover:bg-gray-600",
                    {
                      "bg-green-500": !!answer && answer === e,
                      "bg-red-500": !!answer && answer !== e,
                      "hover:bg-green-500": !!answer && answer === e,
                      "hover:bg-red-500": !!answer && answer !== e,
                    }
                  )}
                >
                  {e}
                </button>
              );
            })}
          </div>

          <button
            onClick={handleNext}
            className="w-full px-4 py-2 mt-6 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
          >
            Next
          </button>
        </section>
      )}
    </section>
  );
};

export default Page;
