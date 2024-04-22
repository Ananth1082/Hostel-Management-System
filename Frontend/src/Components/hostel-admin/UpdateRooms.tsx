import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../ui/table";
import { Room } from "@/Types/Room";
import { Button } from "../ui/button";
import UpdateRoomDialog from "./UpdateRoomDialog";

export default function UpdateRoom() {
  const [roomList, setRoomList] = React.useState<Room[]>([]);
  useEffect(() => {
    fetch("http://localhost:8080/room")
      .then((response) => response.json())
      .then((rooms) => setRoomList(rooms))
      .catch((error) => console.error("Error:", error));
  }, []);
  const deleteRoom = async (id: number) => {
    const req = { id: id };
    const response = await fetch(
      "http://localhost:8080/admin/room/deleteroom",
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
    const room = await response.json();
    console.log(room);
    fetch("http://localhost:8080/room")
      .then((response) => response.json())
      .then((rooms) => setRoomList(rooms))
      .catch((error) => console.error("Error:", error));
  };

  function renderCells() {
    return roomList.map((room, index) => {
      return (
        <TableRow key={index}>
          <TableCell>{room.id}</TableCell>
          <TableCell>{room.block}</TableCell>
          <TableCell>{Math.floor(room.id / 100 + 1)}</TableCell>
          <TableCell>{room.capacity}</TableCell>
          <TableCell>{room.type}</TableCell>
          <TableCell>
            {room.inmates.map((inmate, index) => (
              <p key={index}>
                {inmate.username} <br /> {inmate.id}
              </p>
            ))}
          </TableCell>
          <TableCell className="flex gap-4">
            <UpdateRoomDialog roomId={room.id}/>
            <Button onClick={() => deleteRoom(room.id)} variant="destructive">
              Delete
            </Button>
          </TableCell>
        </TableRow>
      );
    });
  }
  return (
    <Card x-chunk="dashboard-06-chunk-0">
      <CardHeader>
        <CardTitle>Update List</CardTitle>
        <CardDescription>
          Change the details of the respective rooms
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Room number</TableHead>
              <TableHead>Block</TableHead>
              <TableHead>Floor</TableHead>
              <TableHead>Capacity</TableHead>
              <TableHead>Room Type</TableHead>
              <TableHead>Inmates</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>{renderCells()}</TableBody>
        </Table>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
