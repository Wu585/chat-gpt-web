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
  const [currentData, setCurrentData] = useState('')

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const scrollRef = useRef<ElementRef<"div">>(null)

  useEffect(() => {
    scrollRef?.current?.scrollIntoView({behavior: "smooth"})
  }, [messages.length])

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setMessages((current) => [...current, {content: value, role: "user"}])
    setLoading(true)
    setCurrentData('')
    /*const res1 =  axios.get(`api/chat/connect/12`).then(res=>{
      axios.get(`api/chat/push_one/12?message=${value}`).then(res=>{
        console.log('222')
      })
    })*/

    /*axios.get(`api/chat/stream?id=12&prompt=${value}`, {
      responseType: "blob"
    }).then((res) => {
      console.log('res');
      console.log(res);
      // setMessages((current) => [...current, res.data])
      // setLoading(false)
    }).catch(() => {
      setLoading(false)
      toast({description: "出错了，请重新输入！", variant: "destructive"})
    })*/
    // const eventSource = new EventSource(`api/chat/stream?id=12&prompt=${value}`);
    const eventSource = new EventSource(`http://localhost:3000/sse`);
    eventSource.addEventListener('open', () => {
      console.log("建立连接。。。");
      setMessages((pre) => [...pre, {content: '', role: "assistant"}])
      setLoading(true)
    }, false)
    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data).message
      setCurrentData(prev => prev + data)
      setLoading(false)
    }
    eventSource.onerror = (e) => {
      console.log('连接关闭')
      console.log(e)
    }
    setValue('')
  }

  useEffect(() => {
    const data = [...messages]
    const last = data[data.length - 1]
    if (last) {
      last.content = currentData
    }
    setMessages(data)
  }, [currentData])

  return (
    <div className={"h-screen bg-secondary"}>
      <MobileSidebar/>
      <div className={"hidden md:flex w-64 flex-col fixed inset-y-0 z-10"}>
        <Sidebar/>
      </div>
      <div className={"w-full border md:left-32 fixed bottom-0 flex items-center justify-center bg-secondary"}>
        <FormInput input={value} handleInputChange={handleInputChange} onSubmit={onSubmit} isLoading={false}/>
      </div>
      <div className={"border-solid border-r-amber-400 relative top-0 md:pl-72 md:pr-4 py-2 overflow-auto"}
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

