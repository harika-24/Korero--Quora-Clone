import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;

let comments;

export default class CommentsDAO {
    static async injectDB(conn) {
        if (comments) {
            return;
        }
        try {
            comments = await conn.db(process.env.KORERO_DB)
                .collection('Comments');
        } catch (e) {
            console.error(`Unable to connect in CommentsDAO: ${e}`);
        }
    }

    static async addComment(userId, postId, upVotes, downVotes, commentText, date) {
        try {

            const commentDoc = {
                userId,
                postId,
                upVotes,
                downVotes,
                commentText,
                date
            }
            return await comments.insertOne(commentDoc)
        } catch (e) {
            console.error(`Unable to add comment: ${e}`)
            return {
                error: e
            };
        }
    }

    static async updateComment(_id, userId, postId, upVotes, downVotes, commentText, date) {
        try {
            return await comments.updateOne({
                _id: ObjectId(_id)
            }, {
                $set: {
                    userId,
                    postId,
                    upVotes,
                    downVotes,
                    commentText,
                    date
                }
            })

        } catch (e) {
            console.error(`Unable to update the comment: ${e}`)
            return {
                error: e
            };
        }
    }

    static async deleteComment(commentId, userId) {
        try {
            return await comments.deleteOne({ _id: ObjectId(commentId) }, { userId: userId })

        } catch (e) {
            console.error(`Unable to delete the comment: ${e}`)
            return { error: e };
        }
    }

    static async getComments(postId) {
        try {
            return await comments.aggregate([{
                $match: {
                    postId: postId,
                }
            }]).next();
        } catch (e) {
            console.error(`Something went wrong in getComments: ${e}`);
            throw e;
        }
    }
}