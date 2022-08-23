import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;

let questions;

export default class QuestionsDAO {
    static async injectDB(conn) {
        if (questions) {
            return;
        }
        try {
            questions = await conn.db(process.env.KORERO_DB)
                .collection('Questions');
        } catch (e) {
            console.error(`Unable to connect in QuestionsDAO: ${e}`);
        }
    }

    static async addQuestion(userId, questionText, upvotes, downvotes, shares, answerIds, date) {
        try {

            const questionDoc = {
                userId,
                questionText,
                upvotes,
                downvotes,
                shares,
                answerIds,
                date
            }
            return await questions.insertOne(questionDoc)
        } catch (e) {
            console.error(`Unable to add question: ${e}`)
            return {
                error: e
            };
        }
    }

    static async updateQuestion(questionId, userId, questionText, upvotes, downvotes, shares, answerIds, date) {
        try {
            return await questions.updateOne({
                _id: ObjectId(questionId)
            }, {
                $set: {
                    userId,
                    questionText,
                    upvotes,
                    downvotes,
                    shares,
                    answerIds,
                    date
                }
            })

        } catch (e) {
            console.error(`Unable to update question: ${e}`)
            return {
                error: e
            };
        }
    }

    static async deleteQuestion(questionId, userId) {
        try {
            return await questions.deleteOne({ _id: ObjectId(questionId) }, { userId: userId })

        } catch (e) {
            console.error(`Unable to delete question: ${e}`)
            return { error: e };
        }
    }

    static async getQuestion(id) {
        try {
            return await questions.aggregate([{
                $match: {
                    _id: new ObjectId(id),
                }
            }]).next();
        } catch (e) {
            console.error(`Something went wrong in getQuestion: ${e}`);
            throw e;
        }

    }

    static async getQuestionByFollowing(ids) {
        try {
            const objIds = ids.map(id => {
                return id;
            })

            let questionlist = await questions.find({ userId: { $in: objIds } });
            let questionArray = await questionlist.toArray();
            return questionArray;
        } catch (e) {
            console.error(`Something went wrong in getQuestionByFollowing:${e}`);
            throw e;
        }
    }


}