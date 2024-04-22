import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Table,TableHeader, TableRow, TableHead, TableBody } from "../ui/table";
import { Room } from "@/Types/Room";

export default function RoomsList() {
  const [roomList, setRoomList] = React.useState<Room[]>([]);
  useEffect(() => {
    fetch("http://localhost:8080/room")
      .then((response) => response.json())
      .then((rooms) => setRoomList(rooms))
      .catch((error) => console.error("Error:", error));
  }, []);
  
  function renderCells(){
    return roomList.map((room, index) => {
      return (
        <TableRow key={index}>
          <TableHead>{room.id}</TableHead>
          <TableHead>{room.block}</TableHead>
          <TableHead>{Math.floor(room.id / 100 + 1)}</TableHead>
          <TableHead>{room.capacity}</TableHead>
          <TableHead>{room.type}</TableHead>
          <TableHead>{room.inmates.map((inmate, index) => (
            <p key={index}>
              {inmate.username} <br /> {inmate.id}
            </p>
          ))}</TableHead>
        </TableRow>
      );
    });
  }
  return (
    <Card x-chunk="dashboard-06-chunk-0">
      <CardHeader>
        <CardTitle>Rooms List</CardTitle>
        <CardDescription>
          The list of all room detials and occupants
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
            </TableRow>
          </TableHeader>
          <TableBody>
            {renderCells()}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
