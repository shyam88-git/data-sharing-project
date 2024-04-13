import { FiTable } from "react-icons/fi";
import { AiOutlineLineChart } from "react-icons/ai";
import { MdOutlineInfo } from "react-icons/md";
import { BsFileText } from "react-icons/bs";
import { IconType } from "react-icons";

export interface NavMenuI {
  icon: IconType;
  name: string;
  path: string;
}

export const navMenu: NavMenuI[] = [
  {
    icon: FiTable,
    name: "Map",
    path: "/map",
  },

  {
    icon: AiOutlineLineChart,
    name: "Chart",
    path: "/chart?charts=show-all",
  },
  {
    icon: MdOutlineInfo,
    name: "Info",
    path: "/info",
  },
  {
    icon: BsFileText,
    name: "Forms",
    path: "/forms",
  },
];
