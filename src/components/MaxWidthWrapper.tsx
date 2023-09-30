import { ReactNode } from "react";

type Props = {
    className?:string;
    children:ReactNode
}

const MaxWidthWrapper = ({className, children}: Props) => {
  return (
    <div className="" >{children}</div>
  )
}

export default MaxWidthWrapper