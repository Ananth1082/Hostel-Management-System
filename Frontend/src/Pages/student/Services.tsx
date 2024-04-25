import {
  Home,
  LineChart,
  Package,
  Package2,
  PanelLeft,
  ShoppingCart,
  Users2,
} from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/Components/ui/breadcrumb";
import { Button } from "@/Components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";
import { Progress } from "@/Components/ui/progress";
import { Sheet, SheetContent, SheetTrigger } from "@/Components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import { useState } from "react";
import { BookLaundry } from "@/Components/user/BookLaundry";
import Timer from "@/Components/user/Timer";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";

export function Services() {
  const navigate = useNavigate();
  const user = getUserInfo(navigate);
  const [progress, setProgress] = useState<number>(0);
  const [timer, setTimer] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const userId = user.id;
  const [formData, setFormData] = useState({
    roomId: null,
    userId: userId,
    date: "",
  });

  function handleChange(e: any) {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }
  
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs">
              <nav className="grid gap-6 text-lg font-medium">
                <a
                  href="#"
                  className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                >
                  <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
                  <span className="sr-only">Acme Inc</span>
                </a>
                <a
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <Home className="h-5 w-5" />
                  Dashboard
                </a>
                <a
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-foreground"
                >
                  <ShoppingCart className="h-5 w-5" />
                  Orders
                </a>
                <a
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <Package className="h-5 w-5" />
                  Products
                </a>
                <a
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <Users2 className="h-5 w-5" />
                  Customers
                </a>
                <a
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <LineChart className="h-5 w-5" />
                  Settings
                </a>
              </nav>
            </SheetContent>
          </Sheet>
          <Breadcrumb className="hidden md:flex">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <a href="#">Dashboard</a>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <a href="#">Notifications</a>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="relative ml-auto flex-1 md:grow-0"></div>
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
          <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              <Card className="sm:col-span-2" x-chunk="dashboard-05-chunk-0">
                <CardHeader className="pb-3">
                  <CardTitle>Laundry 😒</CardTitle>
                  <CardDescription className="max-w-lg text-balance leading-relaxed">
                    Nice day to do laudry init? <br />
                  </CardDescription>
                </CardHeader>
                <CardFooter className="grid grid-cols-2 gap-8 ">
                  <BookLaundry setTimer={setTimer} />
                </CardFooter>
              </Card>
              <Card x-chunk="dashboard-05-chunk-1">
                <CardHeader className="pb-2">
                  <CardDescription>Washing Machine</CardDescription>
                  {/* <CardTitle className="text-3xl">00:25:32 left</CardTitle> */}
                  <Timer initialTime={timer} setProgress={setProgress} />
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-muted-foreground"></div>
                </CardContent>
                <CardFooter className="grid place-content-center">
                  {progress > 100 ? (
                    <Progress value={progress} aria-label="25% increase" />
                  ) : (
                    <div className="bg-black text-white rounded-xl px-4 py-1">
                      Done 🎊
                    </div>
                  )}
                </CardFooter>
              </Card>
            </div>
            <Tabs defaultValue="Room Service">
              <div className="flex items-center">
                <TabsList>
                  <TabsTrigger value="Room Service">Room Service</TabsTrigger>
                </TabsList>
                <div className="ml-auto flex items-center gap-2"></div>
              </div>
              <TabsContent value="Room Service">
                <Card x-chunk="dashboard-05-chunk-3" className="w-[100%]">
                  <CardHeader className="px-7">
                    <CardTitle>Room service</CardTitle>
                    <CardDescription>
                      Get your room squeky clean by our professionals
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid grid-cols-2 gap-20">
                    <div className="grid ">
                      <Label htmlFor="roomId">Room number</Label>
                      <Input
                        type="number"
                        id="roomId"
                        name="roomId"
                        value={formData.roomId ? formData.roomId : ""}
                        onChange={handleChange}
                        required
                        className="mt-[-3rem]"
                      />
                    </div>
                    <div className="grid">
                      {" "}
                      
                      <Label htmlFor="date">Pick a Date</Label>
                      <br />
                      <ServiceCalendar userId={userId} roomId={formData.roomId?formData.roomId:0}  />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          <div></div>
        </main>
      </div>
    </div>
  );
}
import * as React from "react";
import { formatDate } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";


import { cn } from "@/lib/utils";
import { Calendar } from "@/Components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/Components/ui/popover";
import { Toaster, toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { getUserInfo } from "@/getUserInfo";

function ServiceCalendar({userId,roomId }:{userId:string,roomId:number}) {
  const [date, setDate] = React.useState<Date | undefined>(
     new Date(2024, 3, 20))
    
  
  const roomService = async () => {
    
    if (date) {
      const req = {
        date: date,
        userId:userId,
        roomId: roomId,
      };
      console.log(req);

      const response = await fetch("http://localhost:8080/createroomservice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req),
      });
      if (!response.ok) {
        toast.warning("Incorrect details", {
          description: "USN or roomId entered was incorrect",
          action: {
            label: "Close",
            onClick: () => console.log("Retry"),
          },
        });
        throw new Error(`${await response.text()}`);
      }
      toast.success("Room service Booked", {
        action: {
          label: "Close",
          onClick: () => console.log("Done"),
        },
      });
      const msg = await response.json();
      console.log(msg);
    } else {
      toast.warning("There was an error", {
        description: "Failed to book room service, please try again later",
        action: {
          label: "Close",
          onClick: () => console.log("Retry"),
        },
      });
    }
  };

  return (
    <div className={cn("grid gap-2")}>
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
            {date? formatDate(date, "LLL dd, y"):""}
                 
              {" "}
              
            
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            
            defaultMonth={new Date("2024-04-20")}
            selected={date}
            onSelect={setDate}
            numberOfMonths={1}
          />
        </PopoverContent>
      </Popover>
      <Button onClick={roomService} className="mt-4" variant="default">
        Call room service
      </Button>
      <Toaster />
    </div>
  );
}
