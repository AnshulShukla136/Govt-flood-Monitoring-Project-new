import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect, useState } from "react";
import axios from "axios";
import L from "leaflet";
import { useNavigate } from "react-router-dom";

export default function MapPage(){

  const navigate = useNavigate();
  const [data,setData] = useState([]);
  const [selected,setSelected] = useState(null);

  const [center] = useState([22.9734, 78.6569]); // India Center

  // ================= ICONS =================
  const greenIcon = new L.Icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [25,41],
    iconAnchor: [12,41]
  });

  const yellowIcon = new L.Icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [25,41],
    iconAnchor: [12,41]
  });

  const redIcon = new L.Icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [25,41],
    iconAnchor: [12,41]
  });

  const getIcon = (status)=>{
    if(status==="Danger") return redIcon;
    if(status==="Warning") return yellowIcon;
    return greenIcon;
  };


  // ================= FETCH DATA =================
  useEffect(() => {
    const fetchData = async () => {
      try{
        const token = localStorage.getItem("token");
        const user = JSON.parse(localStorage.getItem("user"));

        let url = "http://localhost:5000/api/water/user";
        if(user?.role === "admin")
          url = "http://localhost:5000/api/water/all";

        const res = await axios.get(url,{
          headers:{ Authorization: token }
        });

        setData(res.data.data || []);

      }catch(err){
        console.log("Map Error",err);
      }
    };

    fetchData();
  },[]);


  return(
    <div className="animate-fadeIn">

      <h1 className="text-4xl font-extrabold mb-6 tracking-wide">
        River GPS Monitoring Map
      </h1>

      <div className="grid md:grid-cols-4 gap-6">


        {/* ================= LEFT PANEL ================= */}
        <div
          className="
            col-span-1 
            bg-slate-900/80
            backdrop-blur-2xl
            border border-slate-700
            rounded-2xl
            p-4
            shadow-2xl shadow-blue-900/30
            h-96
            overflow-y-auto
          "
        >
          <h2 className="text-xl font-semibold mb-4 tracking-wide">
            🌊 Uploaded Rivers
          </h2>

          {data.length===0 ? (
            <p className="text-gray-400">
              No rivers uploaded yet.
            </p>
          ) : (
            data.map(r=>(
              <div
                key={r._id}
                onClick={()=>setSelected(r)}
                className="
                  p-3
                  mb-3
                  rounded-xl
                  border
                  border-slate-700
                  bg-slate-800/80
                  hover:bg-slate-700/80
                  hover:scale-[1.02]
                  transition
                  cursor-pointer
                "
              >
                <p className="font-bold text-blue-300">
                  {r.riverName}
                </p>

                <p className="text-gray-400 text-sm">
                  {r.location}
                </p>
              </div>
            ))
          )}

        </div>



        {/* ================= MAP SECTION ================= */}
        <div
          className="
            col-span-3
            bg-slate-900/80
            border border-slate-700
            rounded-2xl
            shadow-2xl shadow-blue-900/30
            p-4
          "
        >
          <div className="h-[420px] rounded-xl overflow-hidden">

            <MapContainer center={center} zoom={6} className="h-full w-full">

              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>

              {data.map(r=>(
                r.latitude && r.longitude && (
                  <Marker
                    key={r._id}
                    position={[r.latitude,r.longitude]}
                    icon={getIcon(r.status)}
                    eventHandlers={{ click: () => setSelected(r) }}
                  >
                    <Popup>
                      <b>{r.riverName}</b><br/>
                      {r.location}<br/>
                      {r.waterLevel} cm — {r.status}
                    </Popup>
                  </Marker>
                )
              ))}

            </MapContainer>

          </div>
        </div>

      </div>



      {/* ================= DETAILS PANEL ================= */}
      {selected && (
        <div
          className="
            mt-8
            bg-slate-900/80
            backdrop-blur-2xl
            border border-slate-700
            rounded-2xl
            shadow-2xl shadow-blue-900/30
            p-6
          "
        >

          <div className="flex justify-between items-center">
            
            <h2 className="text-3xl font-bold tracking-wide">
              {selected.riverName} — Details
            </h2>

            <button
              onClick={()=>setSelected(null)}
              className="
                px-4 py-2
                bg-red-600
                hover:bg-red-700
                rounded-xl
                shadow-lg
                transition
              "
            >
              Close
            </button>

          </div>


          <div className="mt-4 space-y-2 text-gray-300">
            <p><b>📍 Location:</b> {selected.location}</p>
            <p><b>🌊 Water Level:</b> {selected.waterLevel} cm</p>
            <p><b>⚠ Status:</b> {selected.status}</p>

            {selected.latitude && (
              <p>
                <b>🛰 GPS:</b> {selected.latitude.toFixed(3)}, {selected.longitude.toFixed(3)}
              </p>
            )}

            <p className="text-gray-400 text-sm">
              {new Date(selected.createdAt).toLocaleString()}
            </p>
          </div>


          <button
            onClick={() => navigate("/upload", {state:selected})}
            className="
              mt-5
              px-6 py-3
              bg-blue-600
              hover:bg-blue-700
              rounded-xl
              shadow-lg shadow-blue-900
              font-semibold
              transition
            "
          >
            Upload New Data For This River
          </button>

        </div>
      )}

    </div>
  );
}
