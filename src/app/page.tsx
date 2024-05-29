"use client";
import Button from "@/components/Button";
import DropOptions from "@/components/DropDownOptions";
import useQuiz from "./store";
import { ModeToggle } from "@/components/darkmodeui"; 
export default function Home() {
  const quizConfig = useQuiz((state:any) => state.config);
  const addNumberOfQuestions = useQuiz((state:any) => state.addNumberOfQuestions);
  console.log(quizConfig);

  return (
    <section className="flex flex-col justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
    <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-gray-200">
      Welcome to the Quiz App
    </h1>
    <ModeToggle/>
    <section className="p-10 my-10 rounded-lg shadow-2xl w-full max-w-md bg-white dark:bg-gray-800">
      <div className="mb-6">
        <label
          htmlFor="first_name"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-200"
        >
          Number of Questions
        </label>
        <input
          type="number"
          id="first_name"
          onChange={(e) => addNumberOfQuestions(e.target.value)}
          className="w-full px-3 py-2 leading-tight text-gray-700 bg-gray-200 border rounded shadow appearance-none focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:text-gray-200"
          placeholder=""
          defaultValue={10}
          max={30}
          min={0}
          required
        />
      </div>
      <div className="flex flex-col justify-center items-center">
        <DropOptions />
        <Button/>
      </div>
    </section>
  </section>
  
  );
}
