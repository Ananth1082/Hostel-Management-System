import { Button } from "@/Components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/Components/ui/dialog";
import { Label } from "@/Components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/Components/ui/radio-group";
import P from "../Typography/P";
import { Toaster, toast } from "sonner";
import { useState } from "react";

export function BookLaundry({ setTimer }: { setTimer: any }) {
  const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 });
  function handleClick() {
    setTimer(time);
    toast.success("Laundry booked", {
      action: {
        label: "Close",
        onClick: () => console.log("Done"),
      },
    });
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Book Laundry</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Book Laundry</DialogTitle>
          <DialogDescription>
            Book the washing machine for the next available slot
          </DialogDescription>
        </DialogHeader>
        <P>Selec the duration of wash</P>
        <div className="grid gap-4 py-4">
          <RadioGroup defaultValue="comfortable">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="default" id="r1" />
              <Label
                htmlFor="r1"
                onClick={() => {
                  setTime({ hours: 0, minutes: 10, seconds: 0 });
                }}
              >
                10min
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="comfortable" id="r2" />
              <Label
                htmlFor="r2"
                onClick={() => {
                  setTime({ hours: 0, minutes: 20, seconds: 0 });
                }}
              >
                20min
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="compact" id="r3" />
              <Label
                htmlFor="r3"
                onClick={() => {
                  setTime({ hours: 0, minutes: 40, seconds: 0 });
                }}
              >
                40min
              </Label>
            </div>
          </RadioGroup>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={() => {
              handleClick();
            }}
          >
            Book time slot
          </Button>
          <DialogClose>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
      <Toaster />
    </Dialog>
  );
}
