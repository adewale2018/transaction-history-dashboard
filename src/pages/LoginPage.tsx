import CustomButton from "../components/Button";
import TextInput from "../components/TextInput";
import { mockLogin } from "../utils/mockData";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("admin@gmail.com");
  const [password, setPassword] = useState("admin");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log("DATA", { email, password });
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await mockLogin({ email, password });
      if (res && res.status === 200 && res.token) {
        localStorage.setItem("token", res.token);
        navigate("/dashboard");
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="p-5 h-screen flex  justify-center">
      <div className="mt-20 border shadow px-5 md:px-10 rounded py-10">
        <div className="w-full h-full">
          <h2 className="font-mono text-[#166CF3] text-xl font-medium md:text-2xl mb-5">
            Login with your credentials
          </h2>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <p className="text-gray-500 mb-5 font-serif">
            Enter your email and password in the fields below
          </p>

          <form
            onSubmit={handleSubmit}
            autoComplete="off"
            className="container"
          >
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
            <CustomButton type="submit" label="Login" loading={loading} />
          </form>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
