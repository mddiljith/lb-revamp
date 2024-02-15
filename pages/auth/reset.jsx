import {
  Alert,
  Button,
  Card,
  CardBody,
  Input,
  Typography,
} from "@material-tailwind/react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import Image from "next/image";
import React, { useState } from "react";
import { CiCircleCheck } from "react-icons/ci";

function Reset() {
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState(null);
  const supabase = useSupabaseClient();
  const sendResetPassword = async () => {
    try {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/changepassword`,
      });
      setSuccess(true);
    } catch (error) {
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
          {!success && (
            <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
              <div className="mb-4 flex flex-col gap-6">
                <Input
                  size="lg"
                  label="Email"
                  value={email}
                  onChange={(e) => {
                    e.preventDefault();
                    setEmail(e.target.value);
                  }}
                />
              </div>
              <Button onClick={sendResetPassword}>Reset password</Button>
            </form>
          )}
          {success && (
            <Alert color="red" icon={<CiCircleCheck />}>
              success! Check your email to reset your password
            </Alert>
          )}
        </CardBody>
      </Card>
    </div>
  );
}

export default Reset;
