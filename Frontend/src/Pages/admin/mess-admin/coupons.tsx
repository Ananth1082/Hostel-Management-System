import { MoreHorizontal, PlusCircle, Search } from "lucide-react";

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
import { Tab } from "../../../Components/hostel-admin/Tab";
import { User_Coupon } from "@/Types/User_Coupon";
import { formatDate } from "date-fns";
import FilterListButton from "@/Components/FilterListButton";
import { TabsContent } from "@radix-ui/react-tabs";
import QrReader from "@/Components/mess-admin/QrCodeReader";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/Components/ui/card";
import H2 from "@/Components/Typography/H2";
import H3 from "@/Components/Typography/H3";

export default function CouponsList() {
  const [users_coupon, setUserscoupon] = useState<User_Coupon[]>([]);
  const [currentTab, setCurrentTab] = useState<string>("");
  const [filterBy, setFliterBy] = useState<string>("None");
  const deleteCoupon = (couponCode: string) => {
    fetch("http://localhost:8080/coupon/mess-admin/deleteCoupon", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ couponCode }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.message === "Coupon deleted successfully") {
          fetch("http://localhost:8080/coupon/mess-admin/allCoupons") // replace with your actual API endpoint
            .then((response) => response.json())
            .then((data) => setUserscoupon(data.coupons))
            .catch((error) => console.error("Error:", error));
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  useEffect(() => {
    fetch("http://localhost:8080/coupon/mess-admin/allCoupons") // replace with your actual API endpoint
      .then((response) => response.json())
      .then((data) => setUserscoupon(data.coupons))
      .catch((error) => console.error("Error:", error));
    console.log(users_coupon);
  }, []);
  const renderUsersAndCoupons = () => {
    let filtered_users_coupon;
    if (filterBy !== "None") {
      filtered_users_coupon = users_coupon?.filter(
        (user_coupon: User_Coupon) => {
          return user_coupon.type === filterBy;
        }
      );
    } else {
      filtered_users_coupon = users_coupon;
    }
    return filtered_users_coupon?.map((user_coupon: User_Coupon) => {
      return (
        <TableRow key={user_coupon.userId}>
          <TableCell className="font-medium">{user_coupon.userId}</TableCell>

          <TableCell className="hidden md:table-cell">
            {user_coupon.couponCode}
          </TableCell>
          <TableCell className="hidden md:table-cell">
            {user_coupon.type}
          </TableCell>
          <TableCell className="hidden md:table-cell">
            {formatDate(user_coupon.expirationDate, "LLL dd y")}
          </TableCell>
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
                <DropdownMenuItem
                  onClick={() => {
                    deleteCoupon(user_coupon.couponCode);
                  }}
                >
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </TableCell>
        </TableRow>
      );
    });
  };

  return (
    <div className="flex min-h-screen w-[90%] ml-16 flex-col bg-muted/40">
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
          <Tabs defaultValue="List">
            <div className="flex items-center">
              <TabsList>
                <TabsTrigger
                  value="List"
                  onClick={() => {
                    setCurrentTab("List");
                  }}
                >
                  List
                </TabsTrigger>
                
                <TabsTrigger
                  value="Check Coupon"
                  onClick={() => {
                    setCurrentTab("Check Coupon");
                  }}
                >
                  Check Coupon
                </TabsTrigger>
              </TabsList>
              <div className="ml-auto flex items-center gap-2">
                <FilterListButton
                  setFilterBy={setFliterBy}
                  title="Filter"
                  filterItems={["None", "North", "South"]}
                />
                <Button size="sm" className="h-8 gap-1">
                  <PlusCircle className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Add Product
                  </span>
                </Button>
              </div>
            </div>

            <Tab
              renderCells={renderUsersAndCoupons}
              tabValue="List"
              tabTitle="List"
              tabDiscription="List of all the users"
              tableHeader={[
                "USN",
                "Coupon Code",
                "Mess Type",
                "Expiry Date",
                "Action",
              ]}
            />

            <TabsContent value="Check Coupon">
              <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader>
                  <CardTitle><H2>Scan the Qr code </H2></CardTitle>
                  <CardDescription><H3>to check your meal ticket</H3></CardDescription>
                </CardHeader>
                <CardContent className="flex">
                  
                  <QrReader />
                </CardContent>
                <CardFooter></CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}
