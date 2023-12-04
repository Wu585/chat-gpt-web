import Sidebar from "../components/Sidebar.tsx";
import FormInput from "@/components/FormInput.tsx";
import MobileSidebar from "@/components/MobileSidebar.tsx";
import ChatMessage from "@/components/ChatMessage.tsx";
import {ChangeEvent, ElementRef, FormEvent, useEffect, useRef, useState} from "react";
import axios from "axios";
import {useToast} from "@/components/ui/use-toast.ts";

interface Messages {
  content: string
  role: "assistant" | "user"
}

const Home = () => {
  const [messages, setMessages] = useState<Messages[]>([])
  const [value, setValue] = useState('')
  const [isLoading, setLoading] = useState(false)
  const {toast} = useToast()
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }
  const scrollRef = useRef<ElementRef<"div">>(null)
  useEffect(() => {
    scrollRef?.current?.scrollIntoView({behavior: "smooth"})
  }, [messages.length])
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setMessages((current) => [...current, {content: value, role: "user"}])
    setLoading(true)
    axios.get(`api/chat/chatCompletion?prompt=${value}`).then((res) => {
      setMessages((current) => [...current, res.data])
      setLoading(false)
    }).catch(() => {
      setLoading(false)
      toast({description: "出错了，请重新输入！", variant: "destructive"})
    })
    setValue('')
  }
  return (
    <div className={"h-screen bg-secondary"}>
      <MobileSidebar/>
      <div className={"hidden md:flex w-64 flex-col fixed inset-y-0 z-10"}>
        <Sidebar/>
      </div>
      <div className={"w-full border md:left-32 fixed bottom-0 flex items-center justify-center bg-secondary"}>
        <FormInput input={value} handleInputChange={handleInputChange} onSubmit={onSubmit} isLoading={isLoading}/>
      </div>
      <div className={"border-solid border-r-amber-400 relative top-0  md:pl-72 md:pr-4 py-2 overflow-auto"}
           style={{height: 'calc(100vh - 8rem)'}}>
        {
          messages.length === 0 ? <div className={"flex items-center justify-center text-4xl"}>AI聊天机器人</div> :
            <div>
              {messages.map((message, index) =>
                <ChatMessage key={index} {...message}/>
              )}
              {isLoading && <ChatMessage key={"loading"} role={"assistant"} isLoading={isLoading}/>}
            </div>
        }
        <div ref={scrollRef}/>
      </div>
    </div>
  );
}

export default Home

