"use client"
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

type categoryType = {
 id: number;
 name: string;
};


const DropOptions = () => {
 const [categories, setCategories] = useState<categoryType[]>([]);
 const addCategory = useQuiz((state) => state.addCategory);

 useEffect(() => {
    async function fetchCategory() {
      try {
        const response = await fetch("https://opentdb.com/api_category.php");
        const data = await response.json();
        // Assuming the API returns an array of categories directly
        setCategories(data.trivia_categories);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    }
    fetchCategory();
 }, []); // Added dependency array

 return (
    <section className="flex justify-evenly items-center py-5 w-full">
      <div className="px-7 py-4 w-1/3 mx-4">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex outline-none justify-between w-full px-10 py-3 rounded-lg shadow-lg hover:bg-blue-600 hover:text-gray-100">
            SELECT CATEGORY
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>SELECT CATEGORY</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {categories.map((category) => (
              <DropdownMenuItem key={category.id} onClick={() => addCategory(category.id, category.name)}>
                {category.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="px-7 py-4 w-1/3 mx-4">
      <DropdownMenu>
  <DropdownMenuTrigger className="flex outline-none justify-between w-full px-10 py-3 rounded-lg shadow-lg hover:bg-blue-600 hover:text-gray-100">SELECT LEVEL</DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>SELECT LEVEL</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Profile</DropdownMenuItem>
    <DropdownMenuItem>Billing</DropdownMenuItem>
    <DropdownMenuItem>Team</DropdownMenuItem>
    <DropdownMenuItem>Subscription</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
      </div>
      <div className="px-7 py-4 w-1/3 mx-4">
      <DropdownMenu>
  <DropdownMenuTrigger className="flex outline-none justify-between w-full px-10 py-3 rounded-lg shadow-lg hover:bg-blue-600 hover:text-gray-100">SELECT TYPE</DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>SELECT TYPE</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Profile</DropdownMenuItem>
    <DropdownMenuItem>Billing</DropdownMenuItem>
    <DropdownMenuItem>Team</DropdownMenuItem>
    <DropdownMenuItem>Subscription</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
      </div>
    </section>
  )
}

export default DropOptions
