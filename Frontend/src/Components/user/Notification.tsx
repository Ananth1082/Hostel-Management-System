import { Badge } from "@/Components/ui/badge";
import { TableRow, TableCell } from "../ui/table";
import { formatDate } from "date-fns";

export default function Notification(props: any) {
  return (
    <TableRow className="bg-accent cursor-pointer" onClick={()=>{props.handleClick(props.id)}}>
      <TableCell>
        <div className="font-medium">{props.senderName}</div>
        <div className="hidden text-sm text-muted-foreground md:inline">
          {props.senderEmail}
        </div>
      </TableCell>
      <TableCell className="hidden md:table-cell">
        {props.title.length >= 15
          ? props.title.slice(0, 8) + "..."
          : props.title}
      </TableCell>
      <TableCell className="hidden sm:table-cell">
        {formatDate(props.createdAt, "LLL dd y")}
      </TableCell>
      <TableCell className="hidden sm:table-cell">
        <Badge className="text-xs" variant="secondary">
          {props.isRead ? "Read" : "Not Read"}
        </Badge>
      </TableCell>
    </TableRow>
  );
}
