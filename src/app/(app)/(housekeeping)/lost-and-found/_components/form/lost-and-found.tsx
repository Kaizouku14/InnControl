"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { LostAndFoundSchema } from "../schema/schema";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Pencil } from "lucide-react";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import lostandfound from "@/app/assets/lost&found.jpg";
import RoomsComboBox from "./rooms";
// import SubmitButton from "@/components/forms/submit-button";

const LostAndFound = () => {
  const [userAvatar, setUserAvatar] = useState<File>();
  const [roomNo, setRoomNo] = useState<string>('')
  const [userAvatarUrl, setUserAvatarUrl] = useState<string>(lostandfound.src);

  const form = useForm<z.infer<typeof LostAndFoundSchema>>({
    resolver: zodResolver(LostAndFoundSchema),
    defaultValues: {
      item_lost: "",
      item_color: "",
      issued_date: new Date(),
    },
  });

  function onSubmit(values: z.infer<typeof LostAndFoundSchema>) {
      
    console.log(values);
    console.log(roomNo);
    console.log(userAvatar);

  }

  const handleChangeProfile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setUserAvatar(file);
      setUserAvatarUrl(URL.createObjectURL(file));
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 mr-8 md:mr-12"
      >
        <div className="grid md:grid-cols-2 items-center gap-4">
          <FormField
            control={form.control}
            name="item_lost"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <span>Lost Item</span>
                  <span className="text-red-500 ml-1">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Lost item..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="item_color"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <span>Item Color</span>
                  <span className="text-red-500 ml-1">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Lost item..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <Avatar className="size-56 relative">
            <AvatarImage src={userAvatarUrl} />
            <AvatarFallback></AvatarFallback>

            <div
              className="absolute right-1 bottom-1 bg-secondary rounded-full p-2 cursor-pointer"
              onClick={() => document.getElementById("profile-upload")?.click()}
            >
              <Pencil size={15} aria-hidden="true" />
              <input
                id="profile-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleChangeProfile}
              />
            </div>
          </Avatar>

          <div className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="issued_date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>
                    <span>Date Found</span>
                    <span className="text-red-500 ml-1">*</span>
                  </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button variant={"secondary"} className="shadow">
                          {field.value ? (
                            <span>{new Date(field.value).toDateString()}</span>
                          ) : (
                            <span>Check In Date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={new Date(field.value)}
                        onSelect={field.onChange}
                        disabled={(date: Date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-col gap-2 text-base">
              <Label>
                <span>Found in Room No.</span>
                <span className="text-red-500 ml-1">*</span>
              </Label>
              <RoomsComboBox value={roomNo} setValue={setRoomNo} />
            </div>
          </div>
        </div>

        <Button>Submit</Button>
      </form>
    </Form>
  );
};

export default LostAndFound;
