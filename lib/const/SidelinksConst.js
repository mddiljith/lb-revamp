import { MdDashboard, MdMoveToInbox } from "react-icons/md";
import { FaTruck } from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";
import { BsFileEarmarkMedicalFill } from "react-icons/bs";

export const OWNER_SIDELINKS = [
  {
    key: "dashboard",
    label: "Dashboard",
    path: "/owner",
    icon: <MdDashboard />,
  },
  {
    key: "trucks",
    label: "Trucks",
    path: "/owner/trucks",
    icon: <FaTruck />,
  },
  {
    key: "trips",
    label: "Trips",
    path: "/owner/trips",
    icon: <TbTruckDelivery />,
  },
  {
    key: "invoice",
    label: "Invoice",
    path: "/owner/docs",
    icon: <BsFileEarmarkMedicalFill />,
  },
  {
    key: "inbox",
    label: "Inbox",
    path: "/owner/inbox",
    icon: <MdMoveToInbox />,
  },
];

export const DRIVER_SIDELINKS = [
  {
    key: "dashboard",
    label: "Dashboard",
    path: "/driver",
    icon: <MdDashboard />,
  },
  {
    key: "my_trips",
    label: "My Trips",
    path: "/driver/trips",
    icon: <TbTruckDelivery />,
  },
  {
    key: "invoice",
    label: "Invoice",
    path: "/driver/docs",
    icon: <BsFileEarmarkMedicalFill />,
  },
  {
    key: "inbox",
    label: "Inbox",
    path: "/driver/inbox",
    icon: <MdMoveToInbox />,
  },
];

export const SHIPPER_SIDELINKS = [
  {
    key: "dashboard",
    label: "Dashboard",
    path: "/shipper",
    icon: <MdDashboard />,
  },
  {
    key: "dashboard",
    label: "Dashboard",
    path: "/trips",
    icon: <TbTruckDelivery />,
  },
];
