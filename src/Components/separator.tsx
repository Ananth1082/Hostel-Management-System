const Separator = (props:Props) => {
  return (
    <div className={`border-gray border-[1px] h-0 w-[${props.width}]`}></div>
  )
}

type Props = {
    width: string;
}

export {Separator}
