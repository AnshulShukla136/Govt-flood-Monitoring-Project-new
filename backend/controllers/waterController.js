const Water = require("../models/WaterData");

exports.uploadWater = async(req,res)=>{
  try{
    let { riverName, location, waterLevel } = req.body;

    waterLevel = Number(waterLevel);

    let status = "Safe";
    if(waterLevel >= 50 && waterLevel <=100) status="Warning";
    else if(waterLevel > 100) status ="Danger";

    const data = await Water.create({
      riverName,
      location,
      waterLevel,
      status,
      imagePath: req.file ? req.file.path : null,
      createdBy: req.user.id
    });

    res.json({success:true,message:"Water Data Uploaded", data});
  }
  catch(err){
    console.log(err);
    res.status(500).json({success:false,message:"Upload Failed"});
  }
};


exports.getAdminAll = async(req,res)=>{
  const data = await Water.find().populate("createdBy","name email role");
  res.json({success:true,data});
};

exports.getUserData = async(req,res)=>{
  const data = await Water.find({createdBy:req.user.id});
  res.json({success:true,data});
};
