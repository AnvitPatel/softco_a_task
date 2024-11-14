// import { AiOutlineDashboard } from "react-icons/ai";
// import { SideBarRouteType } from "../types/types";
// import { IoApps } from "react-icons/io5";
// import { TbClockDollar } from "react-icons/tb";
import { IoApps } from "react-icons/io5";
import { TbClockDollar } from "react-icons/tb";
import { AiOutlineDashboard } from "react-icons/ai";

export interface IconBaseProps extends React.SVGAttributes<SVGElement> {
  children?: React.ReactNode;
  size?: string | number;
  color?: string;
  title?: string;
}
export type IconType = (props: IconBaseProps) => JSX.Element;

export type SideBarRouteType = {
  label: string;
  path: `/${string}`;
  icon: IconType;
}[];

export const sideBarRoute: SideBarRouteType = [
  {
    label: "Dashboard",
    path: "/",
    icon: AiOutlineDashboard,
  },
  {
    label: "Projects",
    path: "/projects",
    icon: IoApps,
  },
  {
    label: "Estimates",
    path: "/estimates",
    icon: TbClockDollar,
  },
];
