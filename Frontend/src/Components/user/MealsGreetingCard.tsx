import { useNavigate } from "react-router-dom";
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
import { useEffect, useState } from "react";
import { getUserInfo } from "@/getUserInfo";

export default function MealsGreetingCard() {
  const [hasCoupon, setHasCoupon] = useState(false);
  const navigate = useNavigate();
  const user = getUserInfo(navigate);
  const [cid,setCid]=useState("Hello world");

  useEffect(() => {
    fetch(`http://localhost:8080/coupon/get/${user.id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.userCoupon !== null) {
          setHasCoupon(true);
          setCid(data.userCoupon.couponCode)
        }
      })
      .catch((err) => console.log(err));
  }, []);
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
          <H4>Meal will be ready in 1 hour</H4>
        </CardContent>
        <CardFooter>
          <p>Convenient isn't?</p>
        </CardFooter>
      </Card>
      <Card className="w-[30vw] grid place-content-center">
        <CardContent className="">
          {hasCoupon ? (<QrcodeGenerator qrData={cid} />):<BuyCoupon />}
          
          
        </CardContent>
      </Card>
    </div>
  );
}
