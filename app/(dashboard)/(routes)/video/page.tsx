"use client";
import axios from "axios";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Video } from "lucide-react";
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


const VideoPage = () => {
  const router = useRouter();
  const [video, setVideo] = useState<string>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {

    try {
      setVideo(undefined)

      const response = await axios.post("api/video", values);

      setVideo(response.data[0])
      form.reset();

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
        title="Video Generation"
        description="Turn your prompt into video"
        Icon={Video}
        iconColor="text-orange-500"
        bgColor="bg-orange-500/20"
      />
      <div className="px-4 lg:px-8">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="rounded-lg border w-full p-4  md:px-6 focus-within:shadow-md focus-within:shadow-orange-500/20  grid-cols-12 gap-2 grid"
          >
            <FormField
              name="prompt"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-10">
                  <FormControl className="m-0 p-0">
                    <Input
                      className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                      disabled={isLoading}
                      placeholder="clown fish swimming around a coral reef"
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
        {isLoading && <Loading />}
        {!video && !isLoading && (
          <Empty label="No video generated" imgSrc="/emptyVideo.png" />
        )}
        {video && (
          <video controls className="w-full mt-8 aspect-video rounded-lg border bg-black">
            <source src={video}/>
          </video>
        )}
      </div>
    </div>
  );
};

export default VideoPage;
