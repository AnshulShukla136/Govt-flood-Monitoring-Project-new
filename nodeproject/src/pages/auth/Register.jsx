import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../api.jsx";

export default function Register(){

  const navigate = useNavigate();

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [role,setRole] = useState("user");

  const [captcha,setCaptcha] = useState("");
  const [userCaptcha,setUserCaptcha] = useState("");
  const [loading,setLoading] = useState(false);

  // Generate Captcha
  const generateCaptcha = () => {
    const code = Math.floor(100000 + Math.random() * 900000);
    setCaptcha(code.toString());
  };

  useEffect(()=> generateCaptcha(), []);

  const handleRegister = async ()=>{

    if(!name || !email || !password){
      alert("Please fill all fields");
      return;
    }

    if(userCaptcha !== captcha){
      alert("Captcha incorrect ❌");
      generateCaptcha();
      setUserCaptcha("");
      return;
    }

    try{
      setLoading(true);

      const res = await registerUser({name,email,password,role});

      if(res.data.success){
        alert("Registered Successfully 🎯");
        navigate("/");
      }
      else{
        alert(res.data.message);
      }

    }
    catch(err){
      console.log(err);
      alert("Registration Failed");
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
        shadow-[0_0_60px_#16a34a]
        animate-fadeIn
      ">

        <h2 className="text-4xl font-extrabold text-center mb-2 tracking-wide">
          Create Secure Account
        </h2>

        <p className="text-gray-300 text-center mb-8 text-sm">
          Register as Government Admin or Field Officer
        </p>


        {/* INPUTS */}
        <input
          className="
            w-full p-3 
            bg-slate-900/70 
            text-white rounded-xl 
            mb-4 border border-slate-700 
            outline-none
            focus:ring-2 focus:ring-green-500
          "
          placeholder="Full Name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
        />

        <input
          className="
            w-full p-3 
            bg-slate-900/70 
            text-white rounded-xl 
            mb-4 border border-slate-700 
            outline-none
            focus:ring-2 focus:ring-green-500
          "
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          className="
            w-full p-3 
            bg-slate-900/70 
            text-white rounded-xl 
            mb-4 border border-slate-700 
            outline-none
            focus:ring-2 focus:ring-green-500
          "
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />

        <select
          className="
            w-full p-3 
            bg-slate-900/70 
            text-white rounded-xl 
            mb-4 border border-slate-700 
            outline-none
            focus:ring-2 focus:ring-green-500
          "
          value={role}
          onChange={(e)=>setRole(e.target.value)}
        >
          <option value="user">User / Field Officer</option>
          <option value="admin">Admin</option>
        </select>


        {/* CAPTCHA BOX */}
        <div className="
          bg-slate-900/80 
          border border-slate-700 
          rounded-xl 
          p-4 
          mb-4 
          flex justify-between items-center
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
            text-white rounded-xl 
            mb-6 border border-slate-700 
            outline-none
            focus:ring-2 focus:ring-green-500
          "
          placeholder="Enter Captcha"
          value={userCaptcha}
          onChange={(e)=>setUserCaptcha(e.target.value)}
        />


        {/* REGISTER BUTTON */}
        <button
          onClick={handleRegister}
          disabled={loading}
          className="
            w-full py-3 
            bg-green-600 
            rounded-xl 
            hover:bg-green-700 
            transition 
            shadow-lg shadow-green-800
            text-lg font-semibold
            disabled:opacity-60
            disabled:cursor-not-allowed
          "
        >
          {loading ? "Creating Account..." : "Register Securely"}
        </button>


        <p className="text-gray-400 text-center mt-5 text-sm">
          Already have an account?
          <Link to="/" className="text-blue-400 font-semibold"> Login</Link>
        </p>

      </div>

    </div>
  );
}
