"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { formSchema } from "../schemas/SignInSchema";

export function DetailsDemo() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Title: "",
      Author: "",
      Year: "",
      Genre: "",
      Description: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className="mt-[-330px] ml-[250px]"> {/* Adjusted margin to move form up and right */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* TITLE Field */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-4">
                <FormLabel className="w-[100px] text-sm">Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter The Title of the Book..."
                    {...field}
                    className="w-[300px]" // Set specific width for input
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Author */}
          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-4">
                <FormLabel className="w-[100px] text-sm">Author</FormLabel>
                <FormControl>
                  <Input
                    type="string"
                    placeholder="Enter the name of Author..."
                    {...field}
                    className="w-[300px]" // Set specific width for input
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Year */}
          <FormField
            control={form.control}
            name="year"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-4">
                <FormLabel className="w-[100px] text-sm">Year</FormLabel>
                <FormControl>
                  <Input
                    type="Year"
                    placeholder="Enter the year of publish..."
                    {...field}
                    className="w-[300px]" // Set specific width for input
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Genre */}
          <FormField
            control={form.control}
            name="genre"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-4">
                <FormLabel className="w-[100px] text-sm">Genre</FormLabel>
                <FormControl>
                  <Input
                    type="string"
                    placeholder="Enter the Genre of Book..."
                    {...field}
                    className="w-[300px]" // Set specific width for input
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-4">
                <FormLabel className="w-[100px] text-sm">Description</FormLabel>
                <FormControl>
                  <Input
                    type="textarea"
                    placeholder="Enter the description of book..."
                    {...field}
                    className="w-[300px] h-[8rem]" // Set specific width for input
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Submit Button */}
          <div className="flex justify-center mt-4 ml-[-250px]">
            <Button
              type="submit"
              className="px-4 py-2 my-10 bg-white text-black border rounded hover:bg-black hover:text-white focus:ring focus:ring-blue-300 transition"
            >
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
