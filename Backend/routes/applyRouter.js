const router =require("express").Router();
const fs=require('fs');
const path=require('path');
const filePath=path.join(__dirname,'../Data/applications.json');

function getApplications(){
    if(!fs.existsSync(filePath)) return [];
    const data = fs.readFileSync(filePath ,'utf-8');
    return JSON.parse(data || '[]');
}

function saveApplications(applications){
    fs.writeFileSync(filePath,JSON.stringify(applications,null,2),'utf-8');
}

function getEventNameById(id){
    const eventsFilePath=path.join(__dirname,'../Data/events.json');
    if(!fs.existsSync(eventsFilePath)) return null;
    const events=JSON.parse(fs.readFileSync(eventsFilePath,'utf-8') || '[]');
   const event = events.find(e => String(e.id) === String(id));
    return event ? event.name : null;
}


router.post("/:id/apply",(req,res)=>{
    const {name,email}=req.body;
    const eventId=req.params.id;
    if(!(name && email)){
        return res.status(400).json({message:"Name and email are required"});
    }
    const eventName=getEventNameById(eventId);
    if(!eventName){
        return res.status(404).json({message:"Event not found"});
    }
    const applications=getApplications();
    const newApplication={
        eventId, 
        eventName, 
        name, 
        email, 
        appliedAt: new Date().toISOString() 
    }
    applications.push(newApplication);
    saveApplications(applications);
    res.status(200).json({message:"Application submitted successfully"})

})

module.exports=router;