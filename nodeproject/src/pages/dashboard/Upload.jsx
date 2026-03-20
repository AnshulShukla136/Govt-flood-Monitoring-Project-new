import { useEffect, useState } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

export default function Upload() {

  const [riverName, setRiverName] = useState("");
  const [location, setLocation] = useState("");
  const [waterLevel, setWaterLevel] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [gps, setGps] = useState({ lat: null, lng: null });
  const [data, setData] = useState([]);

  const indiaCenter = [22.9734, 78.6569];

  // ================= ICONS =================
  const greenIcon = new L.Icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41]
  });

  const yellowIcon = new L.Icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41]
  });

  const redIcon = new L.Icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41]
  });

  const getIcon = (status) => {
    if (status === "Danger") return redIcon;
    if (status === "Warning") return yellowIcon;
    return greenIcon;
  };


  // ================= FETCH DATA =================
  useEffect(() => {
    const load = async () => {
      try {
        const token = localStorage.getItem("token");
        const user = JSON.parse(localStorage.getItem("user"));

        let url = "http://localhost:5000/api/water/user";
        if (user?.role === "admin") url = "http://localhost:5000/api/water/all";

        const res = await axios.get(url, {
          headers: { Authorization: `Bearer ${token}` }
        });

        setData(res.data.data || []);
      }
      catch (err) {
        console.log("Map fetch failed", err);
      }
    };

    load();
  }, []);



  // ================= IMAGE SELECT =================
  const handleImage = e => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };


  // ================= GPS =================
  const fetchGPS = () => {
    if (!navigator.geolocation) {
      alert("GPS Not Supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(pos => {
      setGps({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude
      });
      alert("GPS Captured Successfully ✔");
    });
  };


  // ================= SUBMIT =================
  const handleSubmit = async () => {

    if (!riverName || !location || !image || !waterLevel) {
      alert("Please fill all fields including Water Level & upload image");
      return;
    }

    if (isNaN(waterLevel)) {
      alert("Water Level must be a number");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("riverName", riverName);
      formData.append("location", location);
      formData.append("waterLevel", waterLevel);

      if (gps.lat) {
        formData.append("latitude", gps.lat);
        formData.append("longitude", gps.lng);
      }

      formData.append("image", image);

      const res = await axios.post(
        "http://localhost:5000/api/water/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
          }
        }
      );

      if (res.data.success) {
        alert("Water Data Uploaded Successfully ✔");

        setRiverName("");
        setLocation("");
        setWaterLevel("");
        setPreview(null);
        setImage(null);
      }
      else {
        alert(res.data.message);
      }

    } catch (err) {
      console.log(err.response?.data || err);
      alert(err.response?.data?.message || "Upload Failed");
    }
    finally {
      setLoading(false);
    }
  };


  return (
    <div className="animate-fadeIn">

      <h1 className="text-4xl font-extrabold mb-6 tracking-wide">
        Upload Water Level Reading
      </h1>


      <div className="grid md:grid-cols-2 gap-8">


        {/* ================= FORM ================= */}
        <div className="
          bg-slate-900/80 
          p-6 
          rounded-2xl 
          border border-slate-700
          shadow-2xl shadow-blue-900/30
          backdrop-blur-2xl
        ">

          <h2 className="text-xl font-semibold mb-4 tracking-wide">
            Enter River Details
          </h2>

          <input
            className="w-full p-3 bg-slate-800 rounded-xl border border-slate-700 mb-4 text-white outline-none"
            placeholder="River Name"
            value={riverName}
            onChange={e => setRiverName(e.target.value)}
          />

          <input
            className="w-full p-3 bg-slate-800 rounded-xl border border-slate-700 mb-4 text-white outline-none"
            placeholder="Location"
            value={location}
            onChange={e => setLocation(e.target.value)}
          />

          <input
            type="number"
            className="w-full p-3 bg-slate-800 rounded-xl border border-slate-700 mb-4 text-white outline-none"
            placeholder="Water Level (cm)"
            value={waterLevel}
            onChange={e => setWaterLevel(e.target.value)}
          />

          <input
            className="w-full mb-4 text-gray-300"
            type="file"
            accept="image/*"
            onChange={handleImage}
          />

          <div className="flex gap-4 mb-5">
            <button
              onClick={fetchGPS}
              className="
                flex-1 py-3 
                bg-yellow-500 
                hover:bg-yellow-600 
                rounded-xl 
                transition 
                text-black
                font-semibold
              "
            >
              Capture GPS
            </button>

            <button
              onClick={handleSubmit}
              className="
                flex-1 py-3 
                bg-blue-600 
                hover:bg-blue-700 
                rounded-xl 
                transition 
                text-white 
                font-semibold 
                shadow-lg shadow-blue-900
              "
              disabled={loading}
            >
              {loading ? "Uploading..." : "Submit"}
            </button>
          </div>

          {gps.lat && (
            <p className="text-green-400 text-sm">
              GPS Attached ✔ ({gps.lat.toFixed(3)}, {gps.lng.toFixed(3)})
            </p>
          )}

        </div>



        {/* ================= MAP + PREVIEW ================= */}
        <div className="
          bg-slate-900/80 
          p-6 
          rounded-2xl 
          border border-slate-700
          shadow-2xl
          backdrop-blur-2xl
          text-center
        ">

          <h2 className="text-xl font-semibold mb-4 tracking-wide">
            Select River From Map
          </h2>

          <div className="h-64 rounded-xl overflow-hidden border border-slate-700 mb-5">

            <MapContainer center={indiaCenter} zoom={6} className="h-full w-full">

              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

              {data.map(r => (
                r.latitude && r.longitude && (
                  <Marker
                    key={r._id}
                    position={[r.latitude, r.longitude]}
                    icon={getIcon(r.status)}
                    eventHandlers={{
                      click: () => {
                        setRiverName(r.riverName);
                        setLocation(r.location);
                        setGps({ lat: r.latitude, lng: r.longitude });
                        alert("River Selected & Auto-Filled ✔");
                      }
                    }}
                  >
                    <Popup>
                      <b>{r.riverName}</b><br />
                      {r.location}<br />
                      {r.waterLevel} cm — {r.status}
                    </Popup>
                  </Marker>
                )
              ))}

            </MapContainer>

          </div>


          <h2 className="text-xl font-semibold mb-4 tracking-wide">
            Live Image Preview
          </h2>

          {preview ? (
            <img
              className="rounded-xl border border-slate-700 shadow-xl"
              src={preview}
            />
          ) : (
            <div className="p-10 border border-slate-700 rounded-xl text-gray-400">
              No Image Selected
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
