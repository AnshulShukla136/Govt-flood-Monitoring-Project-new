import { useEffect, useState } from "react";
import axios from "axios";

export default function Alerts(){

  const [alerts,setAlerts] = useState([]);

  useEffect(()=>{
    const fetchAlerts = async ()=>{
      try{
        const token = localStorage.getItem("token");
        const user = JSON.parse(localStorage.getItem("user"));

        let url = "http://localhost:5000/api/water/user";
        if(user?.role === "admin") url = "http://localhost:5000/api/water/all";

        const res = await axios.get(url,{
          headers:{ Authorization: token }
        });

        const readings = res.data.data || [];

        // Filter + sort alerts (Danger first)
        const filtered = readings
          .filter(r => r.status === "Warning" || r.status === "Danger")
          .sort((a,b)=>{
            if(a.status === "Danger" && b.status !== "Danger") return -1;
            if(a.status !== "Danger" && b.status === "Danger") return 1;
            return 0;
          });

        setAlerts(filtered);

      }catch(err){
        console.log("Alerts Error",err);
      }
    };

    fetchAlerts();
  },[]);


  return(
    <div className="animate-fadeIn">

      <h1 className="text-3xl font-extrabold mb-6 tracking-wide">
        ⚠️ Flood Risk Alerts
      </h1>

      {/* ===== NO ALERTS STATE ===== */}
      {alerts.length === 0 ? (
        <div className="
          bg-green-500/10 
          border border-green-400/40 
          rounded-2xl 
          p-8 
          shadow-xl 
          backdrop-blur-xl 
          text-center
        ">
          <h2 className="text-3xl font-bold text-green-400">
            ✔ All Rivers Are Safe
          </h2>
          <p className="text-gray-300 mt-2 tracking-wide">
            No warnings or danger alerts currently detected.
          </p>
        </div>
      ):(
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {alerts.map(item => (
            <div
              key={item._id}
              className={`
                relative
                p-6 
                rounded-2xl 
                border 
                backdrop-blur-2xl 
                shadow-2xl
                transition 
                hover:scale-[1.03]
                hover:shadow-[0_0_40px_rgba(0,0,0,0.5)]
                
                ${
                  item.status === "Danger"
                  ? "bg-red-500/10 border-red-500/60 shadow-red-900/50 animate-pulse"
                  : "bg-yellow-400/10 border-yellow-400/60 shadow-yellow-800/40"
                }
              `}
            >

              {/* Glow Ring */}
              <div className="absolute inset-0 rounded-2xl opacity-30 blur-xl"></div>

              <h2 className={`
                text-2xl font-bold tracking-wide
                ${
                  item.status === "Danger"
                  ? "text-red-400"
                  : "text-yellow-300"
                }
              `}>
                {item.status === "Danger" ? "🚨 HIGH DANGER" : "⚠️ WARNING"}
              </h2>

              <div className="mt-3 text-gray-300 space-y-1">
                <p>
                  <span className="font-semibold text-white">River:</span> {item.riverName}
                </p>

                <p>
                  <span className="font-semibold text-white">Location:</span> {item.location}
                </p>

                <p>
                  <span className="font-semibold text-white">Water Level:</span> 
                  <span className="font-bold text-lg ml-1">
                    {item.waterLevel} cm
                  </span>
                </p>
              </div>

              <div className="mt-4 text-sm text-gray-400">
                {new Date(item.createdAt).toLocaleString()}
              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}
