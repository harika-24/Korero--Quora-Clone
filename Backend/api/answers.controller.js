import AnswersDAO from '../dao/answersDAO.js';

export default class AnswersController {

    static async apiPostAnswer(req, res, next) {
        try {
            const userId = req.body.userId;
            const isDraft = req.body.isDraft;
            const questionId = req.body.questionId;
            const answerBody = req.body.answerBody;
            const answerTitle = req.body.answerTitle;
            const upVotes = req.body.upVotes;
            const downVotes = req.body.downVotes;
            const shares = req.body.shares;

            const date = new Date();

            const answerResponse = await AnswersDAO.addAnswer(
                userId,
                isDraft,
                questionId,
                answerBody,
                answerTitle,
                upVotes,
                downVotes,
                shares,
                date
            );

            var { error } = answerResponse;
            console.log(error);
            if (error) {
                res.status(500).json({ error: "Unable to post the answer." });
            } else {
                res.json({ status: "success" });
            }

        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    static async apiGetAnswer(req, res, next) {
        try {
            let id = req.params.id || {}
            let answer = await AnswersDAO.getAnswer(id);
            if (!answer) {
                res.status(404).json({ error: "not found" });
                return;
            }
            res.json(answer);
        } catch (e) {
            console.log(`API, ${e}`);
            res.status(500).json({ error: e });
        }
    }

    static async apiGetAnswersById(req, res, next) {
        try {
            let ids = req.params.ids || [];
            let idArray = JSON.parse(ids);
            let answer = await AnswersDAO.getAnswersById(idArray);
            if (!answer) {
                res.status(404).json({ error: "not found" });
                return;
            }
            res.json(answer);
        } catch (e) {
            console.log(`API, ${e}`);
            res.status(500).json({ error: e });
        }
    }

    static async apiDeleteAnswer(req, res, next) {
        try {
            const _id = req.body._id;
            const userId = req.body.userId;
            
            const answerResponse = await AnswersDAO.deleteAnswer(
                _id,
                userId
            );

            var {error} = answerResponse;
            console.log(error);
            if(error) {
                res.status(500).json({error: "Unable to delete the answer."});
            } else {
                res.json({ status: "successfully deleted"});
            } 
        } catch(e) {
            res.status(500).json({error: e.message});
        }
    }

    static async apiUpdateAnswer(req, res, next) {
        try {
            const _id = req.body._id;
            const userId = req.body.userId;
            const isDraft = req.body.isDraft;
            const questionId = req.body.questionId;
            const answerBody = req.body.answerBody;
            const answerTitle = req.body.answerTitle;
            const upVotes = req.body.upVotes;
            const downVotes = req.body.downVotes;
            const shares = req.body.shares;

            const date = new Date();
            
            const answerResponse = await AnswersDAO.updateAnswer(
                _id,
                userId,
                isDraft,
                questionId,
                answerBody,
                answerTitle,
                upVotes,
                downVotes,
                shares,
                date
            );

            var { error } = answerResponse;
            console.log(error);
            if (error) {
                res.status(500).json({ error: "Unable to update the answer." });
            } else if (answerResponse.modifiedCount === 0) {
                res.status(500).json({ error: "Did not find the answer to update." });
            } else {
                res.json({ status: "success" });
            }

        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }
}