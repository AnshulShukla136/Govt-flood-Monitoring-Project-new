import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../api.jsx";

export default function Login(){

  const navigate = useNavigate();

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [userCaptcha, setUserCaptcha] = useState("");
  const [loading,setLoading] = useState(false);

  // Generate random captcha
  const generateCaptcha = () => {
    const code = Math.floor(100000 + Math.random() * 900000);
    setCaptcha(code.toString());
  };

  useEffect(()=> generateCaptcha(), []);

  const handleLogin = async () => {

    if(!email || !password){
      alert("Please fill all fields");
      return;
    }

    if(userCaptcha !== captcha){
      alert("Captcha incorrect ❌");
      generateCaptcha();
      setUserCaptcha("");
      return;
    }

    try {
      setLoading(true);

      const res = await loginUser({ email, password });

      if(res.data.success){
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));

        alert("Login Successful 🎯");
        navigate("/dashboard");
      } 
      else {
        alert(res.data.message);
      }

    } catch (err) {
      console.log(err);
      alert("Login failed. Check backend or credentials.");
    }
    finally{
      setLoading(false);
    }
  };


  return(
    <div className="
      min-h-screen 
      flex justify-center items-center
      bg-gradient-to-br from-black via-slate-900 to-blue-900
    ">

      <div className="
        w-full max-w-md 
        bg-white/10 
        backdrop-blur-2xl 
        border border-white/20 
        rounded-2xl 
        p-8 
        shadow-[0_0_60px_#0ea5e9]
        animate-fadeIn
      ">

        <h2 className="text-4xl font-extrabold text-center mb-2 tracking-wide">
          Secure Login
        </h2>

        <p className="text-gray-300 text-center mb-8 text-sm">
          Government Flood Monitoring Portal
        </p>


        {/* Email */}
        <input
          className="
            w-full p-3 
            bg-slate-900/70 
            text-white 
            rounded-xl mb-4 
            outline-none 
            border border-slate-700
            focus:ring-2 focus:ring-blue-500
          "
          placeholder="Email Address"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />

        {/* Password */}
        <input
          className="
            w-full p-3 
            bg-slate-900/70 
            rounded-xl 
            text-white mb-6 
            outline-none 
            border border-slate-700
            focus:ring-2 focus:ring-blue-500
          "
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />


        {/* CAPTCHA BOX */}
        <div className="
          bg-slate-900/80 
          border border-slate-700 
          rounded-xl 
          p-4 
          mb-4 
          flex justify-between items-center
          shadow-inner
        ">
          <span className="
            text-3xl 
            font-extrabold 
            tracking-widest 
            text-blue-400 
            select-none
          ">
            {captcha}
          </span>

          <button
            onClick={generateCaptcha}
            className="
              px-4 py-2 
              bg-yellow-500 
              hover:bg-yellow-600 
              rounded-xl 
              text-black 
              font-semibold
            "
          >
            Refresh
          </button>
        </div>


        {/* CAPTCHA INPUT */}
        <input
          className="
            w-full p-3 
            bg-slate-900/70 
            rounded-xl 
            text-white mb-6 
            outline-none 
            border border-slate-700
            focus:ring-2 focus:ring-blue-500
          "
          placeholder="Enter Captcha"
          value={userCaptcha}
          onChange={(e)=>setUserCaptcha(e.target.value)}
        />


        {/* LOGIN BUTTON */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="
            w-full py-3 
            rounded-xl 
            bg-blue-600 
            hover:bg-blue-700 
            transition 
            text-lg 
            font-semibold 
            shadow-lg shadow-blue-800
            disabled:opacity-60
            disabled:cursor-not-allowed
          "
        >
          {loading ? "Authenticating..." : "Login Securely"}
        </button>


        <p className="text-gray-400 text-center mt-6 text-sm">
          Don’t have an account?
          <Link to="/register" className="text-blue-400 font-semibold">
            {" "}Register
          </Link>
        </p>

      </div>

    </div>
  );
}
