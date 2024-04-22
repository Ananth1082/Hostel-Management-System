import {
  ListFilter,
  MoreHorizontal,
  PlusCircle,
  Search,
  Table,
} from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/Components/ui/breadcrumb";
import { Button } from "@/Components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { Input } from "@/Components/ui/input";
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import { useState, useEffect } from "react";
import { ProfileAvatar } from "@/Components/hostel-admin/ProfileAvatar";
import Status from "@/Components/hostel-admin/Status";
import { Tab } from "../../../Components/hostel-admin/Tab";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";
import RoomsLayout from "@/Components/hostel-admin/RoomsLayout";
import H2 from "@/Components/Typography/H2";
import P from "@/Components/Typography/P";

interface User {
  id: string;
  username: string;
  email: string;
}
export default function Rooms() {
  
  const [currentTab, setCurrentTab] = useState<string>("");

  // useEffect(() => {
  //   fetch("http://localhost:8080/api/admin/allUsers") // replace with your actual API endpoint
  //     .then((response) => response.json())
  //     .then((data) => setUsers(data.users))
  //     .catch((error) => console.error("Error:", error));
  //   console.log(users);
  // }, []);
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col ml-auto w-full">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
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
                  <a href="#">Rooms</a>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{currentTab}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="relative ml-auto flex-1 md:grow-0">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="overflow-hidden rounded-full"
              >
                <ProfileAvatar imgSrc="https://github.com/shadcn.png" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Tabs defaultValue="layout">
            <div className="flex items-center">
              <TabsList>
                <TabsTrigger
                  value="layout"
                  onClick={() => {
                    setCurrentTab("Layout");
                  }}
                >
                  Layout
                </TabsTrigger>
                <TabsTrigger
                  value="List"
                  onClick={() => {
                    setCurrentTab("List");
                  }}
                >
                  List
                </TabsTrigger>
                <TabsTrigger
                  value="Update Rooms"
                  onClick={() => {
                    setCurrentTab("Update Rooms");
                  }}
                >
                  Update Rooms
                </TabsTrigger>
                
              </TabsList>
              <div className="ml-auto flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-8 gap-1">
                      <ListFilter className="h-3.5 w-3.5" />
                      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Filter
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem checked>
                      Active
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>
                      Archived
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button size="sm" className="h-8 gap-1">
                  <PlusCircle className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Add Product
                  </span>
                </Button>
              </div>
            </div>
            <Card x-chunk="dashboard-06-chunk-0">
              <CardHeader>
                <CardTitle><H2>Rooms Layout</H2></CardTitle>
                <CardDescription><P>This is the room arrangement for the main block</P></CardDescription>
              </CardHeader>
              <CardContent>
                <RoomsLayout></RoomsLayout>
              </CardContent>
              <CardFooter></CardFooter>
            </Card>
          </Tabs>
        </main>
      </div>
    </div>
  );
}
