import H2 from "../Typography/H2";
import H4 from "../Typography/H4";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../ui/card";
import BuyCoupon from "./BuyCoupon";
import QrcodeGenerator from "./QrcodeGenerator";

export default function MealsGreetingCard() {
  return (
    <div className="flex w-[70%] m-auto mt-4 gap-12">
      <Card>
        <CardHeader>
          <CardTitle>
            <H2>
              Hungry, Username 😋 <br />
              Just scan the qr code
            </H2>
          </CardTitle>
          <CardDescription>Breakfast</CardDescription>
        </CardHeader>
        <CardContent>
          <H4>Meal will be ready in HH:MM:SS</H4>
        </CardContent>
        <CardFooter>
          <p>Convenient isn't?</p>
        </CardFooter>
      </Card>
      <Card className="w-[30vw] grid place-content-center">
        <CardContent className="">
          {/* <QrcodeGenerator qrData="hello" /> */}
          <BuyCoupon />
        </CardContent>
      </Card>
    </div>
  );
}
