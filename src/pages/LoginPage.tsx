import { MockLoginRes, mockLogin, setAuthEmail } from "../features/auth/authSlice";
import { useEffect, useState } from "react";

import CustomButton from "../components/Button";
import TextInput from "../components/TextInput";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      const res: MockLoginRes = await dispatch(
        mockLogin({ email, password }) as any
      ).unwrap();
      if (res.status === 200 && res.token) {
        toast.success("You are successfully logged in");
        window.localStorage.setItem("token", res.token);
        window.localStorage.setItem("userEmail", email);
        dispatch(setAuthEmail(email));
        navigate("/dashboard");
      }
    } catch (error: any) {
      setError(error.message || "Something went wrong!.");
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.localStorage.removeItem("token");
  }, [])

  return (
    <section className="px-3 flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white border shadow-md px-5 md:px-10 rounded py-10">
        <h2 className="font-mono text-[#166CF3] text-xl font-bold md:text-2xl mb-5">
          Login with your credentials
        </h2>
        {error && (
          <p className="text-red-500 font-mono text-sm mb-4">{error}</p>
        )}
        <p className="mb-5 font-serif">
          Enter your email and password in the fields below.
        </p>

        <form onSubmit={handleSubmit} autoComplete="off" className="container">
          <TextInput
            id="email"
            name="email"
            value={email}
            type="email"
            placeholder="Enter your email"
            label="Email"
            required
            handleChange={(e) => setEmail(e.target.value)}
          />
          <TextInput
            id="password"
            name="password"
            value={password}
            type="password"
            placeholder="Enter your password"
            label="Password"
            handleChange={(e) => setPassword(e.target.value)}
            required
          />
          <CustomButton
            type="submit"
            label="Login"
            disabled={email === "" || password === ""}
            loading={loading}
          />
        </form>
        <p className="mt-5 text-red-700 animate-bounce">
          <p className="underline">Credentials:</p>
          <ul className="font-serif">
            <li className='text-sm'>Email: <span className="text-blue-400">admin@gmail.com</span></li>
            <li className='text-sm'>Password: <span className="text-blue-400">admin</span></li>
          </ul>
        </p>
      </div>
    </section>
  );
};

export default LoginPage;
