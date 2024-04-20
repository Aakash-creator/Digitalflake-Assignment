import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    // <>
    //   {/* can also use header here for SEO  */}
    //   {/* <nav className="">
    //     <div className={`items-center justify-between w-full md:flex md:w-auto md:order-1`} id="navbar-sticky">
    //       <ul className="flex  p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
    //         <li>
    //           <Link
    //             to="/home"
    //             className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
    //           >
    //             Home
    //           </Link>
    //         </li>
    //         <li>
    //           <Link
    //             to="/category"
    //             className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
    //           >
    //             Category
    //           </Link>
    //         </li>
    //         <li>
    //           <Link
    //             to="/products"
    //             className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
    //           >
    //             Products
    //           </Link>
    //         </li>
    //       </ul>
    //     </div>
    //   </nav> */}

    //   <nav className="w-64 bg-gray-100 dark:bg-gray-800">
    //     <ul className="flex flex-col p-4 space-y-4">
    //       <li>
    //         <Link to="/home" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-200 dark:hover:bg-gray-700 dark:text-white">
    //           Home
    //         </Link>
    //       </li>
    //       <li>
    //         <Link to="/category" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-200 dark:hover:bg-gray-700 dark:text-white">
    //           Category
    //         </Link>
    //       </li>
    //       <li>
    //         <Link to="/products" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-200 dark:hover:bg-gray-700 dark:text-white">
    //           Products
    //         </Link>
    //       </li>
    //     </ul>
    //   </nav>
    //   <Outlet className="" />
    // </>
    <div className="flex h-screen">
      <nav className="w-64 bg-gray-100 dark:bg-gray-800">
        <ul className="flex flex-col p-4 space-y-4">
          <li>
            <Link to="/home" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-200 dark:hover:bg-gray-700 dark:text-white">
              Home
            </Link>
          </li>
          <li>
            <Link to="/category" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-200 dark:hover:bg-gray-700 dark:text-white">
              Category
            </Link>
          </li>
          <li>
            <Link to="/products" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-200 dark:hover:bg-gray-700 dark:text-white">
              Products
            </Link>
          </li>
        </ul>
      </nav>

      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default Sidebar;
