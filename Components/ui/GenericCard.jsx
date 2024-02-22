import React from 'react';
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { FaCarSide, FaAward, FaDollarSign } from "react-icons/fa";
const GenericCard = (props) => {
  return (
    <>
      <Card className="flex-2 md:flex-1 m-2 mt-2 border border-black">
        <CardBody className="p-0">
          <Typography variant="h5" color="blue-gray-800" className="text-md font-normal p-5 rounded-t-lg" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            {props.title}
            {props.icon == "1" && <FaCarSide className="w-4 h-4 text-gray-800 dark:text-gray-400" /> }
            {props.icon == "2" && <FaAward className="w-4 h-4 text-gray-800 dark:text-gray-400" /> }
            {props.icon == "3" && <FaDollarSign className="w-4 h-4 text-gray-800 dark:text-gray-400" /> }
            
          </Typography>

          <Typography variant="h4" color="blue-gray-800" className="px-5 py-5">
            {props.content}
          </Typography>
        </CardBody>
      </Card>
    </>
  );
};

export default GenericCard;