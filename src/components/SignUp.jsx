import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";



function SignUp() {
  const [userData, setUSerDate] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  function handleChange(e) {
    setUSerDate({ ...userData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        userData.email,
        userData.password
      );
      await updateProfile(userCredential.user, {displayName: userData.username})
      navigate("/loggedin");
    } catch (error) {
      alert(`${error.message}`);
    }
    setUSerDate({ username: "", email: "", password: "" });
  }

  return (
    <div className="model-overlay fiexed top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.5)] py-20 flex items-center justify-center z-1000">
      <div className="model-content bg-white p-8 rounded-lg relative w-[25rem] shadow-lg">
        <h2 className="text-3xl text-center font-bold">Register</h2>
        <form action="" method="post" onSubmit={handleSubmit} className="py-6">
          <p>
            <label htmlFor="" className="text-xl ">
              Username
            </label>
            <br />
            <input
              type="text"
              name="username"
              value={userData.username}
              onChange={handleChange}
              className="border w-full p-3 mb-4 mt-2 rounded-lg"
            />
          </p>
          <p>
            <label htmlFor="" className="text-xl ">
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
            Register
          </button>
          <p className="text-center text-xl mt-6">
            Alerady a member?{" "}
            <Link to="/loggedin" className="text-blue-600 hover:underline ">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
