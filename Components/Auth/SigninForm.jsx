import React from "react";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  CardBody,
  CardFooter,
} from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useLogin } from "@/hooks/auth/useLogin";
import { FcGoogle } from "react-icons/fc";
import Image from "next/image";
import { useLoginGoogle } from "@/hooks/auth/useLoginGoogle";
import { useRouter } from "next/router";

function SignInForm() {
  const { login, isLoading } = useLogin();
  const { login: googleLogin, isLoading: isLoading2 } = useLoginGoogle();
  const { register, handleSubmit, reset } = useForm();
  const router = useRouter();
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
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <Card className="mt-6 w-120">
          <CardBody>
            <Typography
              variant="h3"
              color="blue-gray"
              className="mb-5 flex text-center items-center justify-center"
            >
              <span>
                <Image src="/shipping.png" alt="Logo" width="40" height="40" />
              </span>
              <span>LETSBUILD</span>
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
              <Button className="mt-3" fullWidth type="submit">
                Login
              </Button>
              <Typography
                variant="small"
                color="gray"
                className="mt-4 text-center font-normal"
              >
                Dont have any account?{" "}
                <Link href="/auth/signUp" className="font-medium text-blue-500">
                  Sign Up
                </Link>
              </Typography>
              <Typography variant="small" className="text-center">
                <Link href="/auth/reset" className="font-medium text-blue-500">
                  Forgot password
                </Link>
              </Typography>
            </form>
          </CardBody>
          <CardFooter className="pt-2 flex items-center justify-center">
            <Button className="flex items-center" onClick={googleLogin}>
              <span className="mr-2">
                <FcGoogle />
              </span>
              <span>Login with Google</span>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}

export default SignInForm;
