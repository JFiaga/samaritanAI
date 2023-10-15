"use client"

import { Menu } from "lucide-react";

import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import Sidebar from "./sidebar";
import { useEffect, useState } from "react";

const MobileSidebar = () => {
    // To prevent an error with pre rendered html
    
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if(!isMounted) return null


  return (
    <Sheet>
      <SheetTrigger>
        <Button variant={"ghost"} size={"icon"} className="md:hidden group">
          <Menu className="text-white group-hover:text-gray-900"/>
        </Button>
      </SheetTrigger>
      <SheetContent side={"left"} className="p-0 text-white"  >
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
