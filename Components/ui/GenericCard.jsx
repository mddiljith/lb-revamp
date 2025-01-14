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
      <div className="flex-2 md:flex-1 m-2 mt-2 border border-gray">
        <CardBody className="p-0">
          <Typography variant="h5" className="text-md font-normal p-5 rounded-t-lg" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            {props.title}
            {props.icon == "1" && <FaCarSide className="w-4 h-4 text-gray-800 dark:text-gray-400" /> }
            {props.icon == "2" && <FaAward className="w-4 h-4 text-gray-800 dark:text-gray-400" /> }
            {props.icon == "3" && <FaDollarSign className="w-4 h-4 text-gray-800 dark:text-gray-400" /> }
            
          </Typography>

          <Typography variant="h4" className="gcard-content">
            {props.content}
          </Typography>
        </CardBody>
      </div>
    </>
  );
};

export default GenericCard;