import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { _axios } from "@/lib/axios";
import { toast } from "sonner";
import { useEffect } from "react";

const formSchema = z.object({
  title: z.string({ message: "Title is required" }).min(1, {
    message: "Title is required",
  }),
  content: z.string({ message: "Content is required" }).min(1, {
    message: "Content is required",
  }),
});
const FutureTech = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const { mutate } = useMutation({
    mutationKey: ["futuretech"],
    mutationFn: (values: any) => {
      return _axios.post(`/api/futuretech/create`, {
        content: values.content,
        title: values.title,
      });
    },
    onSuccess: (data: any) => {
      if (data.status === 200) {
        toast.success(data?.data?.message);
      } else {
        toast.error(data?.data?.message);
      }
    },
    //@ts-ignore
    onError: (error: any) => {
      toast.error("Something went wrong");
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate(values);
  }

  const { data } = useQuery({
    queryKey: ["futuretechcontent"],
    queryFn: async () => {
      return _axios.get(`/api/futuretech/content`);
    },
  });

  useEffect(() => {
    if (data?.data?.data?.content && data?.data?.data?.title) {
      form.setValue("content", data?.data?.data?.content);
      form.setValue("title", data?.data?.data?.title);
    }
  }, [data, form]);

  return (
    <>
      <div className='px-20 py-10'>
        <Card x-chunk='dashboard-04-chunk-1'>
          <CardHeader>
            <CardTitle> Future-Tech Section</CardTitle>
            <CardDescription>Add your content here.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-4'>
                <FormField
                  control={form.control}
                  name='title'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input
                          className='focus-visible:ring-transparent'
                          placeholder=''
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='content'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Content</FormLabel>
                      <FormControl>
                        <Textarea
                          className='w-full focus-visible:ring-transparent'
                          placeholder='About Section Content'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type='submit'>save</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default FutureTech;
