import Image from "next/image";
import React from "react";

const Empty = () => {
  return (
    <div className="flex flex-col relative h-full items-center justify-center ">
      <div className="relative h-72 w-72 ">
        <Image objectFit="cover" src="/empty.png" alt="nodata image" fill />
        
      </div>
      <span className="text-muted-foreground">No conversation started</span>
    </div>
  );
};

export default Empty;
