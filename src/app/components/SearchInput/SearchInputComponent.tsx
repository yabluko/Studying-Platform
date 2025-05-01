import { Input } from "@/components/ui/input"
import { SearchIcon } from "lucide-react";

function SearchInputComponent() {
  return (
    <div className="flex min-w-[550px] items-center border border-gray-300 rounded-lg px-2.5 py-1.5 mr-2.5">
      <SearchIcon className="h-4 w-4 mr-2.5" />
      <Input type="search" placeholder="Search..." className="w-full border-0" />
    </div>
  )
}

export default SearchInputComponent;