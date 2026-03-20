const Water = require("../models/WaterData");
const User = require("../models/User");

exports.getStats = async(req,res)=>{
  const totalReadings = await Water.countDocuments();
  const totalUsers = await User.countDocuments();
  const countSafe = await Water.countDocuments({status:"Safe"});
  const countWarning = await Water.countDocuments({status:"Warning"});
  const countDanger = await Water.countDocuments({status:"Danger"});
  const latest = await Water.find().sort({_id:-1}).limit(5);

  res.json({
    success:true,
    data:{
      totalReadings,
      totalUsers,
      countSafe,
      countWarning,
      countDanger,
      latest
    }
  });
};
