import React from "react";

import { Chip, Typography } from "@material-tailwind/react";
import Link from "next/link";
import { BsThreeDotsVertical } from "react-icons/bs";
import { format } from "date-fns";
import Table from "../ui/Table";

function TripRowOwner({ row, index }) {
  // revalidate what need tio show for the ttr
  console.log({row})
  const {
    id,
    created_at,
    tracking_id,
    vehicles,
    search_requests,
    payment_status
  } = row;

  return (
    <Table.Row index={index}>
      <Table.RowItem>
        <Typography className="text-xs font-semibold text-blue-gray-600">
          {format(new Date(created_at), "MMM dd yyyy")}
        </Typography>
      </Table.RowItem>
      <Table.RowItem>
        <Typography className="text-xs font-semibold text-blue-gray-600">
          {tracking_id}
        </Typography>
      </Table.RowItem>
      <Table.RowItem>
        <Typography className="text-xs font-semibold text-blue-gray-500">
          {search_requests.source}
        </Typography>&rarr;
        <Typography className="text-xs font-semibold text-blue-gray-500">
          {search_requests.destination}
        </Typography>
      </Table.RowItem>
      <Table.RowItem>
        <Typography className="text-xs font-semibold text-blue-gray-600">
          {vehicles.plate_number}
        </Typography>
      </Table.RowItem>
      <Table.RowItem>
        <Typography className="text-xs font-semibold text-blue-gray-600">
          {vehicles.users.name}
        </Typography>
      </Table.RowItem>
      <Table.RowItem>
        <Chip
          variant="gradient"
          color={payment_status.status_id === 1 ? "green" : "blue-gray"}
          value={payment_status.status_id === 1 ? "completed" : "pending"}
          className="py-0.5 px-2 text-[11px] font-medium"
        />
      </Table.RowItem>
      <Table.RowItem>
        <Link href={`/trips/${id}`}>
          <BsThreeDotsVertical />
        </Link>
      </Table.RowItem>
    </Table.Row>
  );
}

export default TripRowOwner;
