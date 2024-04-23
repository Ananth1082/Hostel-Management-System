import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
} from "@/Components/ui/dropdown-menu";
import { ListFilter } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { useState } from "react";

export default function FilterListButton(props: {
  title: string;
  filterItems: string[];
  setFilterBy: (filterBy: string) => void;
}) {
  const [checked, setChecked] = useState(
    new Array(props.filterItems.length).fill(false)
  );
  const handleCheckboxChange = (index: number) => {
    if (checked[index]) {
      checked[index] = false;
    } else {
      const newChecked = checked.map((_, i) => i === index);
      setChecked(newChecked);
      props.setFilterBy(newChecked[index] ? props.filterItems[index] : "None");
    }
  };
  const renderFilterItems = () => {
    return props.filterItems.map((item, index) => {
      return (
        <DropdownMenuCheckboxItem
          key={index}
          checked={checked[index]}
          onCheckedChange={() => handleCheckboxChange(index)}
        >
          {item}
        </DropdownMenuCheckboxItem>
      );
    });
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 gap-1">
          <ListFilter className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            {props.title}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Filter by</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {renderFilterItems()}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
