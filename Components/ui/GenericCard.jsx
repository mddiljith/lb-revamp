import React from 'react';
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

const GenericCard = (props) => {
  return (
    <Card className="flex-2 md:flex-1 m-4 mt-6 w-96">
      <CardBody className="p-0">
        <Typography variant="h5" color="blue-gray" className="mb-2 bg-cyan-500 text-white text-md font-normal text-center py-4 rounded-lg overflow-hidden w-full">
          {props.title}
        </Typography>
        <Typography variant="h1" className="text-center p-5">
          &#8377;{props.content}
        </Typography>
        <Typography variant="p" className="text-center py-2 text-sm">
          &#8377;{props.notice}
        </Typography>
      </CardBody>
    </Card>
  );
};

export default GenericCard;