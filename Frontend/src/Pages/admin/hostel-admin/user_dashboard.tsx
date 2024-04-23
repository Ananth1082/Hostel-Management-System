import {
  ListFilter,
  MoreHorizontal,
  PlusCircle,
  Search,
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
import { TableCell, TableRow } from "@/Components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import { useState, useEffect } from "react";
import { ProfileAvatar } from "@/Components/hostel-admin/ProfileAvatar";
import Status from "@/Components/hostel-admin/Status";
import { Tab } from "../../../Components/hostel-admin/Tab";

interface User {
  id: string;
  username: string;
  email: string;
}
export default function Dashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [currentTab, setCurrentTab] = useState<string>("");
  const renderUsers = () => {
    return users.map((user: User) => {
      return (
        <TableRow key={user.id}>
          <TableCell className="hidden sm:table-cell">
            <ProfileAvatar imgSrc="https://github.com/shadcn.png"></ProfileAvatar>
          </TableCell>
          <TableCell className="font-medium">{user.id}</TableCell>
          <TableCell>
            <Status isOnline={true}></Status>
          </TableCell>
          <TableCell className="hidden md:table-cell">
            {user.username}
          </TableCell>
          <TableCell className="hidden md:table-cell">{user.email}</TableCell>
          <TableCell>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button aria-haspopup="true" size="icon" variant="ghost">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem>Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </TableCell>
        </TableRow>
      );
    });
  };

  useEffect(() => {
    fetch("http://localhost:8080/api/admin/allUsers") // replace with your actual API endpoint
      .then((response) => response.json())
      .then((data) => setUsers(data.users))
      .catch((error) => console.error("Error:", error));
    console.log(users);
  }, []);
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
                  <a href="#">User</a>
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
          <Tabs defaultValue="all">
            <div className="flex items-center">
              <TabsList>
                <TabsTrigger
                  value="all"
                  onClick={() => {
                    setCurrentTab("All");
                  }}
                >
                  All
                </TabsTrigger>
                <TabsTrigger
                  value="active"
                  onClick={() => {
                    setCurrentTab("Active");
                  }}
                >
                  Active
                </TabsTrigger>
                <TabsTrigger
                  value="student"
                  onClick={() => {
                    setCurrentTab("Student");
                  }}
                >
                  Student
                </TabsTrigger>
                <TabsTrigger
                  value="admin"
                  onClick={() => {
                    setCurrentTab("Admin");
                  }}
                >
                  Admin
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

            <Tab
              renderCells={renderUsers}
              tabValue="all"
              tabTitle="All"
              tabDiscription="List of all the users"
              tableHeader={["USN", "Status", "Name", "Email"]}
            />
            <Tab
              renderCells={renderUsers}
              tabValue="active"
              tabTitle="Active"
              tabDiscription="List of all the active users"
              tableHeader={["USN", "Status", "Name", "Email"]}
            />
            <Tab
              renderCells={renderUsers}
              tabValue="student"
              tabTitle="Students"
              tabDiscription="List of all the students"
              tableHeader={["USN", "Status", "Name", "Email"]}
            />
            <Tab
              renderCells={renderUsers}
              tabValue="admin"
              tabTitle="Admins"
              tabDiscription="List of all the admins"
              tableHeader={["USN", "Status", "Name", "Email"]}
            />
          </Tabs>
        </main>
      </div>
    </div>
  );
}
