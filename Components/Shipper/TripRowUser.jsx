import React from "react";

import { Chip, Typography } from "@material-tailwind/react";
import Link from "next/link";
import { BsThreeDotsVertical } from "react-icons/bs";
import { format } from "date-fns";
import Table from "../ui/Table";

function TripRowUser({ row, index }) {
  const {
    f_created_at,
    f_tracking_id,
    f_payment_status_id,
    f_sr_id,
    f_id,
    f_plate_number,
    f_destination,
    f_source,
  } = row;

  return (
    <Table.Row index={index}>
      <Table.RowItem>
        <Typography className="text-xs font-semibold text-blue-gray-600">
          {format(new Date(f_created_at), "MMM dd yyyy")}
        </Typography>
      </Table.RowItem>
      <Table.RowItem>
        <Typography className="text-xs font-semibold text-blue-gray-600">
          {f_tracking_id}
        </Typography>
      </Table.RowItem>
      <Table.RowItem>
        <Typography className="text-xs font-semibold text-blue-gray-500">
          {f_source}
        </Typography>
        <Typography className="text-xs font-semibold text-blue-gray-500">
          {f_destination}
        </Typography>
      </Table.RowItem>
      <Table.RowItem>
        <Typography className="text-xs font-semibold text-blue-gray-600">
          {f_plate_number}
        </Typography>
      </Table.RowItem>
      <Table.RowItem>
        <Typography className="text-xs font-semibold text-blue-gray-600">
          {f_sr_id}
        </Typography>
      </Table.RowItem>
      <Table.RowItem>
        <Chip
          variant="gradient"
          color={f_payment_status_id === 1 ? "green" : "blue-gray"}
          value={f_payment_status_id === 1 ? "completed" : "pending"}
          className="py-0.5 px-2 text-[11px] font-medium"
        />
      </Table.RowItem>
      <Table.RowItem>
        <Link href={`/trips/${f_id}`}>
          <BsThreeDotsVertical />
        </Link>
      </Table.RowItem>
    </Table.Row>
  );
}

export default TripRowUser;
