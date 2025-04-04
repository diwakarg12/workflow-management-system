import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useDispatch } from "react-redux";
import { login } from "../features/authSlice";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import bgImage from "../assets/LoginBg.png";
import Logo from "../assets/Logo.png";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update profile with display name
      await updateProfile(user, { displayName: name });

      // Dispatch user details to Redux
      dispatch(
        login({
          uid: user.uid,
          email: user.email,
          displayName: name,
        })
      );

      // Navigate to home page
      navigate("/");
    } catch (error) {
      console.error("Signup failed", error);
    }
  };

  return (
    <div className="flex md:justify-end justify-center relative overflow-y-hidden">
            <img src={bgImage} alt="" className="w-full h-screen" />
          <div className="absolute z-1 flex flex-col md:flex-row w-full items-center sm:w-2/3 my-10 md:mx-16 rounded-lg overflow-hidden">
            {/* Left Side */}
            <div className="flex-col md:w-1/2 w-2/3 md:mt-1 my-10 hidden md:flex">
              <div className="flex gap-x-1 items-center">
                <img src={Logo} alt="Logo" className="w-10" />
                <h1 className="text-3xl font-bold text-gray-200">HighBridge</h1>
              </div>
              <div className="mt-12 flex flex-col text-white">
                <p className="text-lg font-semibold mt-4">Building the Future...</p>
                <p className="text-sm mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
              </div>
            </div>
            {/* Right Side */}
            <div className="md:w-2/3 w-11/12 p-10 2xl:py-24 bg-white rounded-t-xl xl:rounded-xl">
              <p className="text-lg font-semibold">WELCOME TO HIGHBRIDGE!</p>
              <h2 className="text-3xl font-bold mb-4">Create your Account Here</h2>
              <form onSubmit={handleSignup}>
                <label htmlFor="name" className="text-lg">Name</label>
                <input type="text" name="name" placeholder="Type here..." className="w-full p-2 border rounded mb-3" value={name} onChange={(e) => setName(e.target.value)} required />
                <label htmlFor="email" className="text-lg">Email</label>
                <input type="email" name="email" placeholder="Type here..." className="w-full p-2 border rounded mb-3" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <label htmlFor="password">Password</label>
                <input type="password" name="password" placeholder="Type here..." className="w-full p-2 border rounded mb-3" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit" className="w-full cursor-pointer bg-red-500 text-white py-3 rounded my-4">Sign Up</button>
              </form>
              <p className="text-center mt-3">Already Member? <Link to="/login" className="text-blue-500 font-bold">LOGIN HERE</Link></p>
            </div>
          </div>
        </div>
  );
};

export default Signup;
