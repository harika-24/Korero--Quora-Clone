import QuestionsDAO from '../dao/questionsDAO.js';

export default class QuestionsController {

    static async apiAddQuestion(req, res, next) {
        try {
            const userId = req.body.userId;
            const questionText = req.body.text;
            const upvotes = req.body.upvotes;
            const downvotes = req.body.downvotes;
            const shares = req.body.shares;
            const answerIds = req.body.answerIds;

            const date = new Date();

            const questionResponse = await QuestionsDAO.addQuestion(
                userId,
                questionText,
                upvotes,
                downvotes,
                shares,
                answerIds,
                date
            );

            var { error } = questionResponse;
            console.log(error);
            if (error) {
                res.status(500).json({ error: "Unable to add question." });
            } else {
                res.json({ status: "success" });
            }

        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    static async apiUpdateQuestion(req, res, next) {
        try {

            const questionId = req.body.questionId;
            const userId = req.body.userId;
            const questionText = req.body.text;
            const upvotes = req.body.upvotes;
            const downvotes = req.body.downvotes;
            const shares = req.body.shares;
            const answerIds = req.body.answerIds;

            const date = new Date();

            const questionResponse = await QuestionsDAO.updateQuestion(
                questionId,
                userId,
                questionText,
                upvotes,
                downvotes,
                shares,
                answerIds,
                date
            );

            var { error } = questionResponse;
            console.log(error);
            if (error) {
                res.status(500).json({ error: "Unable to update question." });
            } else if (questionResponse.modifiedCount === 0) {
                res.status(500).json({ error: "Did not find a question to update." });
            } else {
                res.json({ status: "success" });
            }

        } catch (e) {
            res.status(500).json({ error: e.message });
        }

    }

    static async apiDeleteQuestion(req, res, next) {
        try {
            const questionId = req.body.questionId;
            const userId = req.body.userId;

            const questionResponse = await QuestionsDAO.deleteQuestion(
                questionId,
                userId
            );

            var { error } = questionResponse;
            console.log(error);
            if (error) {
                res.status(500).json({ error: "Unable to delete question." });
            } else {
                res.json({ status: "success" });
            }

        } catch (e) {
            res.status(500).json({ error: e.message });
        }

    }

    static async apiGetQuestion(req, res, next) {
        try {
            let id = req.params.id || {}
            let question = await QuestionsDAO.getQuestion(id);
            if (!question) {
                res.status(404).json({ error: "not found" });
                return;
            }
            res.json(question);
        } catch (e) {
            console.log(`API, ${e}`);
            res.status(500).json({ error: e });
        }
    }

    static async apiGetQuestionsByFollowing(req, res, next) {
        try {
            let ids = req.params.ids || [];

            let idArray = JSON.parse(ids);

            let question = await QuestionsDAO.getQuestionByFollowing(idArray);

            if (!question) {
                res.status(404).json({
                    error: "not found"
                });
                return;
            }
            res.json(question);
        } catch (e) {
            console.log(`API, ${e}`);
            res.status(500).json({
                error: e
            });
        }
    }

}