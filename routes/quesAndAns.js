
const express = require('express');
const router = express.Router();
const Questions = require('../models/questions').questions

router.get('/', async (req, res) => {
    let questions = await Questions.find({});
    res.render('main/q&a', { user: req.user, questions: questions });

});
router.post('/', async (req, res) => {
    question = req.body.question;
    console.log("and" + question);

    const querry = new Questions({
        user: req.user.name,
        question: question
    });

    const response = await querry.save()
    console.log(response)
    req.flash('success_msg', "Question has been successfully posted");
    res.redirect('/qna');
})
module.exports = router;
