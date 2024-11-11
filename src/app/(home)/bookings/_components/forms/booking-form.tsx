"use client";

import React from "react";
import { bookingSchema } from "../schema/schema";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";

const BookingForm = () => {
  const form = useForm<z.infer<typeof bookingSchema>>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      room_no: "",
      room_type: "",
      last_name: "",
      first_name: "",
      email: "",
      contact_no: "",
      address: "",
      checkin_date: "",
      checkout_date: "",
      number_of_nights: 0,
      additional_service: "",
      booking_type: "",
    },
  });

  function onSubmit(values: z.infer<typeof bookingSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p">
        <div className="h-96 flex flex-col gap-4">
          <h1 className="text-xl font-bold py-1.5 border-b border-primary">
            Room Information
          </h1>

          <div className="grid md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="room_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <span>Room Type</span>
                    <span className="text-red-500 ml-1">*</span>
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select room type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="SR - Deluxe">SR - Deluxe</SelectItem>
                      <SelectItem value="SR - Prime">SR - Prime</SelectItem>
                      <SelectItem value="SR - Premier">SR - Premier</SelectItem>
                      <SelectItem value="ER - 1 Bed Room">
                        ER - 1 Bed Room
                      </SelectItem>
                      <SelectItem value="ER - 2 Bed Room">
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
              name="room_no"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <span>Room No.</span>
                    <span className="text-red-500 ml-1">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="x-999" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
           
          </div>
        </div>

        {/* <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <span>Email Address</span>
                <span className="text-red-500 ml-1">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Email Address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}

        {/* <SubmitButton mutation={loginMutation}>Login</SubmitButton> */}
      </form>
    </Form>
  );
};

export default BookingForm;
