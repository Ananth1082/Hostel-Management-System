import React from 'react'

export default function H2(props:{children?:React.ReactNode,className?:String}) {
  return (
    <h2 className={`scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0 ${props.className}`}>
      {props.children}
    </h2>
  )
}
