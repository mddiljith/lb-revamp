import { useDeleteVehicle } from "@/hooks/vehicles/useDeleteVehicle";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Table from "../ui/Table";
import {
  Typography,
  Chip,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import { BsThreeDotsVertical, IoIosArrowForward } from "react-icons/bs";
import UpdateVehicleStatus from "./UpdateVehicleStatus";

function VehicleRow(row, index) {
  // const { deleteTruck } = useDeleteVehicle();
  const [value, setValue] = useState(row);
  const [open, setOpen] = useState(false);
  const { id, types, model, model_year, plate_number, statuses } = value.row;

  const dialogHandler = () => {
    setOpen(!open)
  }

  console.log({open})

  return (
    <Table.Row index={index}>
      <Table.RowItem>
        <Typography className="text-xs font-normal whitespace-nowrap">
          {`${model}`}
        </Typography>
      </Table.RowItem>
      <Table.RowItem>
        <Typography className="text-xs font-normal whitespace-nowrap">
          {types.name}
        </Typography>
      </Table.RowItem>
      <Table.RowItem>
        <Typography className="text-xs font-normal whitespace-nowrap">
          {model}
        </Typography>
      </Table.RowItem>
      <Table.RowItem>
        <Typography className="text-xs font-normal whitespace-nowrap">
          {model_year}
        </Typography>
      </Table.RowItem>
      <Table.RowItem>
        <Typography className="text-xs font-normal whitespace-nowrap">
          {plate_number}
        </Typography>
      </Table.RowItem>
      <Table.RowItem>
        <Chip
          variant="gradient"
          color={statuses.name === "Active" ? "green" : "blue-gray"}
          value={statuses.name}
          className="py-0.5 px-2 text-[11px] font-sm text-center"
        />
      </Table.RowItem>
      <Menu placement="left-end">
        <MenuHandler>
          <td>
            <BsThreeDotsVertical />
          </td>
        </MenuHandler>
        <MenuList>
          <MenuItem
          onClick={() => {
            dialogHandler();
          }}
          >
            Update Status
          </MenuItem>
          <MenuItem>
            <Link href={`/owner/trucks/${id}`}>Edit</Link>
          </MenuItem>
          <MenuItem>Delete</MenuItem>
        </MenuList>
      </Menu>
      <UpdateVehicleStatus open={open} handleOpen={dialogHandler} cacheKey={id} />
    </Table.Row>
  );
}
export default VehicleRow;
