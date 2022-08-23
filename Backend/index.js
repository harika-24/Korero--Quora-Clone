import app from './server.js';
import dotenv from "dotenv";
import mongodb from 'mongodb';
import UsersDAO from './dao/usersDAO.js';
import PostsDAO from './dao/postsDAO.js';
import QuestionsDAO from './dao/questionsDAO.js';
import AnswersDAO from './dao/answersDAO.js';
import CommentsDAO from './dao/commentsDAO.js';
import SpacesDAO from './dao/spacesDAO.js';

async function main() {
    dotenv.config();

    const client = new mongodb.MongoClient(process.env.KORERO_DB_URI)

    const port = process.env.PORT || 8000;

    try {
        await client.connect();
        await UsersDAO.injectDB(client);
        await PostsDAO.injectDB(client);
        await QuestionsDAO.injectDB(client);
        await AnswersDAO.injectDB(client);
        await CommentsDAO.injectDB(client);
        await SpacesDAO.injectDB(client);

        //server is listening on port.
        app.listen(port, () => {
            console.log('Server is running on port:' + port);

        })

    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

main().catch(console.error);