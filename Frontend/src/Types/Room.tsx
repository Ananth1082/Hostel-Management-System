interface Room {
  id: number;
  block: "1";
  type: "Double-AC";
  capacity: 2;
  userId: null;
  inmates: Inmate[];
}
interface Inmate {
  id: string;
  username: string;
  room_user: {
    userId: string;
    roomId: Number;
  };
}
export type { Room };
