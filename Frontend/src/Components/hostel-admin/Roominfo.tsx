import { Room } from "@/Types/Room";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";
import P from "../Typography/P";
import H3 from "../Typography/H3";
import H4 from "../Typography/H4";

export default function RoomInfo({ room }: { room: Room | null }) {
  return (
    <Card className="w-[25%] mx-auto mt-4">
      <CardHeader className="bg-black text-white text-center rounded-t-lg">
        <CardTitle>
          <H3>{room ? `Room number: ${room?.id}` : "Main Block"}</H3>
        </CardTitle>
        <CardDescription className="text-white">
          <P>{room ? `Floor: ${Math.floor(room.id / 100 + 1)}` : ""}</P>
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 grid place-content-center m-auto">
        <section className={room?"":"mt-10"}>
          {!room
            ? "Select room to view details "
            : "Capacity : " + room.capacity}
          <br />
          {room ? "Room Type : " + room.type : ""}
          <br />
          {room ? "Block : " + room.block : ""}
          <br />
        </section>
        <section>
          {room?room.inmates.length>0?<H4>Inmates</H4>:"":""}
          
            {room?.inmates.map((inmate, index) => (
              <P key={index}>
                {inmate.username} <br /> {inmate.id}
              </P>
            ))}
          
        </section>
      </CardContent>
    </Card>
  );
}
