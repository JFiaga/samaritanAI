import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";

const Navbar = () => {
  return (
    <nav className="flex items-center p-4">
      <Button variant={"ghost"} size={"icon"} className="md:hidden">
        <Menu />
      </Button>

      <div className="flex w-full justify-end">
        <UserButton afterSignOutUrl="/" />
      </div>
    </nav>
  );
};

export default Navbar;
