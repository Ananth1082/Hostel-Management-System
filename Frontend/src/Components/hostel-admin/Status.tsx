import { Badge } from "../ui/badge";

interface Props {
  isOnline:boolean
}

export default function Status(props:Props) {

  return props.isOnline?<Badge variant="destructive">Online</Badge>:<Badge variant="outline">Offline</Badge>;
}
