import CommentsDAO from '../dao/commentsDAO.js';

export default class CommentsController {

    static async apiAddComment(req, res, next) {
        try {
            const userId = req.body.userId;
            const postId = req.body.postId;
            const commentText = req.body.commentText;
            const upVotes = req.body.upVotes;
            const downVotes = req.body.downVotes;

            const date = new Date();

            const commentResponse = await CommentsDAO.addComment(
                userId,
                postId,
                upVotes,
                downVotes,
                commentText,
                date
            );

            var { error } = commentResponse;
            console.log(error);
            if (error) {
                res.status(500).json({ error: "Unable to add comment." });
            } else {
                res.json({ status: "success" });
            }

        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    static async apiUpdateComment(req, res, next) {
        try {
            const _id = req.body._id;
            const userId = req.body.userId;
            const postId = req.body.postId;
            const commentText = req.body.commentText;
            const upVotes = req.body.upVotes;
            const downVotes = req.body.downVotes;

            const date = new Date();

            const commentResponse = await CommentsDAO.updateComment(
                _id,
                userId,
                postId,
                upVotes,
                downVotes,
                commentText,
                date
            );

            var { error } = commentResponse;
            console.log(error);
            if (error) {
                res.status(500).json({ error: "Unable to update the comment." });
            } else if (commentResponse.modifiedCount === 0) {
                res.status(500).json({ error: "Did not find a comment to update." });
            } else {
                res.json({ status: "success" });
            }

        } catch (e) {
            res.status(500).json({ error: e.message });
        }

    }

    static async apiDeleteComment(req, res, next) {
        try {
            const _id = req.body._id;
            const userId = req.body.userId;

            const commentResponse = await CommentsDAO.deleteComment(
                _id,
                userId
            );

            var { error } = commentResponse;
            console.log(error);
            if (error) {
                res.status(500).json({ error: "Unable to delete the comment." });
            } else {
                res.json({ status: "success" });
            }

        } catch (e) {
            res.status(500).json({ error: e.message });
        }

    }

    static async apiGetComments(req, res, next) {
        try {
            let id = req.params.id || {}
            let comment = await CommentsDAO.getComments(id);
            if (!comment) {
                res.status(404).json({ error: "not found" });
                return;
            }
            res.json(comment);
        } catch (e) {
            console.log(`API, ${e}`);
            res.status(500).json({ error: e });
        }
    }


}