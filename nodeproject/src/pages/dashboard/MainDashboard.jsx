import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../../components/Card";

export default function MainDashboard() {

  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{

    const fetchStats = async () => {
      try{
        const token = localStorage.getItem("token");
        const user = JSON.parse(localStorage.getItem("user"));

        if(!user){
          alert("Login first");
          return;
        }

        if(user.role === "admin"){
          const res = await axios.get("http://localhost:5000/api/stats",{
            headers:{ Authorization: token }
          });
          setStats(res.data.data);
        }
        else{
          setStats({
            totalReadings:"Restricted",
            countDanger:"N/A",
            countSafe:"N/A",
            latest:null
          });
        }

      }catch(err){
        console.log("Dashboard Error:",err);
      }
      finally{
        setLoading(false);
      }
    };

    fetchStats();
  },[]);

  return (
    <div className="animate-fadeIn">

      {/* ================= Title ================= */}
      <h1 className="text-4xl font-extrabold mb-8 tracking-wide">
        Dashboard Overview
      </h1>


      {/* ================= Loading Animation ================= */}
      {loading && (
        <div className="bg-slate-900/60 border border-slate-700 rounded-2xl p-6 text-center shadow-xl backdrop-blur-xl">
          <p className="text-gray-300 text-lg animate-pulse">
            Fetching real-time statistics...
          </p>
        </div>
      )}


      {/* ================= Admin Cards ================= */}
      {!loading && stats && (
        <div className="grid md:grid-cols-3 gap-8">

          <Card
            title="Total Water Readings"
            value={stats.totalReadings || 0}
            color="blue"
          />

          <Card
            title="High Risk Alerts"
            value={stats.countDanger || 0}
            color="red"
          />

          <Card
            title="Safe Rivers"
            value={stats.countSafe || 0}
            color="green"
          />

        </div>
      )}


      {/* ================= Latest Records ================= */}
      {!loading && stats?.latest && (
        <div
          className="
            mt-10
            bg-slate-900/80
            backdrop-blur-2xl
            border border-slate-700
            rounded-2xl
            shadow-2xl shadow-blue-900/30
            p-6
          "
        >
          
          <h2 className="text-2xl font-semibold mb-4 tracking-wide">
            Latest Uploaded Readings
          </h2>

          <div className="space-y-4">

            {stats.latest.map(item => (
              <div
                key={item._id}
                className="
                  bg-slate-800/80
                  border border-slate-700
                  rounded-xl
                  p-4
                  flex justify-between items-center
                  hover:scale-[1.01]
                  hover:shadow-xl
                  hover:bg-slate-700/80
                  transition-all
                  duration-300
                "
              >
                
                <div>
                  <p className="text-lg font-semibold text-blue-300">
                    {item.riverName}
                  </p>

                  <p className="text-gray-400 text-sm">
                    {item.location} • {new Date(item.createdAt).toLocaleString()}
                  </p>
                </div>

                <span
                  className={`
                    px-4 py-2 rounded-full text-sm font-bold
                    ${
                      item.status === "Danger"
                        ? "bg-red-500/30 text-red-400 border border-red-400/40 animate-pulse"
                        : item.status === "Warning"
                        ? "bg-yellow-500/30 text-yellow-300 border border-yellow-300/40"
                        : "bg-green-500/30 text-green-400 border border-green-400/40"
                    }
                  `}
                >
                  {item.status}
                </span>

              </div>
            ))}

          </div>

        </div>
      )}

    </div>
  );
}
