import React from "react";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useLogin } from "@/hooks/auth/useLogin";
import { FcGoogle } from "react-icons/fc";

function SignInForm() {
  const { login, isLoading } = useLogin();
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = ({ email, password }) => {
    if (!email || !password) return;
    console.log(email);
    login(
      { email, password },
      {
        onSettled: () => reset(),
      }
    );
  };

  return (
    <Card color="transparent" shadow={false}>
      <Typography variant="h4" color="blue-gray">
        Sign In
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        Enter your details to register.
      </Typography>
      <form
        className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mb-4 flex flex-col gap-6">
          <Input
            size="lg"
            label="Email"
            {...register("email")}
            disabled={isLoading}
          />
          <Input
            type="password"
            size="lg"
            label="Password"
            disabled={isLoading}
            {...register("password")}
          />
        </div>
        <Checkbox
          label={
            <Typography
              variant="small"
              color="gray"
              className="flex items-center font-normal"
            >
              I agree the
              <Link
                href="#"
                className="font-medium transition-colors hover:text-gray-900"
              >
                &nbsp;Terms and Conditions
              </Link>
            </Typography>
          }
          containerProps={{ className: "-ml-2.5" }}
          disabled={isLoading}
          {...register("terms-conditions", {
            required: "This field is required",
          })}
        />
        <Button className="mt-6" fullWidth type="submit">
          Login
        </Button>
        <Typography color="gray" className="mt-4 text-center font-normal">
          you dont have any account?{" "}
          <Link href="/auth/signUp" className="font-medium text-gray-900">
            Sign Up
          </Link>
        </Typography>
      </form>

      <div>
        <Button>
          <FcGoogle />
          <span> Login with Google</span>
        </Button>
      </div>
    </Card>
  );
}

export default SignInForm;
