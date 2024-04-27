import getArtists from "@/actions/getArtists";
import Header from "@/components/Header";
import PageContent from "./components/PageContent";
export const revalidate = 0;

const Artists = async () => {
  const artists = await getArtists();
  return (
    <div className="rounded-lg h-full w-full overflow-hidden overflow-y-auto">
      {/* Header */}
      <Header>
        <h2 className="my-4 text-xl font-bold text-neutral-400">
          Our Popular Artists
        </h2>
      </Header>

      {/*Page Contents*/}
      <div className="w-full flex-1">
        <PageContent artists={[]} />
      </div>
    </div>
  );
};

export default Artists;
