import { useEffect, useState } from "react";
import axios from "axios";
import StatusBadge from "../../components/StatusBadge";

export default function DataList(){

  const [data,setData] = useState([]);
  const [search,setSearch] = useState("");

  useEffect(()=>{
    const fetchData = async ()=>{
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

        setData(res.data.data || []);

      }catch(err){
        console.log("Data Fetch Error",err);
      }
    };

    fetchData();
  },[]);


  const filtered = data.filter(i =>
    i.riverName?.toLowerCase().includes(search.toLowerCase())
  );


  return(
    <div className="animate-fadeIn">

      <h1 className="text-3xl font-extrabold mb-8 tracking-wide">
        📋 Water Readings Data
      </h1>

      {/* ================= SEARCH ================= */}
      <div className="mb-6">
        <input
          className="
            bg-slate-900/80
            p-4
            rounded-2xl
            w-96
            border border-slate-700
            outline-none
            text-white
            shadow-lg shadow-blue-900/20
            focus:border-blue-500
            focus:shadow-blue-600
            transition
          "
          placeholder="🔍 Search river..."
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
        />
      </div>


      {/* ================= TABLE ================= */}
      <div
        className="
          overflow-hidden
          rounded-2xl
          border border-slate-700
          bg-slate-900/80
          shadow-2xl shadow-blue-900/30
          backdrop-blur-2xl
        "
      >

        <table className="w-full">
          <thead className="bg-slate-800 sticky top-0 z-10">
            <tr className="text-gray-300 uppercase text-sm tracking-wide">
              <th className="p-3 text-left">River</th>
              <th className="p-3 text-left">Location</th>
              <th className="p-3 text-center">Level (cm)</th>
              <th className="p-3 text-center">Date</th>
              <th className="p-3 text-center">Status</th>
            </tr>
          </thead>

          <tbody>

            {/* No Data */}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center p-8 text-gray-400">
                  🚫 No records found
                </td>
              </tr>
            )}

            {/* Data Rows */}
            {filtered.map(item => (
              <tr
                key={item._id}
                className="
                  border-b border-slate-700
                  hover:bg-slate-800
                  hover:shadow-xl
                  transition-all
                  duration-300
                  cursor-pointer
                "
              >
                <td className="p-4 font-semibold text-blue-300">
                  {item.riverName}
                </td>

                <td className="p-4 text-gray-300">
                  {item.location}
                </td>

                <td className="p-4 text-center font-bold text-blue-400">
                  {item.waterLevel} cm
                </td>

                <td className="p-4 text-center text-gray-400">
                  {new Date(item.createdAt).toLocaleString()}
                </td>

                <td className="p-4 text-center">
                  <StatusBadge level={item.waterLevel}/>
                </td>
              </tr>
            ))}

          </tbody>
        </table>

      </div>

    </div>
  );
}
