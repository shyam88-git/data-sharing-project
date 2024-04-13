import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { IBucketKeyEnums, bucket } from "../../utils/helpers/storage";
import { clearActiveGis } from "../../store/modules/gis-file/gisFileSlice";
import { useAppDispatch } from "../../store/hook";
import { CgMenuGridO } from "react-icons/cg";
import { navMenu } from "./NavMenu";
import { IconType } from "react-icons";
import ProfileIcon from "./ProfileIcon";
import ActiveGisFile from "../pages/gis-file/ActiveGisFile";

const AuthNavbar = () => {
  const navigate = useNavigate();
  const menuContainer = useRef(null);
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();

  // STATE
  const [showProfileMenu, setShowProfileMenu] = useState<boolean>(false);
  const [showNavMenu, setShowNavMenu] = useState<boolean>(false);

  // STORAGE
  const user = bucket.get(IBucketKeyEnums.ACTIVE_USER) || "Nep GIS";
  const userEmail =
    bucket.get(IBucketKeyEnums.ACTIVE_USER_EMAIL) || "example@mail.com";

  // USEeFFECT
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      // @ts-expect-error menuContainer.current have 'contains' property
      if (!menuContainer?.current?.contains(event.target)) {
        if (!showProfileMenu && !showNavMenu) return;
        setShowProfileMenu(false);
        setShowNavMenu(false);
      }
    };

    window.addEventListener("click", handleOutsideClick);
    return () => window.removeEventListener("click", handleOutsideClick);
  }, [showProfileMenu, showNavMenu, menuContainer]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (!showProfileMenu) return;

      if (event.key === "Escape") {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener("keyup", handleEscape);
    return () => document.removeEventListener("keyup", handleEscape);
  }, [showProfileMenu]);

  // HELPER FUNCTION
  const LogoutHandler = () => {
    dispatch(clearActiveGis());
    bucket.clear();
  };

  return (
    <nav
      className={`relative h-[107px] text-white bg-primary-blue-900  z-[999] flex justify-between items-center px-16 w-full`}
    >
      <Link to="/home">
        <img
          src="/nep-gis-logo.png"
          alt="Nep Gis logo"
          className="h-[123px] w-[156px]"
        />
      </Link>
      <div className="flex gap-8 items-center" ref={menuContainer}>
        <ActiveGisFile />
        <CgMenuGridO
          size={50}
          className="cursor-pointer p-2 rounded-full hover:bg-slate-700"
          onClick={() => {
            setShowNavMenu((prevState) => !prevState);
            setShowProfileMenu(false);
          }}
        />
        <ProfileIcon
          name={user[0]}
          onClick={() => {
            setShowProfileMenu((prevState) => !prevState);
            setShowNavMenu(false);
          }}
          otherStyles="hover:bg-slate-300 transition-colors duration-200 ease-in-out h-12 w-12"
        />
      </div>
      <div
        className={`py-2 bg-white text-black dropDownNavMenu ${
          showNavMenu ? "block" : "!hidden"
        } `}
      >
        <div className="w-full p-8 flex gap-8 flex-wrap">
          {navMenu.map((menu, idx) => {
            const Icon: IconType = menu.icon;
            const activeBg = pathname.includes(menu.path)
              ? "bg-slate-900 text-white"
              : "bg-slate-200 hover:bg-slate-400";
            return (
              <div className="flex flex-col items-center" key={idx}>
                <Link
                  to={menu.path}
                  className={` flex items-center justify-center p-2 rounded-full ${activeBg}   cursor-pointer`}
                >
                  {" "}
                  {<Icon size={25} />}
                </Link>
                <span className="text-base leading-xl font-normal">
                  {menu.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      <div
        className={` pt-3 pb-2 bg-white text-primary-blue-900 ${
          showProfileMenu ? "block" : "hidden"
        } dropDownProfileMenu`}
      >
        <div className=" pt-2 pb-3 mb-1   px-5 border-b border-solid border-slate-300 flex items-center gap-2  ">
          <ProfileIcon name={user[0]} onClick={() => {}} />
          <div className="flex flex-col ">
            <span className="font-semibold capitalize text-tiny">{user}</span>
            <span className="font-semibold  text-tiny -mt-1">{userEmail}</span>
          </div>
        </div>
        <p
          className=" py-2  font-medium px-5  cursor-pointer hover:bg-primary-gray-150"
          onClick={() => {
            LogoutHandler();
            navigate("/home");
          }}
        >
          Log out
        </p>
      </div>
    </nav>
  );
};

export default AuthNavbar;
