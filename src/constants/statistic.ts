import { HiMiniUsers } from "react-icons/hi2";
// import { StatisticItem } from "../types/types";
import { BsBoxes } from "react-icons/bs";
import { BiLineChart } from "react-icons/bi";
import { RxTimer } from "react-icons/rx";
import { IconType } from "react-icons";
interface StatisticCount {
  raw: string;
  formatted: string;
}
export interface StatisticItem {
  id: number;
  name: string;
  count: StatisticCount;
  message: string;
  rise: boolean;
  icon: IconType;
  colorClass: string;
}
const statisticData: StatisticItem[] = [
  {
    id: 1,
    name: "Total User",
    count: { raw: "40,689", formatted: "8.5%" },
    message: "Up from yesterday",
    rise: true,
    icon: HiMiniUsers,
    colorClass: "from-blue-500 to-blue-300",
  },
  {
    id: 2,
    name: "Total Order",
    count: { raw: "10293", formatted: "1.3%" },
    message: "Up from past week",
    rise: true,
    icon: BsBoxes,
    colorClass: "from-orange-500 to-orange-300",
  },
  {
    id: 3,
    name: "Total Sales",
    count: { raw: "$89,000", formatted: "4.3%" },
    message: "Down from yesterday",
    rise: false,
    icon: BiLineChart,
    colorClass: "from-green-500 to-green-300",
  },
  {
    id: 4,
    name: "Total Pending",
    count: { raw: "2040", formatted: "1.8%" },
    message: "Up from yesterday",
    rise: true,
    icon: RxTimer,
    colorClass: "from-red-500 to-red-300",
  },
];

export default statisticData;
