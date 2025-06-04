import { Input } from "@/components/ui/input"
import { SearchIcon } from "lucide-react";

interface SearchInputComponentProps {
  onSearch?: (value: string) => void;
}

function SearchInputComponent({ onSearch }: SearchInputComponentProps) {
  return (
    <div className="relative flex min-w-[550px] min-h-4 items-center border border-gray-300 rounded-lg  mr-2.5 bg-white">
      <SearchIcon className="h-4 w-4 absolute left-2.5" />
      <Input
        type="search"
        placeholder="Search courses..."
        className="w-full border-none bg-transparent placeholder:text-gray-500 focus:outline-none pl-9"
        onChange={(e) => onSearch?.(e.target.value)}
      />
    </div>
  )
}

export default SearchInputComponent;