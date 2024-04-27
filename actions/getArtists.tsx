import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Artist } from "@/types";
import { cookies } from "next/headers";

//here, we get the artist info
const getArtists = async (): Promise<Artist[]> => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  //fetching data from supabase
  const { data, error } = await supabase
    .from("artist")
    .select("*")
    .order("created at", { ascending: false });

  if (error) {
    console.log(error);
  }
  return (data as any) || [];
};
export default getArtists;
