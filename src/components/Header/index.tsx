import { GoSearch } from "react-icons/go";
import { StyleComponent } from "./style";
import { IoMdNotificationsOutline } from "react-icons/io";
import { AiOutlineSetting } from "react-icons/ai";
import { RootState } from "../../redux/storeConfig/store";
import { useSelector } from "react-redux";

const Header = () => {
  const { userData } = useSelector((state: RootState) => state?.auth);
  return (
    <StyleComponent>
      <div className="sticky top-0 z-50 flex justify-between border-b bg-white p-4">
        <form className="flex-1">
          <label htmlFor="search" className="sr-only">
            Search
          </label>
          <div className="relative sm:w-[95%] md:w-[40%]">
            <input
              type="text"
              id="search"
              className="block w-full rounded-full border border-gray-200 bg-gray-50 p-2 pl-4 text-sm text-gray-900 outline-none focus:border-gray-200"
              placeholder="Search"
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500"
            >
              <GoSearch />
            </button>
          </div>
        </form>
        <div className="flex items-center space-x-14">
          {/* <CountryDropdown /> */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button className="rounded-full bg-white p-2">
                <IoMdNotificationsOutline size={23} />
              </button>
              <span className="absolute right-[0.8rem] top-[0.7rem] h-[0.4rem] w-[0.4rem] rounded-full bg-primary-red-dark"></span>
            </div>

            <div>
              <button className="rounded-full bg-white p-2">
                <AiOutlineSetting size={20} />
              </button>
            </div>
            <div>{userData?.username}</div>
            <div className="relative h-8 w-8 cursor-pointer">
              <img
                className="h-full w-full rounded-full object-cover object-center"
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
              <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-green-400 ring ring-white"></span>
            </div>
          </div>
        </div>
      </div>
    </StyleComponent>
  );
};
export default Header;
