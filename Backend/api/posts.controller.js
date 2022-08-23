import PostsDAO from '../dao/postsDAO.js';

export default class PostsController {

    static async apiAddPost(req, res, next) {
        try {


            const post = {
                user: req.body.user,
                userId: req.body.user._id,
                title: req.body.title,
                upvotes: req.body.upvotes,
                visibility: req.body.visibility,
                inputURL: req.body.inputURL,
                downvotes: req.body.downvotes,
                shares: req.body.shares,
                description: req.body.description,
                isPost: req.body.isPost,
                comments: req.body.comments,
                answers: req.body.answers,
                date: new Date()

            }



            const postResponse = await PostsDAO.addPost(post);

            var { error } = postResponse;
            console.log(error);
            if (error) {
                res.status(500).json({ error: "Unable to add post." });
            } else {
                res.json({ status: "success" });
            }

        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    static async apiUpdatePost(req, res, next) {
        try {

            const post = {
                _id: req.body._id,
                user: req.body.user,
                userId: req.body.user._id,
                title: req.body.title,
                upvotes: req.body.upvotes,
                visibility: req.body.visibility,
                downvotes: req.body.downvotes,
                shares: req.body.shares,
                description: req.body.description,
                isPost: req.body.isPost,
                comments: req.body.comments,
                answers: req.body.answers,
                date: new Date(),


            }
            const postResponse = await PostsDAO.updatePost(post);

            var { error } = postResponse;
            console.log(error);
            if (error) {
                res.status(500).json({ error: "Unable to update post." });
            } else if (postResponse.modifiedCount === 0) {
                res.status(500).json({ error: "Did not find a post to update." });
            } else {
                res.json({ status: "success" });
            }

        } catch (e) {
            res.status(500).json({ error: e.message });
        }

    }

    static async apiDeletePost(req, res, next) {
        try {

            const postId = req.body._id;
            console.log(postId);


            const postResponse = await PostsDAO.deletePost(
                postId,

            );

            var { error } = postResponse;
            console.log(error);
            if (error) {
                res.status(500).json({ error: "Unable to delete post." });
            } else {
                res.json({ status: "success" });
            }

        } catch (e) {
            res.status(500).json({ error: e.message });
        }

    }

    static async apiGetFeed(req, res, next) {
        try {

            let userId = req.param.id;
            let posts = await PostsDAO.getFeed(userId);
            if (!posts) {
                res.status(404).json({
                    error: "not found"
                });
                return;
            }
            res.json(posts);
        } catch (e) {
            console.log(`API, ${e}`);
            res.status(500).json({
                error: e
            });
        }
    }


    static async apiGetUserPost(req, res, next) {
        try {

            let id = req.params.id || {};
            console.log("userId:" + id);
            let posts = await PostsDAO.getUserPosts(id);
            if (!posts) {
                res.status(404).json({
                    error: "not found"
                });
                return;
            }
            res.json(posts);
        } catch (e) {
            console.log(`API, ${e}`);
            res.status(500).json({
                error: e
            });
        }
    }

}