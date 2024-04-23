
export default function H3(props:{children?:React.ReactNode,className?:string}) {
  return (
    <h3 className={`scroll-m-20 text-2xl font-semibold tracking-tight ${props.className}`}>
      {props.children}
    </h3>
  )
}
