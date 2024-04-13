import { IconType } from "react-icons";

import { Link, useLocation, useSearchParams } from "react-router-dom";
import { NavMenuI } from "./NavMenu";

interface PropsI {
  navMenu: NavMenuI[];
}

const SideNavbar = ({ navMenu }: PropsI) => {
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();

  const minHeight = `calc(100vh - 107px)`;

  // HELPER FUNCTION
  const includesParamsQuery = (
    searchParams: URLSearchParams,
    keyword: string
  ): boolean => {
    return !!searchParams.get(keyword);
  };
  return (
    <div
      className="w-[162px]   text-white bg-primary-blue-600 pt-[46px]"
      style={{ minHeight }}
    >
      {navMenu.map((nav, idx) => {
        const Icon: IconType = nav.icon;
        const activeBg =
          pathname.includes(nav.path) ||
          includesParamsQuery(searchParams, nav.name.toLowerCase())
            ? "bg-primary-gray-400"
            : "";
        return (
          <Link
            key={idx}
            to={nav.path}
            className={`h-[46px] px-6  flex items-center gap-2 ${activeBg} hover:bg-primary-gray-400 cursor-pointer`}
          >
            {<Icon size={25} />}
            <span className="text-base leading-xl font-normal">{nav.name}</span>
          </Link>
        );
      })}
    </div>
  );
};

export default SideNavbar;
