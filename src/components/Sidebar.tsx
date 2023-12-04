import UserAvatar from "@/components/UserAvatar.tsx";
import NewSessionInput from "@/components/NewSessionInput.tsx";
import Features from "@/components/Features.tsx";

const Sidebar = () => {
  return (
    <div className={"h-full rounded-l-lg text-white bg-black flex flex-col items-center"}>
      <div className={"py-8"}>
        <UserAvatar hasText/>
      </div>
      <div className={"w-full px-2"}>
        <NewSessionInput/>
      </div>
      <div className={"fixed bottom-0 left-0"}>
        <Features/>
      </div>
    </div>
  );
}

export default Sidebar

