import React from 'react'

export default function H4(props:{children:React.ReactNode}) {
  return (
    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
      {props.children}
    </h4>
  )
}
