"use client";
import { useEffect, useState } from "react";
import useQuiz from "../store";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import clsx from "clsx";
import { Player } from "@lottiefiles/react-lottie-player";
import fallbackQuestions from "./fallbackQuestions.json";

const Page = () => {
  const [questions, setQuestions] = useState<any>([]);
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const config = useQuiz((state) => state.config);
  const addScore = useQuiz((state) => state.addScore);

  useEffect(() => {
    const getQuestions = async () => {
      setLoading(true);
      try {
        const numberOfQuestions = config.numberOfQuestions || 5;
        const response = await fetch(
          `https://opentdb.com/api.php?amount=${numberOfQuestions}&category=${config.category.id}&difficulty=${config.level}&type=${config.type}`
        );
        const { results } = await response.json();
        console.log(results);
        let shuffledResults = results.map((e) => {
          let value = [...e.incorrect_answers, e.correct_answer]
            .map((value) => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value);
          e.answers = [...value];
          return e;
        });
        console.log(shuffledResults, "shuffled");
        setQuestions([...shuffledResults]);
      } catch (error) {
        console.error(error);
        // API call failed, use the fallback JSON data
        let shuffledResults = fallbackQuestions.results.map((e) => {
          let value = [...e.incorrect_answers, e.correct_answer]
            .map((value) => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value);
          e.answers = [...value];
          return e;
        });
        setQuestions([...shuffledResults]);
      } finally {
        setLoading(false);
      }
    };

    getQuestions();
  }, [config.category, config.level, config.numberOfQuestions, config.type]);

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
    <section className="flex flex-col justify-center items-center p-20 ">
      {questions?.length ? (
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          Question No{" "}
          <span className="text-blue-600 dark:text-blue-500">
            #{config.numberOfQuestions - questions.length + 1}
          </span>
          .
        </h1>
      ) : null}
      {loading && (
        <div className="flex flex-col">
          <Skeleton className="w-[600px] h-[60px] my-10 rounded-sm" />

          <Skeleton className="w-[600px] h-[500px] rounded-sm" />
        </div>
      )}

      {!loading && !!questions?.length && (
        <p className="text-2xl ">Score: {config.score}</p>
      )}
      {!questions?.length && !loading && (
        <div className="flex flex-col justify-center items-center">
          <Player
          //  src="https://assets6.lottiefiles.com/packages/lf20_touohxv0.json"
         //   src="https://lottie.host/3e2cb5b8-e65f-4ae3-9538-7c4bde5f2a84/70FuVhu7R1.json"
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
            className="bg-white hover:bg-gray-100 my-10 text-gray-800 font-semibold py-2 px-10 border border-gray-400 rounded shadow"
          >
            Start Over
          </button>
        </div>
      )}

      {!questions && <p>loading...</p>}
      {!!questions && !!questions?.length && (
        <section className="shadow-2xl my-10 p-10 w-[90%] rounded-lg flex flex-col justify-center items-center shadow-blue-200  ">
          <h4 className="mb-4 text-center  text-xl font-extrabold leading-none tracking-tight md:text-2xl lg:text-4xl  text-blue-600 dark:text-blue-500">
            {questions[0].question}
          </h4>
          <div className="flex justify-evenly items-center w-full my-20 flex-wrap">
            {questions[0].answers.map((e: string) => {
              return (
                <button
                  key={e}
                  onClick={() => answerCheck(e)}
                  className={cn(
                    "w-[40%] my-4 bg-white hover:bg-blue-600 hover:text-gray-100  text-gray-800 font-semibold py-4 px-4 shadow-blue-200   rounded-lg shadow-2xl",
                    {
                      "bg-blue-600": !!answer && answer === e,
                      "bg-red-600": !!answer && answer !== e,
                      "hover:bg-blue-600": !!answer && answer === e,
                      "hover:bg-red-600": !!answer && answer !== e,
                      "text-gray-200": !!answer,
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
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-10 border border-gray-400 rounded shadow"
          >
            Next
          </button>
        </section>
      )}
    </section>
  );
};

export default Page;
