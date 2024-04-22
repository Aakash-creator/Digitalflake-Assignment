import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SignIn = () => {
  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  const navigate = useNavigate();

  const handelsubmit = (e) => {
    e.preventDefault();
    console.log(email, password);

    try {
      axios
        .post("http://localhost:3535/login", { email, password })
        .then((result) => {
          console.log(result);
          if (result.data === "Login Sucessfull!") {
            navigate("/home");
          } else {
            alert("Admin does not exist, register admin before trying");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full  bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className=" flex flex-col">
              <Link to="#" className="flex flex-col items-center  my-6 justify-center mb-3 text-2xl  text-gray-900 dark:text-white">
                <img className="w-8 flex items-center h-8 mr-2" src="../D60.png" alt="" />
                <hr />
                <div>
                  <span className=" font-semibold">digital</span>flake
                </div>
              </Link>
            </div>
            <p className="  flex justify-center">Welcome to Digitalflake Admin</p>
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <form className="space-y-4 md:space-y-6" onSubmit={handelsubmit}>
                <div>
                  <label htmlFor="email" className=" block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    onChange={(e) => {
                      setemail(e.target.value);
                    }}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required=""
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    onChange={(e) => {
                      setpassword(e.target.value);
                    }}
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                  />
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-primary hover:bg-primary focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary dark:hover:bg-primary dark:focus:ring-blue-800"
                >
                  Login
                </button>
                <button className="text-sm font-light text-gray-500 dark:text-gray-400">Forget Password?</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignIn;
