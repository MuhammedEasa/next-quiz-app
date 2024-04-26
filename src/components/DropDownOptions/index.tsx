import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  
const DropOptions = () => {
  return (
    <section className="flex justify-evenly items-center py-5">
      <div className="px-7 py-4 w-1/3 mx-4">
      <DropdownMenu>
  <DropdownMenuTrigger className="flex outline-none justify-between w-full px-10 py-3 rounded-lg shadow-lg hover:bg-blue-600 hover:text-gray-100">SELECT CATEGORY</DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>SELECT CATEGORY</DropdownMenuLabel>
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
