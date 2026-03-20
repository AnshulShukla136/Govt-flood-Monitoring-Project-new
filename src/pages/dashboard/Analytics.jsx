import { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

export default function Analytics(){

  const [chartData,setChartData] = useState([]);
  const [stats,setStats] = useState({
    total:0,
    danger:0,
    warning:0,
    safe:0
  });

  useEffect(()=>{
    const fetchAnalytics = async ()=>{
      try{
        const token = localStorage.getItem("token");
        const user = JSON.parse(localStorage.getItem("user"));

        let url = "http://localhost:5000/api/water/user";
        if(user?.role === "admin"){
          url = "http://localhost:5000/api/water/all";
        }

        const res = await axios.get(url,{
          headers:{ Authorization: token }
        });

        const list = res.data.data || [];

        const formatted = list.map((i,index)=>({
          name:`Reading ${index+1}`,
          level:i.waterLevel
        }));

        setChartData(formatted);

        setStats({
          total:list.length,
          danger:list.filter(i=>i.status==="Danger").length,
          warning:list.filter(i=>i.status==="Warning").length,
          safe:list.filter(i=>i.status==="Safe").length
        });

      }catch(err){
        console.log("Analytics Error",err);
      }
    };

    fetchAnalytics();
  },[]);

  return(
    <div className="animate-fadeIn">

      <h1 className="text-3xl font-extrabold mb-8 tracking-wide">
        📈 Advanced Analytics & Trends
      </h1>

      {/* ===================== Stats Cards ===================== */}
      <div className="grid md:grid-cols-4 gap-6 mb-10">

        {/* Total */}
        <div className="
          bg-slate-900/80 
          border border-blue-500/40
          p-6 rounded-2xl
          shadow-xl shadow-blue-900/30
          backdrop-blur-xl
          hover:scale-[1.04] transition
        ">
          <p className="text-gray-400">Total Readings</p>
          <h2 className="text-4xl font-extrabold text-blue-400 mt-1">
            {stats.total}
          </h2>
        </div>

        {/* Safe */}
        <div className="
          bg-slate-900/80 
          border border-green-500/40
          p-6 rounded-2xl
          shadow-xl shadow-green-900/30
          backdrop-blur-xl
          hover:scale-[1.04] transition
        ">
          <p className="text-gray-400">Safe Rivers</p>
          <h2 className="text-4xl font-extrabold text-green-400 mt-1">
            {stats.safe}
          </h2>
        </div>

        {/* Warning */}
        <div className="
          bg-slate-900/80 
          border border-yellow-400/40
          p-6 rounded-2xl
          shadow-xl shadow-yellow-900/30
          backdrop-blur-xl
          hover:scale-[1.04] transition
        ">
          <p className="text-gray-400">Warning Alerts</p>
          <h2 className="text-4xl font-extrabold text-yellow-300 mt-1">
            {stats.warning}
          </h2>
        </div>

        {/* Danger */}
        <div className="
          bg-slate-900/80 
          border border-red-500/40
          p-6 rounded-2xl
          shadow-xl shadow-red-900/30
          backdrop-blur-xl
          hover:scale-[1.04] transition
        ">
          <p className="text-gray-400">High Danger Alerts</p>
          <h2 className="text-4xl font-extrabold text-red-400 mt-1">
            {stats.danger}
          </h2>
        </div>

      </div>


      {/* ===================== Trend Chart ===================== */}
      <div className="
        bg-slate-900/80
        p-6
        rounded-2xl
        border border-slate-700
        backdrop-blur-2xl
        shadow-2xl shadow-blue-900/20
      ">

        <h2 className="text-xl font-semibold mb-4 tracking-wide">
          Water Level Trend Analysis
        </h2>

        {chartData.length === 0 ? (
          <p className="text-gray-400">
            No data available yet. Upload readings to view analytics.
          </p>
        ) : (
          <div className="w-full h-[380px]">

            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>

                <defs>
                  <linearGradient id="lineColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#38bdf8" stopOpacity={1}/>
                    <stop offset="100%" stopColor="#2563eb" stopOpacity={0.2}/>
                  </linearGradient>
                </defs>

                <CartesianGrid strokeDasharray="3 3" stroke="#334155"/>
                <XAxis dataKey="name" stroke="#94a3b8"/>
                <YAxis stroke="#94a3b8"/>
                <Tooltip
                  contentStyle={{
                    background:"#020617",
                    border:"1px solid #1e293b",
                    borderRadius:"12px",
                    color:"white"
                  }}
                />

                <Line
                  type="monotone"
                  dataKey="level"
                  stroke="url(#lineColor)"
                  strokeWidth={4}
                  dot={{ r:5, strokeWidth:2, fill:"#38bdf8" }}
                />

              </LineChart>
            </ResponsiveContainer>

          </div>
        )}

      </div>

    </div>
  );
}
