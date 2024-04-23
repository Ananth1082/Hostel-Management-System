import H2 from "../Typography/H2";
import P from "../Typography/P";
import MealsCalendar from "./Calendar";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../ui/card";
import { Button } from "../ui/button";
import H3 from "../Typography/H3";

export default function ReleaseCoupon() {
  return (
    <div className="flex w-[80%] m-auto mt-10 border-2 p-4 rounded-lg">
      <Card className="ml-12">
        <CardHeader>
          <CardTitle><H2>Release Coupon</H2></CardTitle>
          <CardDescription><P>Releive coupons to save money</P></CardDescription>
        </CardHeader>
        <CardContent className="flex">
          
          <div><MealsCalendar/></div>
          
        </CardContent>
        <CardFooter>
          
        </CardFooter>
      </Card>
      <div className="w-full grid place-content-center"><H2>You have saved Rs. 235</H2></div>
    </div>
  );
}
