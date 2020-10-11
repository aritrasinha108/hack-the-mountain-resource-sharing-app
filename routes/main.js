const express = require('express');
const router = express.Router();
const upload = require('../utils/fileStore');
const Posts = require('../models/Post');
router.get('/', async (req, res) => {
    let posts = await Posts.find({});
    console.log(posts);
    Posts.deleteMany()
    res.render('main/dashboard', { user: req.user, posts: posts });
});
router.get('/new', (req, res) => {
    res.render('main/new', { user: req.user });
});
router.post('/new', upload.single('file'), (req, res) => {
    let newPost = new Posts({
        title: req.body.title,
        sum: req.body.sum,
        author: req.user.name,
        filename: req.file.filename
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