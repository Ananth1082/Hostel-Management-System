
export default function H3(props:{children?:React.ReactNode}) {
  return (
    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
      {props.children}
    </h3>
  )
}
