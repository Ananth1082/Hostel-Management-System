import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/Components/ui/dropdown-menu";
import {
  Copy,
  Truck,
  MoreVertical,
  CreditCard,
  ChevronLeft,
  ChevronRight,
  Check,
} from "lucide-react";
import { Button } from "@/Components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../ui/card";
import { Separator } from "../ui/separator";
import P from "../Typography/P";
import { formatDate } from "date-fns";
import { useState } from "react";

export default function NotificationInfo(props: any) {
  const [isRead, setIsRead] = useState<boolean>(props.isRead);
  const [isDeleted, setIsDeleted] = useState<boolean>(false);
  function markNotification(id: number) {
    fetch(`http://localhost:8080/notification/markRead/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setIsRead(true);
      })
      .catch((err) => console.log(err));
  }
  function deleteNotification(id: number) {
    fetch(`http://localhost:8080/notification/delete/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setIsDeleted(()=>true);
      })
      .catch((err) => console.log(err));
  }
  if(isDeleted) return null;
  return (
    <Card className="overflow-hidden mt-60" x-chunk="dashboard-05-chunk-4">
      <CardHeader className="flex flex-row items-start bg-muted/50">
        <div className="grid gap-0.5">
          <CardTitle className="group flex items-center gap-2 text-lg">
            {props.title}
            <Button
              size="icon"
              variant="outline"
              className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
            >
              <Copy className="h-3 w-3" />
              <span className="sr-only">Copy Order ID</span>
            </Button>
          </CardTitle>
          <CardDescription>
            Date: {formatDate(props.createdAt, "LLL dd y")}
          </CardDescription>
        </div>
        <div className="ml-auto flex items-center gap-1">
          {!props.isRead ? (
            <Button
              size="sm"
              variant="outline"
              className="h-8 gap-1"
              onClick={() => {
                markNotification(props.id);
              }}
            >
              <Check className="h-3.5 w-3.5" />
              <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
                Mark as read
              </span>
            </Button>
          ) : null}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="outline" className="h-8 w-8">
                <MoreVertical className="h-3.5 w-3.5" />
                <span className="sr-only">More</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem>Export</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={()=>{deleteNotification(props.id)}}>Trash</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="p-6 text-sm">
        <div className="grid gap-3">
          <div className="font-semibold">From: {props.senderName}</div>
          <Separator className="my-2" />
          Notification Content
          <P>{props.content}</P>
        </div>
        <Separator className="my-4" />
        Thank You
      </CardContent>
      <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
        <div className="text-xs text-muted-foreground"></div>
      </CardFooter>
    </Card>
  );
}
