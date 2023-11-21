import React from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
 
const Trips = () => {
  return (
    <div>
      <Card color="gray" variant="gradient" className="w-full p-8 mt-6">
        <CardHeader
          floated={false}
          shadow={false}
          color="transparent"
          className="m-0 mb-8 rounded-none border-b border-white/10 pb-8 text-center"
        >
          <Typography
            variant="small"
            color="white"
            className="font-normal uppercase"
          >
            Upcoming Trips
          </Typography>
        </CardHeader>
        <CardBody className="p-0">
          <ul className="flex flex-col gap-4">
            <li className="flex items-center gap-4">
              <Typography className="border-b border-white/10  mb-8">
                <span className="text-xs">12-11-2023</span>&nbsp;
                <span className="text-xl mr-4">Delhi-Mumbai</span>
                <span className="text-sm">(Distance: 1252km Duration: 24hr)</span>
              </Typography>
            </li>
            <li className="flex items-center gap-4">
              <Typography className="border-b border-white/10">
                <span className="text-xs">20-11-2023</span>&nbsp;
                <span className="text-xl mr-4">Mumbai-Goa</span>
                <span className="text-sm">(Distance: 550km Duration: 8hr)</span>
              </Typography>
            </li>
          </ul>
        </CardBody>
        <CardFooter className="mt-12 p-0">
          <Button
            size="lg"
            color="white"
            className="hover:scale-[1.02] focus:scale-[1.02] active:scale-100"
            ripple={false}
            fullWidth={true}
          >
            Go to Trips
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Trips;
