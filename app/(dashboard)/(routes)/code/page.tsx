"use client";

import axios from "axios";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Code } from "lucide-react";
import { useState } from "react";
import ChatCompletionRequestMessage from "openai";
import { useRouter } from "next/navigation";
import ReactMarkdown  from 'react-markdown'

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

const CodePage = () => {
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

      const response = await axios.post("api/code", {
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
        title="Code Generation"
        description="Our most advanced code generator model"
        Icon={Code}
        iconColor="text-blue-500"
        bgColor="bg-blue-500/20"
      />
      <div className="px-4 lg:px-8">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="rounded-lg border w-full p-4  md:px-6 focus-within:shadow-md focus-within:shadow-blue-500/20  grid-cols-12 gap-2 grid"
          >
            <FormField
              name="prompt"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-10">
                  <FormControl className="m-0 p-0">
                    <Input
                      className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                      disabled={isLoading}
                      placeholder="Simple toggle button using vue js"
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
        {messages.length === 0 && !isLoading ? <Empty label="No code generated" imgSrc='/emptyCode.png'/> : null}
        <div className="flex flex-col-reverse space-y-8 px-6 md:pl-8">
          {messages.map((message: any) => (
            <div
              key={message.content}
              className={cn("flex  justify-start items-start p-4  break-words rounded-lg my-4 space-x-2", message.role==="user" ? 'bg-blue-500/10' : 'border bg-muted')}
            >
              {message.role === "user" ? <UserAvatar/> : <SamaritanAvatar/> }
              <ReactMarkdown
              components={{pre:({node, ...props}) => (
              <div className="overflow-auto w-full my-2 bg-black/10 rounded-lg">
                <pre {...props}/>
              </div>
              ),
            code:({node, ...props}) => (
              <code className="bg-black/10 rounded-lg p-1" {...props}/>
            )
            }}
              className="text-sm overflow-hidden leading-7">{message.content|| ""}</ReactMarkdown>
              
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CodePage;
