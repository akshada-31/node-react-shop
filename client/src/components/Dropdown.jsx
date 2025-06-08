
"use client";
import { Dropdown, DropdownItem } from "flowbite-react";
import { Link } from "react-router-dom"; // Keep Link for navigation items
import { useNavigate } from "react-router-dom"; // Import useNavigate for programmatic navigation

export function UserDropdown({ logoutHandler }) {
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleLogout = () => {
    logoutHandler(); // Call the logout function passed as a prop
    // Optionally, navigate to the home page or login page after logout
    navigate("/"); // Redirect to the home page after logout
  };

  return (
    <Dropdown label="User" dismissOnClick={false}>
      {/* For navigation, use Link directly inside DropdownItem */}

      <Link to="/order-history"><DropdownItem>Order History</DropdownItem></Link>


      {/* For actions like Sign Out, use the onClick directly on DropdownItem */}
      <DropdownItem onClick={handleLogout}>
        Sign out
      </DropdownItem>
    </Dropdown>
  );
}