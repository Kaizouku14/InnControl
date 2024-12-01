"use client";

import { ChevronRight } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AccountForm from "./_components/forms/account-form";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import Dark from "./_components/theme/dark";
import Light from "./_components/theme/light";

const Page = () => {
  const theme = useTheme();

  return (
    <div className="flex flex-col p-1 w-full">
      <div className="flex items-center gap-x-1">
        <span className="font-medium">InnControl</span>
        <ChevronRight size={19} />
        <span className="font-medium">Settings</span>
      </div>
      <div className="flex-1 py-3 md:mr-8 mr-6 ">
        <Tabs defaultValue="settings" className="p-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="account" className=" mt-4">
            <div className="w-full ">
              <AccountForm />
            </div>
          </TabsContent>
          <TabsContent value="settings" className="mt-4 flex flex-col gap-4">
            <div className="h-20">
              <h3 className="text-lg font-medium">Appearance</h3>
              <p className="text-sm text-muted-foreground">
                Customize the appearance of the app. Automatically switch
                between day and night themes.
              </p>
            </div>

            <Separator />

            <h1>Theme</h1>
            <div>Select the theme for the dashboard.</div>
            <div className="md:w-96 md:ml-4 flex gap-x-4 justify-center">
              <Button
                className="h-fit bg-transparent text-primary hover:bg-transparent shadow-none"
                onClick={() => theme.setTheme("light")}
              >
                <Light />
              </Button>
              <Button
                className="h-fit bg-transparent text-primary hover:bg-transparent shadow-none"
                onClick={() => theme.setTheme("dark")}
              >
                <Dark />
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Page;
