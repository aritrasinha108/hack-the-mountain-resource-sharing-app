const express = require('express');
const router = express.Router();
const upload = require('../utils/fileStore');
const Posts = require('../models/Post');
router.get('/', (req, res) => {
    res.render('dashboard', { user: req.user });
});
router.get('/new', (req, res) => {
    res.render('main/new', { user: req.user });
});
router.post('/new', upload.single('file'), (req, res) => {
    let newPost = new Posts({
        title: req.body.title,
        sum: req.body.sum,
        file: req.file.filename
    });
    newPost.save().then(post => {
        console.log("post: " + post);
    }).catch(err => {
        throw err;
    });
    req.flash('success_msg', "Post added....");

    res.redirect('/main/new');
});
router.get('/ask', (req, res) => {
    res.redirect('/main/');
})






module.exports = router;