import { useDeleteVehicle } from "@/hooks/vehicles/useDeleteVehicle";
import React from "react";

function VehicleRow(row, index) {
  const { deleteTruck } = useDeleteVehicle();

  const { id, types, model, model_year, plate_number, statuses } = row;

  return (
    <Table.Row index={index}>
      <Table.RowItem>
        <Typography className="text-xs font-semibold text-blue-gray-600 whitespace-nowrap">
          {id}
        </Typography>
      </Table.RowItem>
      <Table.RowItem>
        <Typography className="text-xs font-semibold text-blue-gray-600 whitespace-nowrap">
          {types.name}
        </Typography>
      </Table.RowItem>
      <Table.RowItem>
        <Typography className="text-xs font-semibold text-blue-gray-600 whitespace-nowrap">
          {model}
        </Typography>
      </Table.RowItem>
      <Table.RowItem>
        <Typography className="text-xs font-semibold text-blue-gray-600 whitespace-nowrap">
          {model_year}
        </Typography>
        <Typography className="text-xs font-semibold text-blue-gray-600 whitespace-nowrap">
          {plate_number}
        </Typography>
      </Table.RowItem>
      <Table.RowItem>
        <Chip
          variant="gradient"
          color={statuses.name === "Active" ? "green" : "blue-gray"}
          value={statuses.name}
          className="py-0.5 px-2 text-[11px] font-medium"
        />
      </Table.RowItem>

      <Table.RowItem>
        <Menu placement="left-end">
          <MenuHandler>
            <BsThreeDotsVertical />
          </MenuHandler>
          <MenuList>
            <MenuItem
            // onClick={() => {
            //   dialogHandler();
            // }}
            >
              Update Status
            </MenuItem>
            <MenuItem>Edit</MenuItem>
            <MenuItem onClick={() => deleteTruck(id)}>Delete</MenuItem>
            <MenuItem>
              <Link href={`/vehicle/${id}`}>
                <div className="flex  gap-1">
                  More
                  <span className="align-bottom">
                    <IoIosArrowForward />
                  </span>
                </div>
              </Link>
            </MenuItem>
          </MenuList>
        </Menu>
      </Table.RowItem>
    </Table.Row>
  );
}
export default VehicleRow;
