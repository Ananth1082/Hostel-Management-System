import { Button } from "@/Components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/Components/ui/dialog";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { useState } from "react";
import { Toaster, toast } from "sonner";
import { ArrowBigDown } from "lucide-react";

export default function UpdateRoomDialog({ roomId }: { roomId: number }) {
  const [formData, setFormData] = useState({
    capacity: "",
    block: "",
    type: "",
  });
  const [roomMateData, setRoomMateData] = useState({
    oldOccupant: "",
    newOccupant: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleRoomMateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(name, value);

    setRoomMateData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const req = { id: roomId, ...formData };
    console.log(req);
    console.log(JSON.stringify(req));
    try {
      const response = await fetch(
        "http://localhost:8080/admin/room/updateroom",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(req),
        }
      );

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }
      const { room, message } = await response.json();
      console.log(message, room);
      toast.success("Login was successfull", {
        action: {
          label: "Close",
          onClick: () => console.log("Done"),
        },
      });
    } catch (error: any) {
      console.log(error.message);
      toast.warning("Incorrect details", {
        description: "Username or password entered was incorrect",
        action: {
          label: "Close",
          onClick: () => console.log("Retry"),
        },
      });
    }
    setFormData({
      capacity: "",
      block: "",
      type: "",
    });
  };
  const handleRoommateSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const req = { roomId: roomId, ...roomMateData };
    console.log(req);
    console.log(JSON.stringify(req));
    try {
      if (req.oldOccupant !== "") {
        const response = await fetch(
          "http://localhost:8080/admin/room/deleteroommate",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              roomId: req.roomId,
              userId: req.oldOccupant,
            }),
          }
        );

        if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(errorMessage);
        }
        const { message } = await response.json();
        console.log(message);
      }
      const response2 = await fetch(
        "http://localhost:8080/admin/room/addroommate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ roomId: req.roomId, userId: req.newOccupant }),
        }
      );

      if (!response2.ok) {
        const errorMessage = await response2.text();
        throw new Error(errorMessage);
      }
      const { message2 } = await response2.json();
      console.log(message2);
      toast.success("Room mate was changed", {
        action: {
          label: "Close",
          onClick: () => console.log("Done"),
        },
      });
    } catch (error: any) {
      console.log(error.message);
      toast.warning("Incorrect details", {
        description: "Enter correct USN or room number",
        action: {
          label: "Close",
          onClick: () => console.log("Retry"),
        },
      });
    }
    setRoomMateData({
      oldOccupant: "",
      newOccupant: "",
    });
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Update</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Room</DialogTitle>
            <DialogDescription>
              Make changes to room here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="capacity" className="text-right">
                  Capacity
                </Label>
                <Input
                  type="number"
                  id="capacity"
                  className="col-span-3"
                  name="capacity"
                  value={formData.capacity}
                  onChange={handleChange}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">
                  Type
                </Label>
                <Input
                  id="type"
                  className="col-span-3"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="block" className="text-right">
                  Block
                </Label>
                <Input
                  id="block"
                  className="col-span-3"
                  name="block"
                  value={formData.block}
                  onChange={handleChange}
                />
              </div>
            </div>
          </form>
          <div className="m-auto">
            <Button type="submit">Save changes</Button>
          </div>

          <form onSubmit={handleRoommateSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="oldOccupant" className="text-right">
                  Old Occupant
                </Label>
                <Input
                  id="oldOccupant"
                  className="col-span-3"
                  name="oldOccupant"
                  value={roomMateData.oldOccupant}
                  onChange={handleRoomMateChange}
                />
              </div>
              <ArrowBigDown className="m-auto"></ArrowBigDown>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="newOccupant" className="text-right">
                  New Occupant
                </Label>
                <Input
                  id="newOccupant"
                  className="col-span-3"
                  name="newOccupant"
                  value={roomMateData.newOccupant}
                  onChange={handleRoomMateChange}
                />
              </div>
            </div>
            <DialogFooter>
              <div className="m-auto">
                <Button type="submit">Save changes</Button>
              </div>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      <Toaster position="top-center" />
    </>
  );
}
