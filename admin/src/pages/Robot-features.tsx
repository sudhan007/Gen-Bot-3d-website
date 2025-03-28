import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
// import { Textarea } from "@/components/ui/textarea";
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
  records: z
    .array(
      z.object({
        title: z.string().min(1, { message: "Title is required" }),
        content: z.string().default("test"), // Set default value as "test"
      })
    )
    .length(13, { message: "Exactly 13 records are required" }),
});

const Robotfeatures = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      records: Array(13).fill({ title: "", content: "test" }),
    },
  });

  const { mutate } = useMutation({
    mutationKey: ["robot-features"],
    mutationFn: (values: any) => {
      return _axios.post(`/api/robotfeatures/create`, {
        records: values.records,
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
    queryKey: ["robot-features"],
    queryFn: async () => {
      return _axios.get(`/api/robotfeatures/content`);
    },
  });

  useEffect(() => {
    if (data?.data?.data?.length > 0) {
      form.setValue(
        "records",
        data?.data?.data.length >= 13
          ? data?.data?.data
          : [...data?.data?.data, ...Array(13 - data?.data?.data.length).fill({ title: "", content: "" })]
      );
    } else {
      form.setValue("records", Array(13).fill({ title: "", content: "" })); // Changed from 5 to 7
    }
  }, [data, form]);

  return (
    <>
      <div className='px-20 py-10 '>
        <div className='h-[calc(100vh-200px)] robotic-intelligence overflow-y-scroll' style={{ border : '1px solid #dbdbdb' }}>
          <Card x-chunk='dashboard-04-chunk-1'>
            <CardHeader>
              <CardTitle>Robot Features</CardTitle>
              <CardDescription>Add your content here.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className='space-y-4'>
                  {form.watch("records").map((_, index) => (
                    <div key={index} className='mb-4 p-4 border rounded'>
                      <FormField
                        control={form.control}
                        name={`records.${index}.title`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Title {index + 1}</FormLabel>
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
              
                    </div>
                  ))}
                  <Button type='submit'>Save All</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Robotfeatures;
