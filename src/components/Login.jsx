import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../features/authSlice";
import { auth } from "../Utils/firebase";
import { Link } from "react-router-dom";
import bgImage from "../assets/LoginBg.png";
import Logo from "../assets/Logo.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      dispatch(login(userCredential.user));
      navigate("/");
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div className="flex justify-end relative overflow-y-hidden">
        <img src={bgImage} alt="" className="w-full h-screen" />
      <div className="absolute z-1 flex w-2/3 my-10 mx-16 rounded-lg overflow-hidden">
        {/* Left Side */}
        <div className="w-1/2 flex flex-col mt-32">
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
        <div className="w-2/3 p-10 bg-white rounded-t-xl">
          <p className="text-lg font-semibold">WELCOME BACK!</p>
          <h2 className="text-3xl font-bold mb-4">Log In to your Account</h2>
          <form onSubmit={handleLogin}>
            <label htmlFor="email" className="text-lg">Email</label>
            <input type="email" name="email" placeholder="Type here..." className="w-full p-2 border rounded mb-3" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <label htmlFor="password">Password</label>
            <input type="password" name="password" placeholder="Type here..." className="w-full p-2 border rounded mb-2" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <div className="flex justify-between items-center mb-4">
              <label className="flex items-center">
                <input type="checkbox" checked={rememberMe} onChange={() => setRememberMe(!rememberMe)} className="mr-2" />
                Remember me
              </label>
              <a href="#" className="text-blue-500 text-sm">Forgot Password?</a>
            </div>
            <button type="submit" className="w-full bg-red-500 text-white py-2 rounded">Log In</button>
          </form>
          <div className="text-center my-2">Or</div>
          <button className="w-full flex items-center justify-center border p-2 rounded">
            <img src="https://img.icons8.com/color/20/google-logo.png" alt="Google" className="mr-2" />
            Log in with Google
          </button>
          <p className="text-center mt-3">New User? <Link to="/signup" className="text-blue-500 font-bold">SIGN UP HERE</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
