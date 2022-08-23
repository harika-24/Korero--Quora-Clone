import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;

let answers;

export default class AnswersDAO {

    static async injectDB(conn) {
        if (answers) {
            return;
        }
        try {
            answers = await conn.db(process.env.KORERO_DB)
                .collection('Answers');
        } catch (e) {
            console.error(`Unable to connect in AnswersDAO: ${e}`);
        }
    }

    static async addAnswer(userId, isDraft, questionId, answerBody, answerTitle, upVotes, downVotes, shares, date) {
        try {
            const answerDoc = {
                userId,
                isDraft,
                questionId,
                answerBody,
                answerTitle,
                upVotes,
                downVotes,
                shares,
                date
            }
            return await answers.insertOne(answerDoc);
        }
        catch(e) {
            console.error(`Unable to post answer: ${e}`)
            return {error: e};
        }
    }

    static async getAnswer(questionId) {
        try {
            return await answers.aggregate([{
                $match: {
                    _id: new ObjectId(questionId),
                }
            }]).next();
        } catch (e) {
            console.error(`Something went wrong in getAnswer: ${e}`);
            throw e;
        }
    }

    static async getAnswersById(questionIds) {
        try {
            const objIds = questionIds.map(id => {
                return id;
            })

            let allAnswers = await answers.find({ questionId: { $in: objIds } });
            let answersList = await allAnswers.toArray();
            //console.log(answersList);
            return answersList;
        } catch (e) {
            console.error(`Something went wrong in getAnswersbyId: ${e}`);
            throw e;
        }
    } 

    static async deleteAnswer(answerId, userId) {
        try {
            return await answers.deleteOne({ _id: ObjectId(answerId) }, { userId: userId })

        } catch (e) {
            console.error(`Unable to delete the answer: ${e}`)
            return { error: e };
        }
    }

    static async updateAnswer(_id, userId, isDraft, questionId, answerBody, answerTitle, upVotes, downVotes, shares, date) {
        try {
            return await answers.updateOne({
                _id: ObjectId(_id)
            }, {
                $set: {
                    userId,
                    isDraft,
                    questionId,
                    answerBody,
                    answerTitle,
                    upVotes,
                    downVotes,
                    shares,
                    date
                }
            })

        } catch (e) {
            console.error(`Unable to update the answer: ${e}`)
            return {
                error: e
            };
        }
    }
}
