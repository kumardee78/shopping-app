import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function LoginIn() {
  const [userData, setUSerDate] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate()

  function handleChange(e) {
    setUSerDate({ ...userData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setUSerDate({ email: "", password: "" });
    navigate('/')
  }

  return (
    <div className="model-overlay fiexed top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.5)] h-screen flex items-center justify-center z-1000">
      <div className="model-content bg-white p-8 rounded-lg relative w-[25rem] shadow-lg">
        <h2 className="text-3xl text-center font-bold">Login</h2>
        <form action="" method="post" onSubmit={handleSubmit} className="py-6">
          <p>
            <label htmlFor="" className="text-xl">
              Email
            </label>
            <br />
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              className="border w-full p-3 mb-4 mt-2 rounded-lg"
            />
          </p>
          <p>
            <label htmlFor="" className="text-xl ">
              Password
            </label>
            <br />
            <input
              type="password"
              name="password"
              value={userData.password}
              onChange={handleChange}
              className="border w-full p-3 mb-6 mt-2 rounded-lg"
            />
          </p>
          <button
            type="submit"
            className="w-full text-xl bg-blue-500 text-white py-2 rounded-lg"
          >
            Login
          </button>
          <p className="text-center text-xl mt-6">
            Not a member?
            <Link to="/register" className="text-blue-600 hover:underline ml-3">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginIn;
