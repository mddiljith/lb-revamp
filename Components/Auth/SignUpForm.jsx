import React from "react";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  CardBody,
  CardFooter
} from "@material-tailwind/react";
import Link from "next/link";
import { useSignup } from "@/hooks/auth/useSignup";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";

function SignUpForm() {
  const { signup, isLoading } = useSignup();
  const router = useRouter();
  const { register, handleSubmit, formState, getValues, reset } = useForm();
  const { errors } = formState;
  const errorMessage =
    errors?.name?.message ||
    errors?.email?.message ||
    errors?.password?.message ||
    errors?.passwordConfirm?.message;

  const onSubmit = ({ full_name, email, password }) => {
    console.log(full_name, email, password);
    signup(
      { full_name, email, password },
      {
        onSettled: () => {
          reset();
        },
      }
    );
  };

  // Email regex: /\S+@\S+\.\S+/

  return (
    <>
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <Card className="mt-6 w-120">
      <CardBody>
        <Typography variant="h3" color="blue-gray" className="mb-5 flex text-center items-center justify-center" >
          <span><Image src='/shipping.png' alt="Logo" width="40" height="40"/></span>
          <span>LETSBUILD</span>
        </Typography>
        <form
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mb-4 flex flex-col gap-6">
            <Input
              size="lg"
              type="text"
              label="Name"
              disabled={isLoading}
              error={errors?.fullname?.message}
              {...register("full_name", { required: "This field is required" })}
            />
            <Input
              size="lg"
              type="email"
              label="Email"
              disabled={isLoading}
              error={errors?.email?.message}
              {...register("email", {
                required: "This field is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Please provide a valid email address",
                },
              })}
            />
            <Input
              type="password"
              size="lg"
              label="Password"
              disabled={isLoading}
              error={errors?.password?.message}
              {...register("password", {
                required: "This field is required",
                minLength: {
                  value: 8,
                  message: "Password needs a minimum of 8 characters",
                },
              })}
            />

            <Input
              type="password"
              size="lg"
              id="passwordConfirm"
              label="Confirm Password"
              disabled={isLoading}
              error={errors?.passwordConfirm?.message}
              {...register("passwordConfirm", {
                required: "This field is required",
                validate: (value) =>
                  value === getValues().password || "Passwords need to match",
              })}
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
              required: "Acknowledge Terms & conditions",
            })}
          />

          {errors && (
            <Typography variant="small" color="gray">
              {errorMessage}
            </Typography>
          )}

          <Button className="mt-3" type="submit" fullWidth disabled={isLoading}>
            Register
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Already have an account?{" "}
            <Link href="/auth/login" className="font-medium text-blue-500">
              Sign In
            </Link>
          </Typography>
        </form> 
      </CardBody>
      <CardFooter className="pt-2 flex items-center justify-center">
        <Button className="flex items-center">
          <span className="mr-2"><FcGoogle /></span>
          <span>Login with Google</span>
        </Button>
      </CardFooter>
    </Card>


      {/* <Card className="mt-6 w-120">
        <Typography variant="h4" color="blue-gray">
          Sign Up
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Enter your details to register.
        </Typography>
        
      </Card> */}
    </div>
    </>
  );
}

export default SignUpForm;
