import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "../../slices/userApiSlice";
import { logout } from "../../slices/authSlice";

const user = {
  imageUrl:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};
const navigation = [
  { name: "All Teachers", href: "/teachers" },
  { name: "Semester", href: "/semester", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const { userInfo } = useSelector((state) => state.auth);
  const [logoutApiCall] = useLogoutMutation();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    console.log("logout");
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
      toast.success("Logout Successful");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="min-h-full bg-gray-100">
        <Disclosure as="nav" className="max-w-6xl mx-auto">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Link to={"/"} className="font-extrabold">
                        Feedback Loop
                      </Link>
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        {navigation.map((item) => (
                          <Link
                            key={item.name}
                            to={item.href}
                            className={classNames(
                              item.current
                                ? " text-black font-bold"
                                : "text-black  hover:font-bold"
                            )}
                            aria-current={item.current ? "page" : undefined}
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                      {/* Profile dropdown */}
                      <Menu as="div" className="relative ml-3">
                        <div>
                          {userInfo ? (
                            <Menu.Button className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                              <span className="sr-only">Open user menu</span>
                              <img
                                className="h-8 w-8 rounded-full"
                                src={user.imageUrl}
                                alt=""
                              />
                            </Menu.Button>
                          ) : (
                            <Link to={"/login"}>Login</Link>
                          )}
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {/* profile link */}
                            <Menu.Item>
                              {userInfo?.data?.role === "admin" ? (
                                <Link
                                  to={"/admin/dashboard"}
                                  className="block px-4 py-2 text-sm hover:bg-slate-100 text-gray-700"
                                >
                                  Admin Dashboard
                                </Link>
                              ) : (
                                <Link
                                  to={"/profile"}
                                  className="block px-4 py-2 text-sm hover:bg-slate-100 text-gray-700"
                                >
                                  View Profile
                                </Link>
                              )}
                            </Menu.Item>
                            {/* logout link */}
                            <Menu.Item>
                              <Link
                                to={"/logout"}
                                onClick={handleLogout}
                                className="block px-4 py-2 text-sm hover:bg-slate-100 text-gray-700"
                              >
                                Log out
                              </Link>
                            </Menu.Item>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>
                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gray-80a0 p-2 text-black focus:outline-none  ">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="md:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                  {navigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className={classNames(
                        item.current
                          ? "text-black"
                          : "text-black hover:bg-gray-400",
                        "block rounded-md px-3 py-2 text-base font-medium"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
                <div className="border-t border-gray-700 pb-3 pt-4">
                  <div className=" px-5">
                    <div className="flex--0">
                      {userInfo ? (
                        <div className="">
                          <img
                            className="h-10 mx-4 w-10 rounded-full"
                            src={user.imageUrl}
                            alt=""
                          />
                          <div className="">
                            <div className="mt-3 space-y-1 ">
                              {userInfo?.data?.role === "admin" ? (
                                <Link
                                  to={"/admin/dashboard"}
                                  className="block  px-4   py-2 text-sm  hover:bg-slate-300 text-gray-700"
                                >
                                  Admin Dashboard
                                </Link>
                              ) : (
                                <Link
                                  to={"/profile"}
                                  className="block  px-4 py-2 text-sm hover:bg-slate-300 text-gray-700"
                                >
                                  View Profile
                                </Link>
                              )}

                              {/* logout link */}
                              <div>
                                <Link
                                  to={"/logout"}
                                  onClick={handleLogout}
                                  className="block  px-4  py-2 text-sm hover:bg-slate-300 text-gray-700"
                                >
                                  Log out
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <Link
                          to={"/login"}
                          className="block  px-4  py-2 text-sm hover:bg-slate-300 text-gray-700"
                        >
                          Login
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </>
  );
}
