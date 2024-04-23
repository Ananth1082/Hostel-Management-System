import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";
let user: User;

type User = {
  username: string;
  password: string;
};
function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleLogin = async (e: any) => {
    e.preventDefault();
    console.log(formData);
    console.log(JSON.stringify(formData));

    try {
      const response = await fetch("http://localhost:8080/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }
      // Login successful, handle the response (e.g., store authentication token)
      user = await response.json();
      console.log(user);
      sessionStorage.setItem("user", JSON.stringify(user));
      navigate("/");
      toast.success("Login was successfull", {
        action: {
          label: "Close",
          onClick: () => console.log("Done"),
        },
      });
    } catch (error: any) {
      setError(error.message);
      console.log(error.message);
      toast.warning("Incorrect details", {
        description: "Username or password entered was incorrect",
        action: {
          label: "Close",
          onClick: () => console.log("Retry"),
        },
      });
    }
  };

  return (
    <>
      <div className="w-full h-full lg:grid  lg:grid-cols-1 ">
        <div className="flex items-center justify-center py-12">
          <div className="mx-auto grid w-[400px] gap-6 px-10 py-10 border-2">
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold">Login</h1>
              <p className="text-balance text-muted-foreground">
                Enter your email below to login to your account
              </p>
            </div>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="Username">Username</Label>
                <Input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="/forgot-password"
                    className="ml-auto inline-block text-sm underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <Button className="w-full" type="submit" onClick={handleLogin}>
                Login
              </Button>
              <Button variant="outline" className="w-full">
                Login with Google
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link to="/auth/signup" className="underline">
                Sign up
              </Link>
            </div>
          </div>
        </div>

        <div className="hidden bg-muted lg:block"></div>
      </div>
      <Toaster position="top-center" />
    </>
  );
}

export { Login, user };
