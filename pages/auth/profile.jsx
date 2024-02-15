import React, { useState } from "react";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import NavbarMain from "@/Components/ui/NavbarMain";
import {
  Button,
  Input,
  Option,
  Select,
  Step,
  Stepper,
  Typography,
} from "@material-tailwind/react";
import PersonalForm from "@/Components/Auth/PersonalForm";
import ShipperInfoForm from "@/Components/Shipper/ShipperInfoForm";
import KycForm from "@/Components/Auth/KycForm";

function Profile({ user, role }) {
  const [activeStep, setActiveStep] = useState(0);
  const [isLastStep, setIsLastStep] = useState(false);
  const [isFirstStep, setIsFirstStep] = useState(false);

  const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1);
  const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);
  return (
    <>
      <NavbarMain />
      <div className="w-4/5 py-4 px-8 mx-auto">
        <Stepper
          activeStep={activeStep}
          isLastStep={(value) => setIsLastStep(value)}
          isFirstStep={(value) => setIsFirstStep(value)}
        >
          <Step className="h-4 w-4" onClick={() => setActiveStep(0)}>
            <Typography
              variant="h6"
              color={activeStep === 0 ? "blue-gray" : "gray"}
              className="absolute -bottom-[3rem] text-center"
            >
              Personal info
            </Typography>
          </Step>
          <Step className="h-4 w-4" onClick={() => setActiveStep(1)}>
            <Typography
              variant="h6"
              color={activeStep === 0 ? "blue-gray" : "gray"}
              className="absolute -bottom-[3rem] text-center"
            >
              Other info
            </Typography>
          </Step>
          <Step className="h-4 w-4" onClick={() => setActiveStep(2)}>
            <Typography
              variant="h6"
              color={activeStep === 0 ? "blue-gray" : "gray"}
              className="absolute -bottom-[3rem] text-center"
            >
              KYC
            </Typography>
          </Step>
        </Stepper>
        <div className="mt-12">
          {activeStep === 0 && <ShipperInfoForm />}
          {activeStep === 1 && (
            <>
              <Input label="Contact name" />
              <Select label="role">
                <Option>Admin</Option>
                <Option>User</Option>
                <Option>Approver</Option>
              </Select>
              <PersonalForm />
            </>
          )}
          {activeStep === 2 && <KycForm />}
        </div>

        <div className="mt-10 flex justify-between">
          <Button onClick={handlePrev} disabled={isFirstStep}>
            Prev
          </Button>
          {activeStep !== 2 && (
            <Button onClick={handleNext} disabled={isLastStep}>
              Next
            </Button>
          )}
          {activeStep == 2 && <Button>Finish</Button>}
        </div>
      </div>
    </>
  );
}

export default Profile;

export const getServerSideProps = async (ctx) => {
  // Create authenticated Supabase Client
  const supabase = createPagesServerClient(ctx);
  let role = null;
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  async function getUserRole(user_id) {
    let { data: role, error } = await supabase
      .from("users")
      .select("role_meta_data")
      .eq("id", user_id);

    return role;
  }

  if (session) {
    const data = await getUserRole(session.user.id);
    role = data[0]?.role_meta_data?.role_id;
    if (role) {
      return {
        props: {
          initialSession: session,
          user: session.user,
          role: role,
        },
      };
    } else {
      return {
        redirect: {
          destination: "/auth/user-role",
          permanent: false,
        },
      };
    }
  } else {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
};
