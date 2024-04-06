import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
let user:User

type User={
  username:string,
  password:string
}
function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate()
  const [error, setError] = useState("");
  const [message, setMessage] = useState("")
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
      const response = await fetch("http://localhost:8080/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        setMessage("Signup Failed");
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }

      // Login successful, handle the response (e.g., store authentication token)
      setMessage("Signup Successful");
      user = await response.json();
      console.log(user);
      navigate("/")


    } catch (error: any) {
      setMessage("Login Failed");
      setError(error.message);
    }
  };

  return (
    <div className="w-full h-full lg:grid  lg:grid-cols-1 ">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[400px] border-2 px-10 py-4 gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Sign up</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to create your account
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
              <Label htmlFor="Username">email</Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
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
              Sign up
            </Button>
            <Button variant="outline" className="w-full">
              Sign up with Google
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
             Have an account?{" "}
             <Link to='/auth/signin' className="underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>

      <div className="hidden bg-muted lg:block"></div>

    </div>
  );
}
export {Signup,user}