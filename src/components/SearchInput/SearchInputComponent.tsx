import { Input } from "@/components/ui/input"
import { SearchIcon } from "lucide-react";

function SearchInputComponent() {
  return (
    <div className="relative flex min-w-[550px] min-h-4 items-center border border-gray-300 rounded-lg  mr-2.5 bg-white">
    <SearchIcon className="h-4 w-4 absolute left-2.5" />
    <Input
      type="search"
      placeholder="Search..."
      className="w-full border-none bg-transparent placeholder:text-gray-500 focus:outline-none pl-9"
    />
  </div>
  )
}

export default SearchInputComponent;