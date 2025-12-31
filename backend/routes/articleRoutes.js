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
// Update article
router.put("/:id", async (req, res) => {
  try {
    const updated = await Article.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete article
router.delete("/:id", async (req, res) => {
  try {
    await Article.findByIdAndDelete(req.params.id);
    res.json({ message: "Article deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports=router;