import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/Components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/Components/ui/dropdown-menu";
import {
  Hotel,
  Home,
  Bed,
  Utensils,
  UserRoundCog,
  WashingMachine,
  Users,
  LucideCookingPot,
} from "lucide-react";
import { Button } from "@/Components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { getUserInfo } from "@/getUserInfo";

export default function Header() {
  const navigate = useNavigate();
  const user = getUserInfo(navigate);
  
  return (
    <aside className="fixed inset-y-0 left-0 hidden w-14 flex-col border-r bg-white sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <Link
          to="#"
          className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
        >
          <Hotel className="h-4 w-4 transition-all group-hover:scale-110" />
          <span className="sr-only">Hostel Hub</span>
        </Link>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to="user/dashboard"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <Home className="h-5 w-5" />
                <span className="sr-only">Dashboard</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Dashboard</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to="user/rooms"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <Bed className="h-5 w-5" />
                <span className="sr-only">Rooms</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Rooms</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to="/user/meals"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <Utensils className="h-5 w-5" />
                <span className="sr-only">Meals</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Meals</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to="/user/user-info"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <UserRoundCog className="h-5 w-5" />
                <span className="sr-only">User</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">User</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to="user/services"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <WashingMachine className="h-5 w-5" />
                <span className="sr-only">Services</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Services</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        {user.roles.find((role:any,_:number)=>role=='ROLE_MESS-ADMIN')==='ROLE_MESS-ADMIN' ?
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to="mess-admin/dashboard"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <LucideCookingPot className="h-5 w-5" />Ad
                <span className="sr-only">Mess Admin</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Mess Admin</TooltipContent>
          </Tooltip>
        </TooltipProvider>:null}
        {user.roles.find((role:any)=>role=='ROLE_ADMIN')==='ROLE_ADMIN' ?
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to="hostel-admin/dashboard"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <Users className="h-5 w-5" />Ad
                <span className="sr-only">Hostel Admin</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Hostel Admin</TooltipContent>
          </Tooltip>
          {user.roles.find((role:any)=>role=='ROLE_ADMIN')==='ROLE_ADMIN' ?
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to="hostel-admin/rooms"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <Bed className="h-5 w-5" />Ad
                <span className="sr-only">Room Admin</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Room Admin</TooltipContent>
          </Tooltip>
          </TooltipProvider>:null}
        </TooltipProvider>:null}
        {user.roles.find((role:any)=>role=='ROLE_CLEAN-ADMIN')==='ROLE_CLEAN-ADMIN'?
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to="clean-admin/dashboard"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <WashingMachine className="h-5 w-5" />Ad
                <span className="sr-only">Services Admin</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Services Admin</TooltipContent>
          </Tooltip>
        </TooltipProvider>:null}
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="overflow-hidden rounded-full"
                  >
                    <img
                      src="/placeholder-user.jpg"
                      width={36}
                      height={36}
                      alt="Avatar"
                      className="overflow-hidden rounded-full"
                    />
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
            </TooltipTrigger>
            <TooltipContent side="right">Settings</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>
    </aside>
  );
}


