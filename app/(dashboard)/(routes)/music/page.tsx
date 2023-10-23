"use client";
import axios from "axios";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Music } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

import Heading from "@/components/heading";
import { formSchema } from "./constant";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Empty from "@/components/empty";
import Loading from "@/components/loading";


const MusicPage = () => {
  const router = useRouter();
  const [music, setMusic] = useState<string>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {

    try {
      setMusic(undefined)

      const response = await axios.post("api/music", values);

      setMusic(response.data.audio)
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
        title="Music Generation"
        description="Turn your prompt into music"
        Icon={Music}
        iconColor="text-green-500"
        bgColor="bg-green-500/20"
      />
      <div className="px-4 lg:px-8">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="rounded-lg border w-full p-4  md:px-6 focus-within:shadow-md focus-within:shadow-green-500/20  grid-cols-12 gap-2 grid"
          >
            <FormField
              name="prompt"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-10">
                  <FormControl className="m-0 p-0">
                    <Input
                      className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                      disabled={isLoading}
                      placeholder="Piano solo"
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
        {!music && !isLoading && (
          <Empty label="No music generated" imgSrc="/emptyMusic.png" />
        )}
        {music && (
          <audio controls className="w-full mt-8">
            <source src={music}/>
          </audio>
        )}
      </div>
    </div>
  );
};

export default MusicPage;
