
export default function P(props:{children?:React.ReactNode,className?:string}) {
  return (
      <p className={`leading-7 [&:not(:first-child)]:mt-6 ${props.className}`}>
        {props.children}
      </p>
  )
}
