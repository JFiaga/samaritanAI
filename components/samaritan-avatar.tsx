
import {
    Avatar,
    AvatarFallback,
    AvatarImage
} from "@/components/ui/avatar"

const SamaritanAvatar = () => {
    return (
        <Avatar className="h-8 w-8 bg-green-700/10">
        <AvatarImage src={'/logo.png'}/>
        
    </Avatar>
  )
}

export default SamaritanAvatar