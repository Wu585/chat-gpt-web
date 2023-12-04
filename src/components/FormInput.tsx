import {Input} from "@/components/ui/input.tsx";
import {Mic, SendHorizonal} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import {ChangeEvent, FC, FormEvent} from "react";

interface FormInputProps {
  input: string
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void
  onSubmit: (e: FormEvent<HTMLFormElement>) => void
  isLoading: boolean
}

const FormInput: FC<FormInputProps> = ({input, handleInputChange, onSubmit, isLoading}) => {

  return (
    <div className={"flex items-center  w-4/5 py-2 md:justify-center"}>
      <form onSubmit={onSubmit} className={"w-full md:w-3/4 h-12 flex relative items-center"}>
        <Button className={"bg-black text-white"}>换4.0</Button>
        <Mic className={"h-8 w-12 px-1 cursor-pointer"}/>
        <Input value={input} onChange={handleInputChange} disabled={isLoading}
               className={"h-full placeholder:text-primary flex-1 w-full"} placeholder={"您好，想问点什么?"}/>
        <Button className={"absolute right-2 top-1 cursor-pointer bg-black text-white"}>
          <SendHorizonal />
        </Button>
      </form>
    </div>
  );
}

export default FormInput

