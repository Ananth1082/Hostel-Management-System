import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/Components/ui/alert-dialog";
import { Button } from "@/Components/ui/button";
import { useState } from "react";
import { Toaster, toast } from "sonner";

export default function BuyCouponAlert() {
  const [type, setType] = useState<string>("South");
  const createCoupon = async () => {
    const req = { userId: "NNM22CS001", type: type };

    const response = await fetch("http://localhost:8080/coupon/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req),
    });
    if (!response.ok) {
      toast.warning("Error", {
        description: "You already have a coupon",
        action: {
          label: "Close",
          onClick: () => console.log("Retry"),
        },
      });
      throw new Error(`${await response.text()}`);
    }
    toast.success("Coupon was created enjoy your meal", {
      action: {
        label: "Close",
        onClick: () => console.log("Done"),
      },
    });
    const msg = await response.json();
    console.log(msg);
  };
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button>Show Dialog</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Do want to buy the coupon?</AlertDialogTitle>
            <AlertDialogDescription>
              This coupon will be availble for one month
              <br /> Mess Type:
              <div className="flex justify-around w-[50%] m-auto mt-5">
                <div
                  onClick={() => setType("North")}
                  className={`border-2 p-1 px-4 rounded-lg cursor-pointer ${
                    type === "North" ? "bg-black text-white" : ""
                  }`}
                >
                  North
                </div>
                <div
                  onClick={() => setType("South")}
                  className={`border-2 p-1 px-4 rounded-lg cursor-pointer ${
                    type === "South" ? "bg-black text-white" : ""
                  }`}
                >
                  South
                </div>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                createCoupon()
              }}
            >
              Pay Rs. 1000
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Toaster />
    </>
  );
}
