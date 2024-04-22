import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SignIn = () => {
  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  const navigate = useNavigate();
  const [showForgetPasswordDialog, setShowForgetPasswordDialog] = useState(false);

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

  const handleForgetPassword = () => {
    setShowForgetPasswordDialog(true);
  };

  const handleCloseForgetPasswordDialog = () => {
    setShowForgetPasswordDialog(false);
  };

  const handleSendResetPasswordEmail = () => {
    try {
      axios.post("http://localhost:3535/forgotpassword", { email }).then((res) => {
        console.log(res.data);
      });
    } catch (error) {
      console.error(error);
    }
    handleCloseForgetPasswordDialog();
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
                <button onClick={handleForgetPassword} className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Forget Password?
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      {/* Forget Password Dialog */}
      {showForgetPasswordDialog && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-25">
          <div className="bg-white p-5 rounded ">
            <div>
              <div className="flex flex-row justify-center mt-3 mb-3">
                <p className="justify-center text-primary pt-1 ml-3 font-semibold text-lg">Did you forget your password?</p>
              </div>
              <p className="flex flex-row justify-center mt-3 mb-3 px-3">Enter your email address and we will send you a link to restore password</p>
            </div>
            <div className=" flex flex-col justify-center content-center w-full px-20 my-5">
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
            <div className="flex flex-col justify-center px-20">
              <div className=" flex flex-col justify-center content-center">
                <button className="bg-primary text-white px-4 py-2 rounded-full mt-4" onClick={handleSendResetPasswordEmail}>
                  Request reset link
                </button>
                <button className="mr-3 bg-white px-4 py-2 underline" onClick={handleCloseForgetPasswordDialog}>
                  Back to login
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SignIn;
