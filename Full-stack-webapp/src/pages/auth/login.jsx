import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();

  const [showpassword, setshowpassword] = useState(false);

  const [formData, setFormData] = useState({
    set_username: "",
    confirm_password: "",
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    // Clear the specific field error when the user starts typing
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    // Clear previous errors
    setErrors({});

    // Validation logic
    const newErrors = {};

    if (!formData.set_username.trim()) {
      newErrors.set_username = "Username is required";
    }

    if (!formData.confirm_password.trim()) {
      newErrors.confirm_password = "Password is required";
    }

    // If there are errors, set them and prevent form submission
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/v1/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      console.log("Response status:", response.status);

      if (response.ok) {
        // Handle successful login
        const successData = await response.json();

        // Store the token or perform any other action here
        navigate("/admindashboard");
        toast.success(successData.message);
        console.log("Login successful:", successData.message);
      } else {
        // Handle login error
        const errorData = await response.json();
        toast.error(errorData.message || "Login failed");
        console.error("Login failed:", errorData.message || "Unknown error");
      }
    } catch (error) {
      console.error("Login failed:", error.message);
    }
  };

  console.log(formData);

  return (
    <div className="container mx-auto">
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col gap-5 p-4 rounded bg-white lg:w-1/4 md:w-1/2 sm:w-4/5 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
          <div className="flex flex-col justify-center items-center">
            <p className="font-serif text-4xl font-bold text-center text-black">
              Login
            </p>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-black">Username</label>

              <input
                type="text"
                name="set_username"
                value={formData.set_username}
                onChange={handleInputChange}
                className="h-12 pl-2 text-black bg-white border rounded outline-none shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
                autoComplete="off"
                autoFocus="on"
              />

              {errors.set_username && (
                <p className="text-red-500 text-sm">{errors.set_username}</p>
              )}
            </div>

            <div className="relative flex flex-col gap-2">
              <label className="text-black ">Password</label>

              <input
                type={showpassword ? "text" : "password"}
                name="confirm_password"
                value={formData.confirm_password}
                onChange={handleInputChange}
                className="h-12 pl-2 text-black bg-white border rounded outline-none shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
                autoComplete="off"
                autoFocus="off"
              />

              <div
                className="absolute top-10 right-1"
                onClick={() => setshowpassword(!showpassword)}
              >
                {showpassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="black"
                      d="m16.1 13.3l-1.45-1.45q.225-1.175-.675-2.2t-2.325-.8L10.2 7.4q.425-.2.863-.3T12 7q1.875 0 3.188 1.313T16.5 11.5q0 .5-.1.938t-.3.862Zm3.2 3.15l-1.45-1.4q.95-.725 1.688-1.587T20.8 11.5q-1.25-2.525-3.588-4.013T12 6q-.725 0-1.425.1T9.2 6.4L7.65 4.85q1.025-.425 2.1-.638T12 4q3.575 0 6.425 1.887T22.7 10.8q.075.125.1.313t.025.387q0 .2-.037.388t-.088.312q-.575 1.275-1.437 2.35t-1.963 1.9Zm-.2 5.45l-3.5-3.45q-.875.275-1.762.413T12 19q-3.575 0-6.425-1.888T1.3 12.2q-.075-.125-.1-.312t-.025-.388q0-.2.025-.375t.1-.3Q1.825 9.7 2.55 8.75T4.15 7L2.075 4.9Q1.8 4.625 1.8 4.212t.3-.712q.275-.275.7-.275t.7.275l17 17q.275.275.288.688t-.288.712q-.275.275-.7.275t-.7-.275ZM5.55 8.4q-.725.65-1.325 1.425T3.2 11.5q1.25 2.525 3.588 4.013T12 17q.5 0 .975-.063t.975-.137l-.9-.95q-.275.075-.525.113T12 16q-1.875 0-3.188-1.312T7.5 11.5q0-.275.038-.525t.112-.525L5.55 8.4Zm7.975 2.325ZM9.75 12.6Z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="black"
                      d="M12 16q1.875 0 3.188-1.313T16.5 11.5q0-1.875-1.313-3.188T12 7q-1.875 0-3.188 1.313T7.5 11.5q0 1.875 1.313 3.188T12 16Zm0-1.8q-1.125 0-1.913-.788T9.3 11.5q0-1.125.788-1.913T12 8.8q1.125 0 1.913.788T14.7 11.5q0 1.125-.787 1.913T12 14.2Zm0 4.8q-3.65 0-6.65-2.038T1 11.5q1.35-3.425 4.35-5.463T12 4q3.65 0 6.65 2.038T23 11.5q-1.35 3.425-4.35 5.463T12 19Zm0-7.5Zm0 5.5q2.825 0 5.188-1.488T20.8 11.5q-1.25-2.525-3.613-4.013T12 6Q9.175 6 6.812 7.488T3.2 11.5q1.25 2.525 3.613 4.013T12 17Z"
                    />
                  </svg>
                )}
              </div>

              {errors.confirm_password && (
                <p className="text-red-500 text-sm">
                  {errors.confirm_password}
                </p>
              )}
            </div>

            <button className="bg-blue-600 text-white h-10">Login</button>
          </form>

          <hr></hr>

          <div className="flex justify-center items-center">
            <p>Don't have an account? </p>

            <Link
              className="font-bold hover:text-blue-800"
              to="/adminregiester"
            >
              &nbsp;Click here to register
            </Link>
          </div>
          <div className="flex justify-center items-center">
            <Link
              className="font-bold hover:text-blue-800"
              to="/adminregiester"
            >
              &nbsp;Forgot Password?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
