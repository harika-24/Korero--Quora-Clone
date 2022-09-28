import express from 'express';
import UsersController from './users.controller.js';
import PostsController from './posts.controller.js';
import SpacesController from './spaces.controller.js';

const router = express.Router();



router.route("/user/:id").get(UsersController.apiGetUserById);
router.route("/user").post(UsersController.apiPostUser);
router.route("/user").put(UsersController.apiUpdateUser);
router.route("/user").get(UsersController.apiGetAllUsers);


router.route("/post").post(PostsController.apiAddPost);
router.route("/post").put(PostsController.apiUpdatePost);
router.route("/post").delete(PostsController.apiDeletePost);
router.route("/feed").get(PostsController.apiGetFeed);
router.route("/post/:id").get(PostsController.apiGetUserPost);


router.route("/spaces").post(SpacesController.apiAddSpaces);
router.route("/spaces").get(SpacesController.apiGetSpaces);

export default router;