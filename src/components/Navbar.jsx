import { Link, useLocation } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { BellIcon, UserPen, Settings, LogOutIcon, ShipWheelIcon } from "lucide-react";
import ThemeSelector from "./ThemeSelector";
import useLogout from "../hooks/useLogout";

const Navbar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const isChatPage = location.pathname?.startsWith("/chat");

  // const queryClient = useQueryClient();
  // const { mutate: logoutMutation } = useMutation({
  //   mutationFn: logout,
  //   onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),
  // });

  const { logoutMutation } = useLogout();
  // Get the first letter of the user's name and capitalize it
  const firstLetter = authUser?.fullName ? authUser.fullName.charAt(0).toUpperCase() : "U";
  return (
    <nav className="bg-base-200 border-b border-base-300 sticky top-0 z-30 h-16 flex items-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-end w-full">
          {/* LOGO - ONLY IN THE CHAT PAGE */}
          {isChatPage && (
            <div className="pl-5  hidden lg:block">
              <Link to="/" className="flex items-center gap-2.5">
                <ShipWheelIcon className="size-9 text-primary" />
                <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary  tracking-wider">
                  BatChit
                </span>
              </Link>
            </div>
          )}
          <div className="pl-5 lg:hidden">
            <Link to="/" className="flex items-center gap-2.5">
              <ShipWheelIcon className="size-9 text-primary" />
              <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary  tracking-wider">
                BatChit
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 ml-auto">
            <Link to={"/notifications"}>
              <button className="btn btn-ghost btn-circle">
                <BellIcon className="h-6 w-6 text-base-content opacity-70" />
              </button>
            </Link>
          </div>

          {/* TODO */}
          <ThemeSelector />

          {/* <div className="avatar placeholder">
            <Link to={`/profile/${authUser?._id}`}>
              <div className="w-9 h-9 rounded-full bg-primary text-primary-content flex items-center justify-center font-bold ">
                {authUser?.profilePic ? (
                  <img
                    src={authUser.profilePic}
                    alt="User Avatar"
                    rel="noreferrer"
                    className="rounded-full h-full w-full object-cover"
                  />
                ) : (
                  <span>{firstLetter}</span>
                )}
              </div>
            </Link>
          </div> */}

          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="cursor-pointer">
              <div className="w-9 h-9 rounded-full overflow-hidden bg-primary text-primary-content flex items-center justify-center">
                {authUser?.profilePic ? (
                  <img
                    src={authUser.profilePic}
                    alt="User Avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-lg font-bold">
                    {firstLetter}
                  </span>
                )}
              </div>
            </div>

            <ul
              tabIndex={0}
              className="dropdown-content z-[100] mt-3 w-64 rounded-2xl border border-base-300 bg-base-100 p-2 shadow-xl"
            >
              {/* User Info */}
              <li className="px-4 py-3 border-b border-base-300">
                <p className="font-semibold text-base-content">
                  {authUser?.fullName}
                </p>
                <p className="text-xs opacity-70 truncate">
                  {authUser?.email}
                </p>
              </li>

              {/* Profile */}
              <li>
                <Link
                  to={`/profile/${authUser?._id}`}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-base-200 transition-colors"
                >
                  <UserPen size={18} />
                  <span>Edit Profile</span>
                </Link>
              </li>

              {/* Settings */}
              {/* <li>
                <Link
                  to="/settings"
                  className="flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-base-200 transition-colors"
                >
                  <Settings size={18} />
                  <span>Settings</span>
                </Link>
              </li> */}

              {/* Logout */}
              <li className="mt-1 border-t border-base-300 pt-1">
                <button
                  onClick={logoutMutation}
                  className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-error hover:bg-error/10 transition-colors"
                >
                  <LogOutIcon size={18} />
                  <span>Logout</span>
                </button>
              </li>
            </ul>
          </div>


        </div>
      </div>
    </nav>
  );
};
export default Navbar;
