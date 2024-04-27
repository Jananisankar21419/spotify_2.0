"use client";
import useloadArtistImage from "@/hooks/useLoadArtistImages";
import { Artist } from "@/types";
import Image from "next/image";

interface ArtistItemProps {
  data: Artist;
  onClick: (id: string) => void;
}
const ArtistItem: React.FC<ArtistItemProps> = ({ data, onClick }) => {
  const imagePath = useloadArtistImage(data);
   
  const handleClick =(id: string) =>{
console.log(id);
onClick(data.id);
  };
  return (
    <div
      onClick={() => handleClick(data.id)}
      className="relative group flex flex-col items-center justify-center rounded-md overflow-hidden gap-4 bg-neutral-400/5 cursor-pointor hover:bg-neutral-400/5 transition p-2 "
    >
      <div className="relative aspect-square w-full h-full rounded-md overflow-hidden bg-neutral-400/5">
        <Image
          className="object-cover"
          fill
          src={imagePath || "/img/avatar.jpg"}
          alt={data.author}
        />
      </div>
      <p className="truncate w-full font-semibold text-center">
        {data?.author}
      </p>
    </div>
  );
};

export default ArtistItem;
