import { ObjectId } from 'mongodb';
import UsersDAO from '../dao/usersDAO.js';

export default class UsersController {

    static async apiGetUserById(req, res, next) {
        try {
            let id = req.params.id || {}
            let user = await UsersDAO.getUserById(id);
            res.json(user);
        } catch (e) {
            console.log(`API, ${e}`);
            res.status(500).json({ error: e });
        }
    }

    static async apiPostUser(req, res, next) {
        try {

            const userInfo = {
                _id : req.body.user._id,
                user : req.body.user,
                upComments : req.body.upComments?req.body.upComments:[],
                downComments : req.body.downComments?req.body.downComments:[],
                upPosts : req.body.upPosts?req.body.upPosts:[],
                downPosts : req.body.downPosts?req.body.downPosts:[],
                upAnswers : req.body.upAnswers?req.body.upAnswers:[], 
                downAnswers : req.body.downAnswers?req.body.downAnswers:[], 
                favSpaces : req.body.favSpaces?req.body.favSpaces:[],
                following : req.body.following?req.body.following:[],  
            }
             


            const userResponse = await UsersDAO.addUser(userInfo);

            var { error } = userResponse;
            console.log(error);
            if (error) {
                res.status(500).json({ error: "Unable to add user." });
            } else {
                res.json({ status: "success" });
            }

        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    static async apiUpdateUser(req, res, next) {
        try {
            const userInfo = {
                _id : req.body.user._id,
                user : req.body.user,
                upComments : req.body.upComments?req.body.upComments:[],
                downComments : req.body.downComments?req.body.downComments:[],
                upPosts : req.body.upPosts?req.body.upPosts:[],
                downPosts : req.body.downPosts?req.body.downPosts:[],
                upAnswers : req.body.upAnswers?req.body.upAnswers:[], 
                downAnswers : req.body.downAnswers?req.body.downAnswers:[], 
                favSpaces : req.body.favSpaces?req.body.favSpaces:[],
                following : req.body.following?req.body.following:[],  
            }
            const userResponse = await UsersDAO.updateUser(
               userInfo
            );

            var { error } = userResponse;
            console.log(error);
            if (error) {
                res.status(500).json({ error: "Unable to update user." });
            } else if (userResponse.modifiedCount === 0) {
                res.status(500).json({ error: "Did not find a user to update." });
            } else {
                res.json({ status: "success" });
            }

        } catch (e) {
            res.status(500).json({ error: e.message });
        }

    }

    static async apiGetAllUsers(req, res, next) {
        try {
            console.log("call successful")
            let space = await UsersDAO.getUsers();
            if (!space) {
                res.status(404).json({ error: "not found" });
                return;
            }
            res.json(space);
        } catch (e) {
            console.log(`API, ${e}`);
            res.status(500).json({ error: e });
        }
    }



}