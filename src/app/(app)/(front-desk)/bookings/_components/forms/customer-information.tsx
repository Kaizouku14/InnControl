import React from "react";
import { useFormContext, UseFormReturn  } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any>;
};

const CustomerInformation: React.FC<Props> = ({ form }) => {
  return (
    <div className=" flex flex-col gap-4">
      <h1 className="text-xl font-bold py-1.5 border-b border-primary">
        Customer Information
      </h1>

      <div className="grid md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="last_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <span>Last Name</span>
                <span className="text-red-500 ml-1">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Last name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="first_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <span>First Name</span>
                <span className="text-red-500 ml-1">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="First name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <span>Email Address</span>
                <span className="text-red-500 ml-1">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Email address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="contact_no"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <span>Contact No.</span>
                <span className="text-red-500 ml-1">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="(+63) XXXX-XXX-XXX" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="address"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              <span>Address</span>
              <span className="text-red-500 ml-1">*</span>
            </FormLabel>
            <FormControl>
              <Input placeholder="Street Address, City, State ZIP" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default CustomerInformation;
