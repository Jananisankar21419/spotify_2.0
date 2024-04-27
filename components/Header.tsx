"use client";
import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import Button from "./Button";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

interface HeaderProps {
  children: React.ReactNode;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ children, className }) => {
  const router = useRouter();

  return (
    <div
      className={twMerge(
        "h-fit bg-gradient-to-b from-emerald-800 p-4",
        className
      )}
    >
      <div className="w-full mb-4 flex justify-between items-center">
        <div className="hidden md:flex gap-x-2 items-center">
          <Button
            className="rounded-full bg-black"
            onClick={() => router.back()}
          >
            <FaChevronLeft className="text-white text-lg" />
          </Button>

          <Button
            className="rounded-full bg-black"
            onClick={() => router.forward()}
          >
            <FaChevronRight className="text-white text-lg" />
          </Button>
        </div>
      </div>
{children}

    </div>
  );
};

export default Header;
