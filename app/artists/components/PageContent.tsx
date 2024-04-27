"use client";
import { Artist } from "@/types";
import ArtistItem from "./ArtistItem";

interface PageContentProps {
  artists: Artist[];
}

const PageContent: React.FC<PageContentProps> = ({ artists }) => {
  if (artists?.length === 0) {
    return (
      <div className="mt-4 text-neutral-400 w-full flex items-center justify-center">
        No artists data available
      </div>
    );
  }

  return (
    <div className="grid grid-col-2 md:grid-cols-3 lg:grid-col-4 xl:grid-cols-5 2xl:grid-col-8 mt-4 px-4 gap-4">
      {artists?.map((item) => (
        <ArtistItem key={item.id} onClick={() => {}} data={item} />
      ))}
    </div>
  );
};

export default PageContent;
