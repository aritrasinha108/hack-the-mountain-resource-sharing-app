const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Grid = require('gridfs-stream');
const conn = mongoose.createConnection(process.env.URI2, { useUnifiedTopology: true, useNewUrlParser: true });

// Init gfs
let gfs;


conn.once('open', () => {

    gfs = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'resource'
    });
});
router.get('/:docname', async (req, res) => {

    const file = gfs
        .find({
            filename: req.params.docname
        })
        .toArray((err, files) => {
            if (!files || files.length === 0) {
                return res.status(404).json({
                    err: "no files exist"
                });
            }
            let myfile = files[0];

            if (myfile.contentType === 'application/pdf' || myfile.contentType === 'image/png' || myfile.contentType === 'image/jpeg' || myile.contentType === 'image/jpg') {

                gfs.openDownloadStreamByName(req.params.docname).pipe(res);
            } else {
                res.status(404).json({
                    err: 'Invalid Extension...'
                });
            }

        });

});



module.exports = router;