// get all areas
// create a new area (admin)
// delete area (admin)

 const Areas = require('../models/Area');

exports.getAllAreas = async (req, res) => {
   
    try{
        const results = await Areas.find();
        return res.status(200).json({data: results});
    }
    catch(err){
        return res.status(500).json({error: err.message});
    }
}


exports.addArea = async(req, res) => {
    const {name, wardNumber, city} = req.body;

    try{
    const result = await Areas.findOne({name: name, wardNumber: wardNumber, city: city});
    if(result){
        return res.status(409).json({message: "Area entry already exists"});
    }
    const newArea = new Areas({
        name, 
        wardNumber,
        city
    });
    await newArea.save();

    return res.status(201).json({message:"New Area added", data: newArea});
}
catch(err){
        return res.status(500).json({error: err.message});
    }

}

exports.deleteArea = async (req, res)=> {
    const {name, wardNumber, city} = req.body;

    try{
    const result = await Areas.findOne({name: name, wardNumber: wardNumber, city: city});
    if(result){
        await Areas.deleteOne({name: name, wardNumber: wardNumber, city: city});
        return res.status(200).json({message: "Area entry succesfully deleted", data: result});
    }
}
catch(err){
        return res.status(500).json({error: err.message});
    }
}
