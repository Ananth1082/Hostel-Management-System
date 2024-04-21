import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/Components/ui/avatar"

interface Props{
  imgSrc:string
}
export function ProfileAvatar(props:Props) {
  return (
    <Avatar>
      <AvatarImage src={props.imgSrc} alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  )
}