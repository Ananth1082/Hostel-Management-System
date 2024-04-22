
export default function P(props:{children?:React.ReactNode}) {
  return (
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        {props.children}
      </p>
  )
}
