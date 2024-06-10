export default function createAvatar({username}:{username:string}) {
  return (
    <div className="aspect-sqaure h-[4rem]">{username[0].toUpperCase()}</div>
    )
};