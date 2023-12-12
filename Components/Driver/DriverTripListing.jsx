import React from "react";
import Link from "next/link";
import Table from "../ui/Table";
import {
  Typography
} from "@material-tailwind/react";

const DriverTripListing = ({ row, index }) => {
  const {
    id,
    tracking_id, 
    search_requests,
    payment_status
  } = row;

  return (
    <>
    <Table.Row index={index}>
      <Table.RowItem>
        <Link href={`/driver/trips/${id}`}>
          <Typography className="text-sm font-semibold text-light-blue-900">
            {tracking_id}
          </Typography>
        </Link>
      </Table.RowItem>
      <Table.RowItem>
        <Typography className="text-sm font-light text-blue-gray-900">
          {search_requests["users"]["name"]}
          <br/>
          ({search_requests["users"]["email"]})
        </Typography>
      </Table.RowItem>
      <Table.RowItem>
        <Typography className="text-sm font-light text-blue-gray-900">
          {search_requests["source"]}
        </Typography>
      </Table.RowItem>
      <Table.RowItem>
        <Typography className="text-sm font-light text-blue-gray-900">
          {search_requests["destination"]}
        </Typography>
      </Table.RowItem>
      <Table.RowItem>
        <Typography className="text-sm font-light text-blue-gray-900">
          {payment_status["statuses"]["name"]}
        </Typography>
      </Table.RowItem>
    </Table.Row>
    </>
  );
};

export default DriverTripListing;
