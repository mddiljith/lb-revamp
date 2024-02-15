import {
  Button,
  Card,
  CardBody,
  Input,
  Typography,
} from "@material-tailwind/react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";

function Changepassword() {
  const supabase = useSupabaseClient();
  const { register, handleSubmit, formState, getValues } = useForm();
  const router = useRouter();
  const { errors } = formState;

  const onSubmit = async ({ password }) => {
    console.log('ONLCIK')
    const { data, error } = await supabase.auth.updateUser({ password });

    if (data) {
      router.push("/");
    } else {
      console.log('Password not reset')
    }
    if (error) {
      console.log(error);
    }
  };

  return (
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
                type="password"
                size="lg"
                label="Password"
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
                error={errors?.passwordConfirm?.message}
                {...register("passwordConfirm", {
                  required: "This field is required",
                  validate: (value) =>
                    value === getValues().password || "Passwords need to match",
                })}
              />
            </div>
            <Button>Confirm Password</Button>
          </form>
          {errors && (
            <Typography variant="small" color="gray">
              {errors?.password?.message}
            </Typography>
          )}
        </CardBody>
      </Card>
    </div>
  );
}

export default Changepassword;
