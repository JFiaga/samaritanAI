"use client";
import axios from "axios";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MessageSquare } from "lucide-react";
import { useState } from "react";
import ChatCompletionRequestMessage from "openai";
import { useRouter } from "next/navigation";

import Heading from "@/components/heading";
import { formSchema } from "./constant";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Empty from "@/components/empty";
import Loading from "@/components/loading";
import UserAvatar from "@/components/user-avatar";
import SamaritanAvatar from "@/components/samaritan-avatar";
import { cn } from "@/lib/utils";

const ConversationPage = () => {
  const router = useRouter();
  const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const userMessage: any = {
        role: "user",
        content: values.prompt,
      };
      const newMessages = [...messages, userMessage];

      const response = await axios.post("api/conversation", {
        messages: newMessages,
      });
      setMessages((current) => [...current, userMessage, response.data]);

form.reset()
    } catch (error) {
      //add premium modal
      console.log(error);
    } finally {
      router.refresh();
    }
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
            className="rounded-lg border w-full p-4  md:px-6 focus-within:shadow-md focus-within:shadow-violet-500/20  grid-cols-12 gap-2 grid"
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

            
            <Button
              className="col-span-12 lg:col-span-2 w-full"
              disabled={isLoading}
            >
              Generate
            </Button>
          </form>
        </Form>
      </div>
      <div className="space-y-4 mt-4">
        {isLoading && <Loading/>}
        {messages.length === 0 && !isLoading ? <Empty label="No conversation started" imgSrc="/emptyConversation.png"/> : null}
        <div className="flex flex-col-reverse space-y-8 px-6 md:pl-8">
          {messages.map((message: any) => (
            <div
              key={message.content}
              className={cn("flex  justify-start items-start p-4  break-words rounded-lg my-4 space-x-2", message.role==="user" ? 'bg-violet-500/10' : 'border bg-muted')}
            >
              {message.role === "user" ? <UserAvatar/> : <SamaritanAvatar/> }
              <p className="text-sm ">{message.content}</p>
              
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConversationPage;
