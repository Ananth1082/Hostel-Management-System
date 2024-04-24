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
import { Textarea } from "../ui/textarea";
import { useState } from "react";
import { Toaster, toast } from "sonner";

export function SendNotification() {
  const userId = "NNM22CS001";
  const [formData, setFormData] = useState({
    recipientId: "",
    title: "",
    message: "",
  });
  function handleChange(e: any) {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }
  function sendNotification() {
    if (!formData.recipientId || !formData.title || !formData.message)
      toast.warning("Please fill all the fields", {
        action: {
          label: "Close",
          onClick: () => console.log("Done"),
        },
      });
    fetch(`http://localhost:8080/notification/send`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ senderId: userId, ...formData }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Notification sent successfully") {
          toast.success("Notification sent successfully", {
            action: {
              label: "Close",
              onClick: () => console.log("Done"),
            },
          });
        } else {
          toast.warning("An error occured", {
            action: {
              label: "Close",
              onClick: () => console.log("Done"),
            },
          });
        }
      })
      .catch((_) => {
        toast.warning("An error occured", {
          action: {
            label: "Close",
            onClick: () => console.log("Done"),
          },
        });
      });
  }
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Send Notification</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[480px]">
          <DialogHeader>
            <DialogTitle>Send Notification</DialogTitle>
            <DialogDescription>
              Send notifications to the specified user. Be careful with the
              content of the notification.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="recipientId" className="text-right">
                Reciepient's Id
              </Label>
              <Input
                id="recipientId"
                placeholder="NNM20HM001"
                className="col-span-3"
                onChange={handleChange}
                value={formData.recipientId}
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                placeholder="Message Title"
                className="col-span-3"
                onChange={handleChange}
                value={formData.title}
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="message" className="text-right">
                Content
              </Label>
              <Textarea
                id="message"
                placeholder="Message Content"
                className="col-span-3"
                onChange={handleChange}
                value={formData.message}
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={sendNotification}>
              Send Notification
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Toaster position="top-center" />
    </>
  );
}
