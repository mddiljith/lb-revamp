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
