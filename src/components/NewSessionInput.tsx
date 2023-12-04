import {Plus} from "lucide-react";

const NewSessionInput = () => {
  return (
    <div className={"rounded-md py-3 border flex cursor-pointer px-4 items-center"}>
      <Plus className={"h-4 w-4"}/>
      <span className={"px-2 whitespace-nowrap"}>新会话</span>
    </div>
  );
}

export default NewSessionInput

