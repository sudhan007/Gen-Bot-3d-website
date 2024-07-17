import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import loginimage from "/loginimage.jpg";
export function LoginForm() {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleLogin = () => {
    if (
      formValues.email === "admin@gmail.com" &&
      formValues.password === "admin"
    ) {
      localStorage.setItem("isLogin", "true");
      toast.success("Login Successful");
      navigate("/dashboard");
    } else {
      toast.error("Login Failed");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("isLogin") == "true") {
      navigate("/dashboard");
    }
  }, []);
  return (
    <div className="w-full lg:grid h-screen lg:grid-cols-2">
      <div className="flex items-center justify-center">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-4">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@gmail.com"
                required
                onChange={(e: any) => {
                  setFormValues({
                    ...formValues,
                    email: e.target.value,
                  });
                }}
                className="focus-visible:ring-transparent font-semibold"
              />
            </div>
            <div className="grid gap-4">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                className="focus-visible:ring-transparent"
                id="password"
                type="password"
                required
                onChange={(e: any) => {
                  setFormValues({
                    ...formValues,
                    password: e.target.value,
                  });
                }}
              />
            </div>
            <Button
              onClick={() => handleLogin()}
              type="submit"
              className="w-full mt-5"
            >
              Login
            </Button>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block h-screen">
        <img src={loginimage} alt="" className="object-cover w-full h-full" />
      </div>
    </div>
  );
}
