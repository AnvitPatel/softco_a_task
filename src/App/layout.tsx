import { sideBarRoute } from "../constants/sidebarRoutes";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { StyleMainComponent } from "./style";
import { IoMdLogOut } from "react-icons/io";
import { AppDispatch } from "../redux/storeConfig/store";
import { useDispatch } from "react-redux";
import { handleLogout } from "../redux/slice/Slices/authSlice";
import Header from "../components/Header";

const Layout = () => {
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();

  return (
    <StyleMainComponent>
      <div className="flex min-h-screen">
        <div className="flex h-screen w-[15rem] flex-col justify-between overflow-hidden border-r">
          <div className="">
            <div className="flex justify-center pt-4">
              <h1 className="text-xl font-bold">
                LO<span className="text-[#4880FF]">GO</span>
              </h1>
            </div>
            <ul className="sidebar-nav space-y-2 tracking-wide mt-[2rem] ">
              {sideBarRoute.map(({ label, path, icon: Icon }) => (
                <li className={`min-w-max px-3`}>
                  <NavLink to={path} className="">
                    <div className="group flex items-center space-x-4 rounded-md px-4 py-3 menubox">
                      <Icon className="" />
                      <span className="">{label}</span>
                    </div>
                  </NavLink>
                </li>
                // <SidebarNav key={path} label={label} path={path} icon={Icon} />
              ))}
            </ul>
          </div>
          <div
            className="justify-left flex cursor-pointer items-center border-t p-4"
            onClick={() => dispatch(handleLogout())}
          >
            <IoMdLogOut className="mr-2" size={20} />
            <p>Logout</p>
          </div>
        </div>
        <div className="flex h-screen w-full flex-col overflow-y-auto bg-[#f5f6fa]">
          <Header />
          <Outlet />
        </div>
      </div>
    </StyleMainComponent>
  );
};
export default Layout;
