import * as React from "react";
import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/Components/ui/button";
import { Calendar } from "@/Components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/Components/ui/popover";
import { Toaster, toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { getUserInfo } from "@/getUserInfo";

export default function MealsCalendar({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const navigate = useNavigate();
  const user = getUserInfo(navigate);
  const [cid, setCid] = React.useState("");
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2024, 3, 20),
    to: addDays(new Date(2024, 3, 20), 20),
  });
  React.useEffect(() => {
    fetch(`http://localhost:8080/coupon/get/${user.id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.userCoupon !== null) {
          setCid(data.userCoupon.couponCode);
        }
      })
      .catch((err) => console.log(err));
  }, []);
  const releaseCoupon = async () => {
    const startDate = date?.from ? format(date.from, "y-MM-dd") : null;
    const endDate = date?.to ? format(date.to, "y-MM-dd") : null;
    if (startDate && endDate) {
      const req = {
        couponCode: cid,
        startDate: startDate,
        endDate: endDate,
      };
      console.log(req);

      const response = await fetch("http://localhost:8080/coupon/release", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req),
      });
      if (!response.ok) {
        toast.warning("Incorrect details", {
          description: "Username or password entered was incorrect",
          action: {
            label: "Close",
            onClick: () => console.log("Retry"),
          },
        });
        throw new Error(`${await response.text()}`);
      }
      toast.success("Coupons were released", {
        action: {
          label: "Close",
          onClick: () => console.log("Done"),
        },
      });
      const msg = await response.json();
      console.log(msg);
    } else {
      toast.warning("Incorrect details", {
        description: "Please enter the from and to dates",
        action: {
          label: "Close",
          onClick: () => console.log("Retry"),
        },
      });
    }
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={1}
          />
        </PopoverContent>
      </Popover>
      <Button onClick={releaseCoupon} className="mt-4" variant="default">
        Release them coupons !!!
      </Button>
      <Toaster />
    </div>
  );
}
