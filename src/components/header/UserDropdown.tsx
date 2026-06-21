import { useState } from "react";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { Link, useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import ChangePasswordModal from "../auth/ChangePasswordModal";
import { logout } from "../../store/slices/authSlice"; // 🔥 import logout
import { User } from "lucide-react";


export default function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPasswordModalOpen, setPasswordModalOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log("User in Dropdown:", user);

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function closeDropdown() {
    setIsOpen(false);
  }

  const handleLogout = async () => {
    await dispatch(logout());
    navigate("/"); // 🔥 navigate AFTER logout
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-2 px-2 py-1 rounded-lg text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 transition"
      >
        {/* Icon */}
        <User size={18} />

        {/* Name */}
        <span className="font-semibold text-sm whitespace-nowrap ">
          {user?.name || user?.username || "User"}
        </span>

        {/* Arrow */}
        <svg
          className={`stroke-gray-500 dark:stroke-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""
            }`}
          width="18"
          height="18"
          viewBox="0 0 18 18"
        >
          <path
            d="M4.3125 6.65625L9 11.3437L13.6875 6.65625"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <Dropdown
        isOpen={isOpen}
        onClose={closeDropdown}
        className="absolute right-0 mt-[17px] flex w-[260px] flex-col rounded-2xl border border-gray-200 bg-white p-3 shadow-theme-lg"
      >
        {/* 🔥 USER DETAILS */}
        <div>
          <span className="block font-medium text-gray-700 text-theme-sm">
            {user?.name || user?.username || "User"}
          </span>

          <span className="mt-0.5 block text-theme-xs text-gray-500">
            {user?.email || "No email"}
          </span>
        </div>

        <ul className="flex flex-col gap-1 pt-4 pb-3 border-b">
          {/* <li>
            <DropdownItem
              onItemClick={closeDropdown}
              tag="a"
              to="/profile"
              className="flex items-center gap-3 px-3 py-2"
            >
              Profile
            </DropdownItem>
          </li> */}

          <li>
            <DropdownItem
              onItemClick={() => {
                closeDropdown();
                setPasswordModalOpen(true);
              }}
              className="flex items-center gap-3 px-3 py-2 cursor-pointer"
            >
              Change Password
            </DropdownItem>
          </li>
        </ul>

        {/* 🔥 LOGOUT */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2 mt-3"
        >
          Sign out
        </button>
      </Dropdown>

      <ChangePasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setPasswordModalOpen(false)}
      />

    </div>
  );
}