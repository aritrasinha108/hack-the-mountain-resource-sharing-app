const express = require('express');
const router = express.Router();
const upload = require('../utils/fileStore');
const Posts = require('../models/Post').Posts;
const Voter = require('../models/Post').Voters;
const Comments = require('../models/Post').Comments;
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
    const tags = req.body.tags.split(' ');
    let newPost = new Posts({
        title: req.body.title,
        sum: req.body.sum,
        author: req.user.name,
        tags: tags,
        authorEmail: req.user.email,
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

router.post('/toggleLikes/:id', async (req, res) => {
    const id = req.params.id;
    console.log("id is: " + id);
    const post = await Posts.findById(id);
    console.log("post is: " + post);

    if (post == null) {
        console.log('null');
        res.json({
            status: "error",
            status: "error",
            message: "Post does not exist"
        });
    }
    else {

        let upvoters = post.likes;
        console.log("upvoters are" + upvoters)
        let index = upvoters.findIndex(upvoter => {
            console.log(upvoter.email);
            console.log(req.user.email);
            return upvoter.email == req.user.email
        });
        console.log(index + " is the index ");
        if (index == -1) {

            let voter = new Voter({
                email: req.user.email,
                name: req.user.name
            });
            post.likes.push(voter);

            await post.save();
            console.log(post.likes);
            res.json({
                status: 'like',
                message: "Post has been liked"
            });
        }
        else {

            post.likes.splice(index, 1);

            await post.save();
            console.log(post.likes);
            res.json({
                status: 'unlike',
                message: "Post has been unliked"
            });
        }
    }


});
router.post('/:id&:comment', async (req, res) => {

    let post = await Posts.findById(req.params.id);
    try {
        console.log(post);
        let writer = req.user;
        let comment = new Comments({
            name: req.user.name,
            comment: req.params.comment,
            email: req.user.email
        });
        post.comments.push(comment);
        post = await post.save();
        res.json({
            status: "success",
            username: comment.name,
            comment: comment.comment
        });
    }
    catch (err) {
        console.log(err);
        res.json({
            status: "failure",

            message: "Comment was not posted"
        });
    }

});





module.exports = router;