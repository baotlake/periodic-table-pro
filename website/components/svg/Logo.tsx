import * as React from 'react'
import type { SVGProps } from 'react'
const SvgLogo = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 512 512"
    {...props}
  >
    <rect width={512} height={512} fill="#121314" rx={256} />
    <path
      fill="#FB3BB9"
      fillRule="evenodd"
      d="M337 154a6 6 0 0 0-6 6v68h-22a6 6 0 0 0-6 6v44a6 6 0 0 0 6 6h22v109a6 6 0 0 0 6 6h57a6 6 0 0 0 6-6V284h26a6 6 0 0 0 6-6v-44a6 6 0 0 0-6-6h-26v-68a6 6 0 0 0-6-6zM110 112a6 6 0 0 0-6 6v275a6 6 0 0 0 6 6h57a6 6 0 0 0 6-6V268h22c43.078 0 78-34.922 78-78s-34.922-78-78-78h-85"
      clipRule="evenodd"
    />
    <path fill="#FDB1E3" d="M104 118a6 6 0 0 1 6-6h39v39h-45z" />
    <path fill="#FD89D4" d="M149 112h45v39h-45z" />
    <path fill="#FC62C6" d="M149 151h45v33a6 6 0 0 1-6 6h-39z" />
    <path fill="#FD89D4" d="M104 151h45v39h-45z" />
  </svg>
)
export default SvgLogo
