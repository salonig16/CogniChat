import express from "express";
import Thread from "../models/Thread.js";
import getOpenAIAPIResponse from "../utils/openai.js";

const router = express.Router();

router.post("/test", async(req,res) =>{
    try{
        const thread = new Thread({
            threadId: "xyz",
            title:"Testing New Thread" 
        });

        const response = await thread.save();
        res.send(response);

    } catch(err){
        console.log(err);
        res.status(500).json({error: "Failed to save in DB"});
    }
});

//Get all threads
router.get("/thread", async(req, res) =>{
    try{
      const threads = (await Thread.find({})).sort({updatedAt: -1}); // will simply get all the threads
      //descending order of updatedAt - most recent data on top
      res.json(threads);
    } catch(err){
        console.log(err);
        res.status(500).json({error: "Failed to fetch threads"});
    }
});

//route to send particular thread on based on threadId
router.get("/thread/:threadId", async(req, res) =>{
    const {threadId} = req.params;

     try{
        const thread = await Thread.findOne({threadId}); //geting one id
        if(!thread){ //if id dont exist
            res.status(404).json({error: "Thread not found"});
        }
        res.json(thread.messages);
     } catch(err){
        console.log(err);
        res.status(500).json({error: "Failed to fetch chat"});
     }
});

//delete 
router.delete("/thread/threadId", async(req, res)=>{
    const {threadId} = req.params;

     try{
        const deletedThread = await Thread.findOneAndDelete({threadId});
        if(!deletedThread){
            res.status(404).json({error: "Thread not found"});
        }
        res.status(200).json({success:"Thread deleted successfully"});
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Failed to delete thread"});
    }
});

router.post("/chat", async(req, res) => {
    const {threadId, message} = req.body;

    if(!threadId || !message){
        res.status(400).json({error: "missing required fields"});
    }
    try{
       let thread = await Thread.findOne({threadId});
       if(!thread){ //if thread dont exist
          //create a new thread in db
          thread = new Thread({
            threadId,
            title: message,
            messages: [{role: "user", content: message}]
          });
       } else{
         thread.messages.push({role: "user", content: message}); //message is store if thread exist
       }

       const assistantReply = await getOpenAIAPIResponse(message); // getting response from openai
       thread.messages.push({role: "assistant", content: assistantReply}); //reply from assistant is store
       thread.updatedAt = new Date(); //date is updated of chat
       await thread.save(); //save to db
       res.json({reply: assistantReply}); //send to frontend

    }catch(err){
       console.log(err);
        res.status(500).json({error: "something went wrong"});
    }
});

export default router;
