import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import {FC} from "react";

interface UserAvatarProps {
  hasText?: boolean
}

const UserAvatar: FC<UserAvatarProps> = ({hasText = false}) => {
  return (
    <div className={"flex justify-center items-center flex-col"}>
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn"/>
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      {hasText && <div className={"py-4"}>点击登录</div>}
    </div>
  );
}

export default UserAvatar

