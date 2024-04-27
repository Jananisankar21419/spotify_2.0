"use client";
import React, { useMemo } from "react";
import { twMerge } from "tailwind-merge";
import { FaSpotify } from "react-icons/fa6";
import { FaHome, FaSearch, FaHeart, FaUser, FaUsers } from "react-icons/fa";
import { usePathname } from "next/navigation";
import Box from "./Box";
import RightBar from "./RightBar";
import Button from "@/components/Button";
import SideBarItem from "./SideBarItem";
import Link from "next/link";
import { BsMusicNoteList } from "react-icons/bs";
import { GiImperialCrown } from "react-icons/gi";
import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import Image from "next/image";
import { CiLogout } from "react-icons/ci";
import { IoIosPersonAdd } from "react-icons/io";
import { TbMusicPlus } from "react-icons/tb";
import useArtistModal from "@/hooks/useArtistModal";

interface MainContainerProps {
  children: React.ReactNode;
}

const MainContainer: React.FC<MainContainerProps> = ({ children }) => {
  const pathName = usePathname();
  const authModal = useAuthModal();
  const supabaseClient = useSupabaseClient();

  const artistModal = useArtistModal();

  const { user } = useUser();

  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();
    router.refresh();

    if (error) {
      console.log(error);
    }
  };

  const routes = useMemo(
    () => [
      {
        icon: FaHome,
        label: "Home",
        active: pathName === "/",
        href: "/",
      },
      {
        icon: FaSearch,
        label: "Search",
        active: pathName === "Search",
        href: "/Search",
      },
      {
        icon: FaHeart,
        label: "Favourites",
        active: pathName === "/favourties",
        href: "/favourties",
      },
    ],
    [pathName]
  );

  return (
    <div className={twMerge(`flex h-full bg-black/40  backdrop-blur-md `, "")}>
      {/* left*/}
      <div className="flex h-full flex-col backdrop-blur-sm">
        <div className="w-full flex items-center gap-3 px-4 py-6">
          <FaSpotify className="text-4xl" />
          <p className="hidden md:block text-xl font-semibold">Spotify</p>
        </div>

        {/*routes*/}
        <div className="hidden md:flex flex-col gap-y-2 w-[300px] h-full">
          <Box>
            <div className="flex flex-col gap-4 py-4 px-4">
              {routes.map((item) => (
                <SideBarItem key={item.label} {...item} />
              ))}
            </div>
          </Box>
        </div>
        <div className="flex md:hidden transition flex-col items-center justify-center">
          <Box>
            <div className="flex flex-col gap-y-4 py-4 px-4">
              {routes.map((item) => (
                <SideBarItem key={item.label} {...item} />
              ))}
            </div>
          </Box>
        </div>
      </div>
      {/* main*/}
      <main className="flex-1 overflow-y-auto py-6 bg-black-40">
        {" "}
        {children}
      </main>
      {/* right*/}
      <RightBar>
        {/*user profile*/}
        {user ? (
          <div className="w-12 h-12 rounded-full bg-neutral-600 cursor-pointer flex items-center justify-center relative">
            {/* image of the authenticated or the first letter*/}
            {user?.user_metadata?.avatar_url ? (
              <Image
                src={user?.user_metadata?.avatar_url}
                alt=""
                fill
                className="w-full absolute h-full object-cover rounded-full"
              />
            ) : (
              <Image
                src="/img/avatar.jpg"
                alt=""
                fill
                className="w-full absolute h-full object-cover rounded-full"
              />
            )}
          </div>
        ) : (
          <Button onClick={authModal.onOpen}>
            <FaUser size={20} className="text-black" />
          </Button>
        )}

        {/*admin actions*/}
        <Link
          href={"/artists"}
          className="bg-transparent placeholder-zinc-200 py-2"
        >
          <FaUsers size={20} className="text-neutral-400 text-2xl" />
        </Link>

        <Link
          href={"/songs"}
          className="bg-transparent placeholder-zinc-200 py-2"
        >
          <BsMusicNoteList size={20} className="text-neutral-400 text-2xl" />
        </Link>

        {/* loading these option only if its matches the super admin id*/}
        {user?.id === process.env.NEXT_PUBLIC_SUPER_ADMIN_ID && (
          <React.Fragment>
            <Button className="bg-transparent" onClick={artistModal.onOpen}>
              <IoIosPersonAdd className="text-2xl text-neutral-400" />
            </Button>
            {/*  this button is for adding songs*/}
            <Button className="bg-transparent">
              <TbMusicPlus className="text-2xl text-neutral-400" />
            </Button>
          </React.Fragment>
        )}

        {/*premium user*/}
        <div className="flex flex-col items-center justify-center gap-y-2 mt-auto relative">
          <GiImperialCrown size={24} className="text-white" />
          <p className="whitespace-nowrap text-neutral-400 font-nornmal text-lg"></p>
          Go <span className="text-white"> Pro</span>
        </div>

        {user && (
          <Button className="bg-transparent" onClick={handleLogout}>
            <CiLogout size={25} className="text-neutral-400" />
          </Button>
        )}
      </RightBar>
      <div></div>
    </div>
  );
};

export default MainContainer;
