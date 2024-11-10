import LoginForm from "@/components/forms/auth/login-form";
import { ModeToggle } from "@/components/theme-provider/mode-toggler";
import { FolderKanban } from "lucide-react";

export default function Home() {
  return (
    <div className="relative h-screen grid md:grid-cols-2 items-center md:mx-[75px]">
      <div className="absolute right-3  md:right-0 top-5">
        <ModeToggle />
      </div>

      <div className="hidden md:flex flex-col gap-y-8 justify-center h-full px-12 ">
        <div className="flex flex-col">
          <FolderKanban size={35} />
          <h1 className="text-2xl font-bold">Project Name</h1>
          <p className="text-sm text-gray-400 ">Lorem ipsum, dolor </p>
        </div>

        <div className=" text-lg ">
          Task Manager simplifies organizing your daily tasks and tracking your
          progress. you can easily prioritize and complete tasks efficiently.
        </div>

        <span className="text-gray-400 mt-10"></span>
      </div>

      <div className="flex justify-center">
        <LoginForm />
      </div>
    </div>
  );
}
