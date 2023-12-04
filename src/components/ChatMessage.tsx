import {FC} from "react";
import {cn} from "@/lib/utils";
import {BeatLoader} from "react-spinners";
import {Button} from "@/components/ui/button";
import {Copy} from "lucide-react";
import ChatBotAvatar from "@/components/ChatBotAvatar.tsx";
import UserAvatar from "@/components/UserAvatar.tsx";
import {useToast} from "@/components/ui/use-toast.ts";

export interface ChatMessageProps {
  role: "assistant" | "user",
  content?: string
  isLoading?: boolean
  src?: string
}

const ChatMessage: FC<ChatMessageProps> = ({role, content, isLoading}) => {
  const {toast} = useToast()
  const onCopy = () => {
    if (!content) {
      return
    }
    navigator.clipboard.writeText(content).then(() => {
      toast({
        description: "Message copied to clipboard"
      })
    })
  }

  return (
    <div className={cn(
      "group flex items-center gap-x-3 py-4 w-full",
      role === "user" && "justify-end"
    )}>
      {role !== "user" && <ChatBotAvatar/>}
      <div className={"rounded-md px-4 py-2 max-2-sm text-sm bg-primary/10"}>
        {isLoading ? <BeatLoader size={5}/> : content}
      </div>
      {role === "user" && <UserAvatar/>}
      {role !== "user" && !isLoading && <Button onClick={onCopy}
                                                className={"opacity-0 group-hover:opacity-100 transition"} size={"icon"}
                                                variant={"ghost"}>
          <Copy className={"h-4 w-4"}/>
      </Button>}
    </div>
  );
}

export default ChatMessage

