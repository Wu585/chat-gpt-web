import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet.tsx";
import {Menu} from "lucide-react";
import Sidebar from "@/components/Sidebar.tsx";

const MobileSidebar = () => {
  return (
    <Sheet>
      <SheetTrigger className={"md:hidden pr-4"}>
        <Menu/>
      </SheetTrigger>
      <SheetContent side={"left"} className={"p-0 bg-black pt-10 w-64 text-white"}>
        <Sidebar/>
      </SheetContent>
    </Sheet>
  );
}

export default MobileSidebar

