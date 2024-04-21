import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Navbar component
const Navbar = () => {
  // State for showing logout confirmation dialog
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const navigate = useNavigate(); // Access navigate function from useNavigate hook

  // Function to open logout confirmation dialog
  const openLogoutDialog = () => {
    setShowLogoutDialog(true);
  };

  // Function to close logout confirmation dialog
  const closeLogoutDialog = () => {
    setShowLogoutDialog(false);
  };

  // Function to confirm logout
  const confirmLogout = () => {
    try {
      axios
        .post("http://localhost:3535/logout") // Replace '/api/logout' with your actual logout endpoint
        .then(() => {
          navigate("/"); // Navigate to home page after logout
          setShowLogoutDialog(false); // Close logout dialog
        })
        .catch((error) => {
          // Handle logout error, e.g., display error message
          console.error("Logout failed:", error);
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {/* Navbar */}
      <div className=" bg-primary flex flex-row justify-between p-2 w-full">
        <div className=" flex flex-row justify-between ">
          <img src="../D.png" alt="" className=" px-5 " />
          <p className=" font-semibold text-2xl text-white	">
            Digital<span className=" font-normal text-white	">flake</span>
          </p>
        </div>
        <div className="flex flex-row w-40 justify-evenly">
          {/* Logout button */}
          <button onClick={openLogoutDialog} className="text-red-400 bg-white px-2 rounded-md">
            Logout
          </button>
          {/* User icon */}
          <div className="p-1 px-2 mt-1 rounded-md">
            <FontAwesomeIcon icon={faUser} size="lg" style={{ color: "#ffffff" }} />
          </div>
        </div>
      </div>

      {/* Logout confirmation dialog */}
      {showLogoutDialog && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-25 ">
          <div className="bg-white p-5 rounded w-80">
            <div className="flex flex-row justify-center mt-3 mb-3">
              <FontAwesomeIcon icon={faTriangleExclamation} size="2xl" style={{ color: "#e40609" }} />
              <p className="justify-center pt-1 ml-3 font-semibold text-lg">Logout</p>
            </div>
            <p className="flex flex-row justify-center mt-3 mb-3">Are you sure you want to logout?</p>
            <div className="flex justify-center mt-10 ">
              {/* Cancel button */}
              <button className="mr-3 bg-white px-4 py-2 border-2 border-primary rounded-full" onClick={closeLogoutDialog}>
                Cancel
              </button>
              {/* Confirm button */}
              <button
                className="bg-primary text-white px-4 py-2 rounded-full"
                onClick={() => {
                  confirmLogout();
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
