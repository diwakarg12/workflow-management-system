import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import { login } from "../features/authSlice";
import { auth } from "../Utils/firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      dispatch(login(userCredential.user));
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>
        <form onSubmit={handleLogin}>
          <input type="email" placeholder="Email" className="w-full p-2 border rounded mb-2"
            value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" className="w-full p-2 border rounded mb-4"
            value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
