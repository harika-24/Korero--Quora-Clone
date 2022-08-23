import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;

let posts;

export default class PostsDAO {
    static async injectDB(conn) {
        if (posts) {
            return;
        }
        try {
            posts = await conn.db(process.env.KORERO_DB)
                .collection('Posts');
        } catch (e) {
            console.error(`Unable to connect in PostsDAO: ${e}`);
        }
    }

    static async addPost(post) {
        try {
            return await posts.insertOne(post)
        } catch (e) {
            console.error(`Unable to add post: ${e}`)
            return {
                error: e
            };
        }
    }




    static async updatePost(post) {
        try {
            return await posts.updateOne({
                _id: ObjectId(post._id)
            }, {
                $set: {
                    user:post.user,
                    title:post.title,
                    upvotes:post.upvotes,
                    downvotes : post.downvotes,
                    shares:post.shares,
                    description:post.description,
                    visibility:post.visibility,
                    isPost:post.isPost,
                    comments:post.comments,
                    answers:post.answers,
                    date:post.date
                }
            })

        } catch (e) {
            console.error(`Unable to update post: ${e}`)
            return {
                error: e
            };
        }
    }

    static async deletePost(postId, userId) {
        try {
            return await posts.deleteOne({ _id: ObjectId(postId) })

        } catch (e) {
            console.error(`Unable to delete post: ${e}`)
            return { error: e };
        }
    }

    static async getUserFeed(ids) {
        try {
            const objIds = ids.map(id => {
                return id;
            })
            console.log(objIds);

            let feed = await posts.find({ userId: { $in: objIds } });
            console.log(Object.toString(feed));
            let postList = await feed.toArray();
            return postList;
        } catch (e) {
            console.error(`Something went wrong in getFeed:${e}`);
            throw e;
        }
    }
    static async getFeed() {
        try {
            

            let feed = await posts.find({ visibility: "public" });
            //let feed = posts.find( { $or: [ /*{ visibility: "public" },*/ { "user._id" : userId } ] } )

            let postList = await feed.toArray();
            return postList;
        } catch (e) {
            console.error(`Something went wrong in getFeed:${e}`);
            throw e;
        }
    }


    static async getUserPosts(id) {
        try {
                    
            console.log(id);
            let feed = await posts.find({userId:id});
            //let feed = posts.find( { $or: [ /*{ visibility: "public" },*/ { "user._id" : userId } ] } )

            let postList = await feed.toArray();
            return postList;
        } catch (e) {
            console.error(`Something went wrong in getFeed:${e}`);
            throw e;
        }
    }
}