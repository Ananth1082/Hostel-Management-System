import {
  Filter,
  Home,
  LineChart,
  ListFilter,
  Package,
  Package2,
  PanelLeft,
  Search,
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
import { Progress } from "@/Components/ui/progress";
import { Sheet, SheetContent, SheetTrigger } from "@/Components/ui/sheet";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import NotificationInfo from "@/Components/user/NotificationInfo";
import Notification from "@/Components/user/Notification";
import { useEffect, useState } from "react";
import { SendNotification } from "@/Components/user/SendNotification";
import FilterListButton from "@/Components/FilterListButton";

interface notify_response {
  id: number;
  title: string;
  message: string;
  senderId: string;
  recipientId: string;
  senderName: string;
  senderEmail: string;
  isRead: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export function Dashboard() {
  const recipientId = "NNM22CS002";
  const [notifications, setNotifications] = useState<
    notify_response[] | null
  >();
  const [filterBy, setFilterBy] = useState<string>("None");
  const [currentNotification, setCurrentNotofication] =
    useState<notify_response | null>(null);
  function handleClick(index: number) {
    if (notifications!=undefined){
      const notification = notifications.find((notification) => notification.id === index);
      if (notification) {
        setCurrentNotofication(notification);
      }
    }else return null;
  }
  const fetchNotifications = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/notification/get/${recipientId}`
      );
      const data = await response.json();

      const formattedNotifications = await Promise.all(
        data.userNotifications.map(async (notification: any) => {
          const recNameResponse = await fetch(
            `http://localhost:8080/api/get/user/${notification.senderId}`
          );
          const recNameData = await recNameResponse.json();
          const sendName = recNameData.user.username;
          const sendEmail = recNameData.user.email;

          return {
            ...notification,
            senderName: sendName,
            senderEmail: sendEmail,
            createdAt: new Date(notification.createdAt),
            updatedAt: new Date(notification.updatedAt),
          };
        })
      );
      setNotifications(formattedNotifications);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);
  function renderNotifications() {
    if(!notifications) return null;
    return notifications.map((notification) => (
      <Notification
        key={notification.id}
        senderName={notification.senderName}
        senderEmail={notification.senderEmail}
        isRead={notification.isRead}
        title={notification.title}
        createdAt={notification.createdAt}
        handleClick={handleClick}
        id={notification.id}
      />
    ));
  }
  function renderSentNotifications() {
    if(!notifications) return null;
    return notifications.map((notification) => (
      <Notification
        key={notification.id}
        senderName={notification.senderName}
        senderEmail={notification.senderEmail}
        isRead={notification.isRead}
        title={notification.title}
        createdAt={notification.createdAt}
        handleClick={handleClick}
        id={notification.id}
      />
    ));
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
          <div className="relative ml-auto flex-1 md:grow-0">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
            />
          </div>
          
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
          <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              <Card className="sm:col-span-2" x-chunk="dashboard-05-chunk-0">
                <CardHeader className="pb-3">
                  <CardTitle>Hello, Username 👋</CardTitle>
                  <CardDescription className="max-w-lg text-balance leading-relaxed">
                    Good Day, Check your notifications. <br />
                  </CardDescription>
                </CardHeader>
                <CardFooter className="grid grid-cols-2 gap-8 ">
                  <SendNotification/>
                  <Button>Edit profile</Button>
                </CardFooter>
              </Card>
              <Card x-chunk="dashboard-05-chunk-1">
                <CardHeader className="pb-2">
                  <CardDescription>Washing Machine</CardDescription>
                  <CardTitle className="text-3xl">00:25:32 left</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-muted-foreground"></div>
                </CardContent>
                <CardFooter>
                  <Progress value={45} aria-label="25% increase" />
                </CardFooter>
              </Card>
            </div>
            <Tabs defaultValue="Received">
              <div className="flex items-center">
                <TabsList>
                  <TabsTrigger value="Received">Received</TabsTrigger>
                  <TabsTrigger value="Sent">Sent</TabsTrigger>
                </TabsList>
                <div className="ml-auto flex items-center gap-2">
                  <FilterListButton title={"Filter"} filterItems={["hostel-admin","mess-admin","room-service"]} setFilterBy={setFilterBy}
                   />
                </div>
              </div>
              <TabsContent value="Received">
                <Card x-chunk="dashboard-05-chunk-3">
                  <CardHeader className="px-7">
                    <CardTitle>Notifications</CardTitle>
                    <CardDescription>Check your notifications</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Sender</TableHead>
                          <TableHead className="hidden md:table-cell">
                            Title
                          </TableHead>

                          <TableHead className="hidden md:table-cell">
                            Date
                          </TableHead>
                          <TableHead className="hidden sm:table-cell">
                            Status
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>{renderNotifications()}</TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="Sent">
                <Card x-chunk="dashboard-05-chunk-3">
                  <CardHeader className="px-7">
                    <CardTitle>Notifications</CardTitle>
                    <CardDescription>Check your notifications</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Sender</TableHead>
                          <TableHead className="hidden md:table-cell">
                            Title
                          </TableHead>

                          <TableHead className="hidden md:table-cell">
                            Date
                          </TableHead>
                          <TableHead className="hidden sm:table-cell">
                            Status
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>{renderSentNotifications()}</TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          <div>
            {currentNotification?<NotificationInfo
              id={currentNotification?.id}
              title={currentNotification?.title}
              createdAt={currentNotification?.createdAt}
              senderName={currentNotification?.senderName}
              sendEmail={currentNotification?.senderEmail}
              content={currentNotification?.message}
              isRead={currentNotification?.isRead}
            />:null}
            
          </div>
        </main>
      </div>
    </div>
  );
}
