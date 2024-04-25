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
} from "../ui/table";

interface Service {
  id: number;
  roomId: number;
  userId: number;
  date: string;
}
export default function ServiceList() {
  const [serviceList, setServiceList] = React.useState<Service[]>([]);
  useEffect(() => {
    fetch("http://localhost:8080/clean-admin/roomservice")
      .then((response) => response.json())
      .then((rooms) => setServiceList(rooms.roomServices))
      .catch((error) => console.error("Error:", error));
  }, []);

  function renderCells() {
    if (serviceList.length !== 0) {
      return serviceList.map((service, index) => {
        return (
          <TableRow key={index}>
            <TableHead>{service.id}</TableHead>
            <TableHead>1</TableHead>
            <TableHead>{service.roomId}</TableHead>
            <TableHead>{service.userId}</TableHead>
            <TableHead>{service.date}</TableHead>
            <TableHead>Yes</TableHead>
          </TableRow>
        );
      });
    } else {
      return null;
    }
  }
  return (
    <Card x-chunk="dashboard-06-chunk-0">
      <CardHeader>
        <CardTitle>Service List</CardTitle>
        <CardDescription>
          The list of all requested service detials and occupants
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>S.No</TableHead>
              <TableHead>Block</TableHead>
              <TableHead>Room Number</TableHead>
              <TableHead>USN</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Approved</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>{renderCells()}</TableBody>
        </Table>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
