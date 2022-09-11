const Posts = require('../models/postModel');

const postCtrl = {
    create: async(req, res) => {
        const { title, desc, photo, username } = req.body;
        try {
            const newPost = new Posts({
                title,
                desc,
                photo,
                username,
            });

            // Save mongodb
            const savePost = await newPost.save();

            return res.status(200).json(savePost);
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    getAllPosts: async(req, res) => {
        try {
            const allPosts = await Posts.find();

            return res.status(200).json(allPosts);
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    getOnePost: async(req, res) => {
        try {
            const { id } = req.params;
            const posts = await Posts.findById(id);

            return res.status(200).json(posts);
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    getMyPosts: async(req, res) => {
        try {
            const { username } = req.params;
            const posts = await Posts.find({ username: username });

            return res.status(200).json(posts);
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    search: async(req, res) => {
        try {
            const { title, username } = req.body;
            const query = new RegExp(title, 'i');
            let posts = await Posts.find({});
            if (query) {
                posts = await Posts.find({
                    title: query,
                });
            }
            if (username) {
                posts = await Posts.find({
                    title: query,
                    username: username,
                });
            }
            res.json(posts);
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    update: async(req, res) => {
        try {
            const updatedPost = await Posts.findByIdAndUpdate(
                req.params.id, {
                    $set: req.body,
                }, { new: true }
            );
            return res.status(200).json(updatedPost);
        } catch (err) {
            return res.status(500).json({ msg: error.message });
        }
    },
    delete: async(req, res) => {
        try {
            const { id } = req.params;
            await Posts.findByIdAndDelete(id);

            return res.status(200).json({ msg: 'Delete post successfully' });
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
};

module.exports = postCtrl;