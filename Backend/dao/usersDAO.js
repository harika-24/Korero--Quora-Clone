import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;

let users;

export default class UsersDAO {
    static async injectDB(conn) {
        if (users) {
            return;
        }
        try {
            users = await conn.db(process.env.KORERO_DB)
                .collection('Users');
        } catch (e) {
            console.error(`Unable to connect in UsersDAO: ${e}`);
        }
    }


    static async getUserById(id) {
        console.log(id);
        try {
            return await users.findOne({_id:id});
        } catch (e) {
            console.error(`Something went wrong in getUserById: ${e}`);
            throw e;
        }

    }

    static async addUser(userInfo) {
        try {
            return await users.insertOne(userInfo)
        } catch (e) {
            console.error(`Unable to add user: ${e}`)
            return {
                error: e
            };
        }
    }

    static async updateUser(userInfo) {
        try {
            return await users.updateOne({
                _id: userInfo._id
            }, {
                $set: {
                   
                    user :userInfo.user,
                    upComments:userInfo.upComments,
                    downComments:userInfo.downComments,
                    upPosts : userInfo.upPosts,
                    downPosts : userInfo.downPosts,
                    upAnswers : userInfo.upAnswers,
                    downAnswers : userInfo.downAnswers,
                    favSpaces :userInfo.favSpaces,
                    following :userInfo.following,
                }
            })

        } catch (e) {
            console.error(`Unable to update user: ${e}`)
            return {
                error: e
            };
        }
    }

    static async getUsers() {
        let cursor;
        try{
            cursor = await users.find({});
            const userList = await cursor.toArray();
            return userList;
        } catch(e) {
            console.error(`Unable to getSpaces: ${e}`);
            return {userList: []};
        }
    } 


}