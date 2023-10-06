import { useDeleteVehicle } from "@/hooks/vehicles/useDeleteVehicle";
import React from "react";

function VehicleRow(row, index) {
  const { deleteTruck } = useDeleteVehicle();

  const { f_id, f_type, f_model, f_model_year, f_plate_number, f_status } = row;

  return (
    <Table.Row index={index}>
      <Table.RowItem>
        <Typography className="text-xs font-semibold text-blue-gray-600 whitespace-nowrap">
          {f_id}
        </Typography>
      </Table.RowItem>
      <Table.RowItem>
        <Typography className="text-xs font-semibold text-blue-gray-600 whitespace-nowrap">
          {f_type}
        </Typography>
      </Table.RowItem>
      <Table.RowItem>
        <Typography className="text-xs font-semibold text-blue-gray-600 whitespace-nowrap">
          {f_model}
        </Typography>
      </Table.RowItem>
      <Table.RowItem>
        <Typography className="text-xs font-semibold text-blue-gray-600 whitespace-nowrap">
          {f_model_year}
        </Typography>
        <Typography className="text-xs font-semibold text-blue-gray-600 whitespace-nowrap">
          {f_plate_number}
        </Typography>
      </Table.RowItem>
      <Table.RowItem>
        <Chip
          variant="gradient"
          color={f_status === "Active" ? "green" : "blue-gray"}
          value={f_status}
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
            <MenuItem onClick={() => deleteTruck(f_id)}>Delete</MenuItem>
            <MenuItem>
              <Link href={`/vehicle/${f_id}`}>
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
