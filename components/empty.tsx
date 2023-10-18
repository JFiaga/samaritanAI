import Image from "next/image";
import React from "react";


type props ={
  imgSrc:string,
  label:string
}
const Empty = ({imgSrc, label}:props) => {
  return (
    <div className="flex flex-col relative h-full items-center justify-center  ">
      <div className="relative h-72 w-72 ">
        <Image objectFit="cover" src={imgSrc} alt="nodata image" fill />
        
      </div>
      <span className="text-muted-foreground">{label}</span>
    </div>
  );
};

export default Empty;
