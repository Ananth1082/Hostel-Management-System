import { Avatar, AvatarFallback } from "@/Components/ui/avatar";

interface Props {
  username?: string;
}
export function ProfileAvatar(props: Props) {
  return (
    <Avatar>
      <AvatarFallback>
        {props.username
          ? props.username.split(" ").map((word) => word.charAt(0))
          : "CN"}
      </AvatarFallback>
    </Avatar>
  );
}
