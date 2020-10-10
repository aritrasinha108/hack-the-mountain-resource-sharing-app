const { query } = require('express');
const express = require('express');
const router = express.Router();
const Questions=require('../models/questions').questions
router.get('/',(req,res)=>{
    res.render('main/q&a');
})

router.post('/',async (req,res)=>{
    const {name,question}=req.body;
    console.log(name +"and"+question);

    const querry = new Questions({
        user:name,
        question:question
    });

    const response=await querry.save()
    console.log(response)
    req.flash('success_msg',"Question has been successfully posted");
    res.redirect('/q&a');
})
module.exports=router;
