"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MessageSquare } from "lucide-react";

import Heading from "@/components/heading";
import { formSchema } from "./constant";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";


const ConversationPage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;
  const onSubmit = async (value: z.infer<typeof formSchema>) => {
    console.log(value);
  };
  return (
    <div className="flex flex-col space-y-5 pt-10">
      <Heading
        title="Conversation"
        description="Our most advanced conversation model"
        Icon={MessageSquare}
        iconColor="text-violet-500"
        bgColor="bg-violet-500/20"
      />
      <div className="px-4 lg:px-8">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-md focus-within:shadow-violet-500/20 gird grid-cols-12 gap-2 grid"
          >
            <FormField
              name="prompt"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-10">
                  <FormControl className="m-0 p-0">
                    <Input
                      className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                      disabled={isLoading}
                      placeholder="What is React js ?"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button className="col-span-12 lg:col-span-2 w-full"
            disabled={isLoading}>
              Generate
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ConversationPage;
