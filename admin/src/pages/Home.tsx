import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { _axios } from "@/lib/axios";
import { toast } from "sonner";
import { useEffect } from "react";

const formSchema = z.object({
  content: z.string({ message: "Content is required" }).min(1, {
    message: "Content is required",
  }),
});
const Home = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  });

  const { mutate } = useMutation({
    mutationKey: ["home"],
    mutationFn: (values: any) => {
      return _axios.post(`/api/homepage/create`, {
        content: values.content,
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
    queryKey: ["homeContent"],
    queryFn: async () => {
      return _axios.get(`/api/homepage/content`);
    },
  });

  useEffect(() => {
    if (data?.data?.data?.content) {
      form.setValue("content", data.data.data.content);
    }
  }, [data, form]);

  return (
    <>
      <div className='px-20 py-10'>
        <Card x-chunk='dashboard-04-chunk-1'>
          <CardHeader>
            <CardTitle>Home Section</CardTitle>
            <CardDescription>Add your home section here.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-4'>
                <FormField
                  control={form.control}
                  name='content'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          className='w-full focus-visible:ring-transparent'
                          placeholder='Home Section Content'
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

export default Home;
