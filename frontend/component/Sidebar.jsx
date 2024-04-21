import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faList, faBoxesPacking } from "@fortawesome/free-solid-svg-icons";

// Sidebar component
const Sidebar = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <nav className="w-64 bg-gray-100 dark:bg-gray-800">
        <ul className="flex flex-col p-4 space-y-4">
          {/* Home link */}
          <li>
            <Link to="/home" className="flex py-2 px-3 text-gray-900 rounded hover:bg-gray-200 dark:hover:bg-gray-700 dark:text-white ">
              <FontAwesomeIcon className=" mr-4 " icon={faHouse} size="xl" />
              <p className=" font-semibold text-lg">Home</p>
            </Link>
          </li>
          {/* Category link */}
          <li>
            <Link to="/category" className=" flex py-2 px-3 text-gray-900 rounded hover:bg-gray-200 dark:hover:bg-gray-700 dark:text-white">
              <FontAwesomeIcon icon={faList} className=" mr-4 " size="xl" />
              <p className=" font-semibold text-lg">Category</p>
            </Link>
          </li>
          {/* Products link */}
          <li>
            <Link to="/products" className="flex py-2 px-3 text-gray-900 rounded hover:bg-gray-200 dark:hover:bg-gray-700 dark:text-white">
              <FontAwesomeIcon icon={faBoxesPacking} size="xl" className=" mr-4 " />
              <p className=" font-semibold text-lg">Products</p>
            </Link>
          </li>
        </ul>
      </nav>

      {/* Content */}
      <div className="flex-1">
        <Outlet /> {/* Render nested routes */}
      </div>
    </div>
  );
};

export default Sidebar;
