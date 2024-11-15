import LoginForm from "../_components/forms/login-form";
import { ModeToggle } from "@/components/theme-provider/mode-toggler";
import { FolderKanban } from "lucide-react";

const Page = () => {
  return (
    <div className="relative h-screen grid md:grid-cols-2 items-center md:mx-[75px]">
      <div className="absolute right-3  md:right-0 top-5">
        <ModeToggle />
      </div>

      <div className="hidden md:flex flex-col gap-y-8 justify-center h-full px-12 ">
        <div className="flex flex-col">
          <FolderKanban size={35} />
          <h1 className="text-2xl font-bold">InnControl</h1>
          <p className="text-sm text-gray-400 ">Manage operations with ease. </p>
        </div>

        <div className=" text-lg ">
          A hotel management system that streamlines booking, room
          management, housekeeping, and inventory, helping staff efficiently
          manage operations with ease.
        </div>

        <span className="text-gray-400 mt-10"></span>
      </div>

      <div className="flex justify-center">
        <LoginForm />
      </div>
    </div>
  );
};

export default Page;
