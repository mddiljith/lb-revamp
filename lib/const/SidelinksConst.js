import { MdDashboard, MdMoveToInbox } from "react-icons/md";
import { FaTruck } from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";
import { BsFileEarmarkMedicalFill } from "react-icons/bs";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";

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
    key: "reports",
    label: "Reports",
    path: "/owner/reports",
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
    key: "trips",
    label: "Trips",
    path: "/driver",
    icon: <MdDashboard />,
  },
  {
    key: "earnings",
    label: "Earnings",
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
    path: "/shipper/dashboard",
    icon: <MdDashboard />,
  },
  {
    key: "trips",
    label: "Trips",
    path: "/shipper/trips",
    icon: <TbTruckDelivery />,
  },
  {
    key: "billing",
    label: "Billing",
    path: "/shipper/billing",
    icon: <LiaFileInvoiceDollarSolid />,
  },
];
