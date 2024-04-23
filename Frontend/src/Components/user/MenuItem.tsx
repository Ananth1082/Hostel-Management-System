import H3 from "../Typography/H3";
import List from "../Typography/List";
import P from "../Typography/P";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../ui/card";
import { Menu } from "@/Types/Menu";

export default function MenuItem({menuItem}:{menuItem: Menu|undefined}) {
  
  return (
    <Card>
      <CardHeader className="bg-black text-white rounded-t-lg">
        <CardTitle >
          <H3>{menuItem?.time}</H3> 
        </CardTitle>
        <CardDescription><P className="text-white">{menuItem?.day}</P></CardDescription>
      </CardHeader>
      <CardContent>
        <p>{menuItem?<List listitems={menuItem.description.split(",")} />:""}</p>
      </CardContent>
      <CardFooter className="bg-slate-100  rounded-b-lg p-2">
        <p>{menuItem?.mess_type}</p>
      </CardFooter>
    </Card>
  );
}

