
const AuthLayout = ({
    children
}:{
    children:React.ReactNode
}) => {
  return (
    <div className="flex items-center justify-center h-full w-full bg-black/30">
        <div className="relative">
            {/* <div className="absolute top-10 h-[200px] w-[35px] bg-white ">

            </div> */}
        {children}
        </div>
    </div>
  )
}

export default AuthLayout