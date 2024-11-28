"use client";

import React, { useState } from "react";
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
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import SubmitButton from "@/components/forms/submit-button";
import { calculateNights, calculateTotalPrice } from "@/lib/utils";
import { api } from "@/app/_trpc/client";
import { toast } from "sonner";
import PriceSummary from "./price-summary";
import CustomerInformation from "./customer-information";

type Props = {
  refetch: (options?: {
    throwOnError: boolean;
    cancelRefetch: boolean;
  }) => Promise<unknown>,
};

const BookingForm = ({ refetch }: Props) => {
  const [totalNights, setTotalNights] = useState<number>(1);
  const [roomPrice, setRoomPrice] = useState<number>(0);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [additionalService, setAdditionalService] = useState<
    string | undefined
  >(undefined);
  const [roomType, setRoomType] = useState<
    "SR Deluxe" | "SR Prime" | "SR Premier" | "ER 1 Bed Room" | "ER 2 Bed Room"
  >("SR Deluxe");
  const [bookingType, setBookingType] = useState<string>("");
  const [originalAmount, setOriginalAmount] = useState<number>(0);
  const [discount, setDiscount] = useState<boolean>(false);

  const form = useForm<z.infer<typeof bookingSchema>>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      room_no: "",
      room_type: "SR Deluxe",
      last_name: "",
      first_name: "",
      email: "",
      contact_no: "",
      address: "",
      check_in: new Date(),
      check_out: undefined,
      additional_services: undefined,
      booking_type: undefined,
      payment_method: undefined,
      discount: undefined,
    },
  });

  const bookingMutation = api.bookings.createBooking.useMutation();
  const { data } = api.rooms.getRoomNo.useQuery({
    room_type: roomType,
  });

  const handlePriceRecalculation = () => {
    const checkIn = form.getValues("check_in");
    const checkOut = form.getValues("check_out");
    const roomType = form.getValues("room_type");
    const additionalService = form.getValues("additional_services");
    const discount = form.getValues("discount");
    const bookingType = form.getValues("booking_type");

    const totalNights = calculateNights(checkIn, checkOut);
    const { originalAmount, roomPrice, totalAmount } = calculateTotalPrice(
      roomType,
      totalNights,
      additionalService,
      bookingType,
      discount
    );

    setRoomType(
      roomType as
        | "SR Deluxe"
        | "SR Prime"
        | "SR Premier"
        | "ER 1 Bed Room"
        | "ER 2 Bed Room"
    );    
    setAdditionalService(additionalService);
    setBookingType(bookingType);
    setRoomPrice(roomPrice);
    setOriginalAmount(originalAmount);
    setTotalAmount(totalAmount);
    setTotalNights(totalNights);
    setDiscount(!!discount);
  };

  function onSubmit(values: z.infer<typeof bookingSchema>) {
    toast.promise(
      bookingMutation.mutateAsync({
        ...values,
        no_of_nights: totalNights,
        payment_amount: totalAmount,
      }),
      {
        loading: "registering...",
        success: () => {
          form.reset();
          refetch();
          return "booked successfully";
        },

        error: (error: unknown) => {
          return (error as Error).message;
        },
      }
    );
  }

  const noRoomAvailable = !data?.some((roomNo) => roomNo);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className=" flex flex-col gap-4 ">
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
                    onValueChange={(value) => {
                      field.onChange(value);
                      handlePriceRecalculation();
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
              name="room_no"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <span>Room No.</span>
                    <span className="text-red-500 ml-1">*</span>
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={noRoomAvailable}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Room No." />
                      </SelectTrigger>
                    </FormControl>
                    {data && data.length > 0 && (
                      <SelectContent>
                        {data
                          .filter(
                            (roomNo: string) => roomNo !== "Select room No."
                          )
                          .map((roomNo: string) => (
                            <SelectItem key={roomNo} value={roomNo}>
                              {roomNo}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    )}
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="check_in"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>
                    <span>Check In Date</span>
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
                        disabled={(date: { getTime: () => number }) =>
                          date.getTime() < new Date().setHours(0, 0, 0, 0)
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="check_out"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>
                    <span>Check Out Date</span>
                    <span className="text-red-500 ml-1">*</span>
                  </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button variant={"secondary"} className="shadow">
                          {field.value ? (
                            <span>{new Date(field.value).toDateString()}</span>
                          ) : (
                            <span>Check Out Date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={new Date(field.value)}
                        onSelect={(value: unknown) => {
                          field.onChange(value);
                          handlePriceRecalculation();
                        }}
                        disabled={(date: { getTime: () => number }) =>
                          date.getTime() < new Date().setHours(0, 0, 0, 0)
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="booking_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <span>Booking Type</span>
                    <span className="text-red-500 ml-1">*</span>
                  </FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      handlePriceRecalculation();
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select booking type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Walk-in">Walk-in</SelectItem>
                      <SelectItem value="Online">Online</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="payment_method"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <span>Payment Type</span>
                    <span className="text-red-500 ml-1">*</span>
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select payment type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Cash">Cash</SelectItem>
                      <SelectItem value="Credit-card">Credit Card</SelectItem>
                      <SelectItem value="E-Cash">E-Cash</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="additional_services"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Service</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      handlePriceRecalculation();
                    }}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select additional service" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Breakfast">Breakfast</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="discount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Discount</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      handlePriceRecalculation();
                    }}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select discount" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="pwd">PWD</SelectItem>
                      <SelectItem value="senior">Senior</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <PriceSummary
            bookingType={bookingType}
            totalNights={totalNights}
            additionalService={additionalService}
            originalAmount={originalAmount}
            roomPrice={roomPrice}
            totalAmount={totalAmount}
            discount={discount}
          />
        </div>

        <CustomerInformation form={form} />

        <SubmitButton mutation={bookingMutation}>Submit</SubmitButton>
      </form>
    </Form>
  );
};

export default BookingForm;
