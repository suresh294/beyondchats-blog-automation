const express=require("express");
const Article=require("../models/Article.js");
const router=express.Router();
//create article
router.post("/",async(req,res)=>{
    try{
        const article=await Article.create(req.body);
        res.status(201).json(article);

    }
    catch(err){
        res.status(400).json({error:err.message});
    }
});
router.get("/",async(req,res)=>{
    try{
        const articles=await Article.find();
        res.json(articles);
    } catch(err){
        res.status(500).json({error:err.message});
    }
});
module.exports=router;