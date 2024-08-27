import React, { useEffect } from "react";
import { useState } from "react";
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
    payment_status,
    status_id
  } = row;
  
  return (
    <>
    <Table.Row index={index}>
      <Table.RowItem>
        { status_id == 5 && <Link href={`/driver/trips/transit/${id}`}> 
            <Typography className="text-md font-semibold text-light-blue-900">
              #{tracking_id}
            </Typography>
          </Link>
        }
        { status_id != 5 && <Link href={`/driver/trips/${id}`}> 
            <Typography className="text-md font-semibold text-light-blue-900">
              #{tracking_id}
            </Typography>
          </Link>
        }
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
      <Table.RowItem>
        { status_id == 5 && <Link href={`/driver/trips/transit/${id}`}> 
            <Typography className="text-sm font-semibold text-light-blue-500">
              View
            </Typography>
          </Link>
        }
        { status_id != 5 && <Link href={`/driver/trips/${id}`}> 
            <Typography className="text-sm font-semibold text-light-blue-500">
              View
            </Typography>
          </Link>
        }
      </Table.RowItem>
    </Table.Row>
    </>
  );
};

export default DriverTripListing;
