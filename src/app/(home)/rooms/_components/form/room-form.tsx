"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getRoomPrice } from "@/lib/utils";
import { useState } from "react";
import { api } from "@/app/_trpc/client";
import { toast } from "sonner";
import SubmitButton from "@/components/forms/submit-button";
import { createRoomSchema } from "../../schema/room-form-schema";

const RoomForm = () => {
  const [roomPrice, setRoomPrice] = useState<number>(3500);
  const [roomPax, setRoomPax] = useState<number>(2);

  const form = useForm<z.infer<typeof createRoomSchema>>({
    resolver: zodResolver(createRoomSchema),
    defaultValues: {
      room_no: "",
      type: "SR Deluxe",
      floor: "",
    },
  });

  const roomMutation = api.rooms.createRoom.useMutation();
  function onSubmit(values: z.infer<typeof createRoomSchema>) {

    toast.promise(roomMutation.mutateAsync({
        ...values,
        rate : roomPrice,
        capacity : roomPax,
    }), {
      loading: "creating room...",
      success: () => {
        return "Room created successfully";
      },
      error: (error: unknown) => {
        return (error as Error).message;
      },
    });
  }

  const getRoomPax = (value: string) => value === "ER 2 Bed Room" ? 4 : 2;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" space-y-4 border-b py-4"
      >
        <div className="grid grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="room_no"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Room No.</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Room No." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <span>Room Type</span>
                  <span className="text-red-500 ml-1">*</span>
                </FormLabel>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    setRoomPrice(getRoomPrice(value));
                    setRoomPax(getRoomPax(value));
                  }}
                  defaultValue={"SR Deluxe"}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="SR Deluxe">SR - Deluxe</SelectItem>
                    <SelectItem value="SR Prime">SR - Prime</SelectItem>
                    <SelectItem value="SR Premier">SR - Premier</SelectItem>
                    <SelectItem value="ER 1 Bed Room">
                      ER - 1 Bed Room
                    </SelectItem>
                    <SelectItem value="ER 2 Bed Room">
                      ER - 2 Bed Room
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="floor"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Room Floor</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Room floor" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div>
            <div className="flex justify-between">
              <span className="font-bold text-sm">Room Capacity :</span>
              <span className="font-medium text-sm">{roomPax} person</span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold text-sm">Room Rate :</span>
              <span className="font-medium text-sm">{roomPrice}</span>
            </div>
          </div>
        </div>

        <SubmitButton mutation={roomMutation}>Add Room</SubmitButton>
      </form>
    </Form>
  );
};

export default RoomForm;
