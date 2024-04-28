"use client";
import useQuiz from "@/app/store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import { Check, ChevronDown, Circle } from "lucide-react";
import triviaCategories from "./trivia_categories.json";
type categoryType = {
  id: number;
  name: string;
};

const Type = ["boolean", "multiple"];
const Level = ["easy", "medium", "hard"];
const DropOptions = () => {
  const [categories, setCategories] = useState<categoryType[]>([]);
  const addCategory = useQuiz((state) => state.addCategory);
  const addLevel = useQuiz((state) => state.addLevel);
  const addType = useQuiz((state) => state.addType);
  const config = useQuiz((state) => state.config);

  useEffect(() => {
    async function fetchCategory() {
      try {
        const response = await fetch("https://opentdb.com/api_category.php");
        const data = await response.json();
        console.log("datas ", data);

        setCategories(data.trivia_categories);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        console.log("Fetching categories from local JSON file...");
        setCategories(triviaCategories.trivia_categories);
      }
    }
    fetchCategory();
  }, []);

  return (
    <section className="flex justify-evenly items-center py-5 w-full">
      <div className="px-7 py-4 w-1/3 mx-4">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex outline-none justify-between w-full px-10 py-3 rounded-lg shadow-lg hover:bg-blue-600 hover:text-gray-100">
            {config.category.name ? config.category.name : "CATEGORY"}{" "}
            <ChevronDown />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>SELECT CATEGORY</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {categories.map((category) => (
              <DropdownMenuItem
                key={category.id}
                onClick={() => addCategory(category.id, category.name)}
              >
                {category.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="px-7 py-4 w-1/3 mx-4">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex outline-none justify-between w-full px-10 py-3 rounded-lg shadow-lg hover:bg-blue-600 hover:text-gray-100">
            {config.level ? config.level : " SELECT LEVEL"} <ChevronDown />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>SELECT LEVEL</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {Level.map((e) => (
              <DropdownMenuItem key={e} onClick={() => addLevel(e)}>
                {e}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="px-7 py-4 w-1/3 mx-4">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex outline-none justify-between w-full px-10 py-3 rounded-lg shadow-lg hover:bg-blue-600 hover:text-gray-100">
            {config.type ? config.type : "SELECT TYPE"} <ChevronDown />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>SELECT TYPE</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {Type.map((e) => (
              <DropdownMenuItem key={e} onClick={() => addType(e)}>
                {e}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </section>
  );
};

export default DropOptions;
