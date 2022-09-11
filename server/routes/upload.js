const router = require('express').Router();
const cloudinary = require('cloudinary');
const fs = require('fs');

// we will upload image on cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload image only admin can use
router.post('/upload', (req, res) => {
    try {
        if (!req.files || Object.keys(req.files).length === 0)
            return res.status(400).json({ msg: 'No files were uploaded.' });
        const file = req.files.file;
        if (file.size > 1024 * 1024) {
            removeTmp(file.tempFilePath);
            return res.status(400).json({ msg: 'Size too large' });
        }

        if (
            file.mimetype !== 'image/jpeg' &&
            file.mimetype !== 'image/png' &&
            file.mimetype !== 'image/jpg'
        ) {
            removeTmp(file.tempFilePath);
            return res.status(400).json({ msg: 'File format is incorrect.' });
        }

        cloudinary.v2.uploader.upload(
            file.tempFilePath, { folder: 'blog' },
            async(err, result) => {
                if (err) throw err;

                removeTmp(file.tempFilePath);

                return res.json(result.url);
            }
        );
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
});

const removeTmp = path => {
    fs.unlink(path, err => {
        if (err) throw err;
    });
};

module.exports = router;