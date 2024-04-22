import { useEffect, useState } from "react";
import H3 from "../Typography/H3";
import H2 from "../Typography/H2";
import { Room } from "@/Types/Room";
import RoomInfo from "./RoomInfo";

export default function RoomsLayout() {
  const [floor, setFloor] = useState<number>(1);
  const [room, setRoom] = useState<Room | null>(null);
  const [roomList, setRoomList] = useState<Room[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/room")
      .then((response) => response.json())
      .then((rooms) => setRoomList(rooms))
      .catch((error) => console.error("Error:", error));
  }, []);

  const getRoomInfo = async (curRoom: Room | null) => {
    setRoom(curRoom);
    const req = { id: curRoom?.id };
    const response = await fetch("http://localhost:8080/room/roombyid", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req),
    });
    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage);
    }
    const room = await response.json();
    console.log(room);
  };

  function renderRooms() {
    const rooms = roomList.filter(
      (room) =>
        room.block === "1" &&
        room.id >= floor * 100 &&
        room.id < floor * 100 + 100
    );
    console.log(rooms);
    return rooms.map((room, index) => (
      <div
        key={index}
        onClick={() => getRoomInfo(room)}
        className={
          " w-full m-auto aspect-[3/2] border-2 border-black grid place-content-center cursor-pointer " +
          (room.inmates.length == 0
            ? "bg-white" // room is empty
            : room.inmates.length == room.capacity //room is full
            ? "bg-black text-white"
            : "bg-red-600") // room is partially filled
        }
      >
        {room.id}
      </div>
    ));
  }

  return (
    <>
      <div className="flex">
        <div className="w-[50%] grid grid-cols-10 gap-2 border-2 border-black p-6">
          {renderRooms()}
          <div className="border-2 border-black col-start-2 col-end-10 row-start-2 row-end-8 grid place-content-center text-center">
            <div className="p-4 border-2 border-black">
              <H2>Main Block</H2>
              <br />
              <H3>{`Floor ${floor}`}</H3>
            </div>
          </div>
        </div>
        <RoomInfo room={room}></RoomInfo>
      </div>
      <div className="flex justify-center gap-5 m-auto mt-6 w-[50%]">
        {[1, 2, 3, 4].map((f) => (
          <div
            key={f}
            onClick={() => setFloor(f)}
            className={`cursor-pointer text-center p-2 w-10 aspect-square border-2 ${
              floor === f ? "bg-black text-white" : ""
            }`}
          >
            {f}
          </div>
        ))}
      </div>
    </>
  );
}
