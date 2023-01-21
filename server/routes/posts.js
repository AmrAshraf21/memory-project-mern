import express from "express";
const router = express.Router();
import {getPostBySearch,getPosts , likePost,createPost,getPost ,commentPost, updatePost,deletePost} from '../controllers/post.js'
import auth from '../middleware/auth.js';
router.get('/search',getPostBySearch)
router.get("/",getPosts);
router.get('/:id',getPost)
router.post("/",auth,createPost);
router.patch('/:id',auth,updatePost);
router.delete('/:id',auth,deletePost);
router.patch('/:id/likePost',auth,likePost);
router.post('/:id/commentPost',auth,commentPost);
export default router;
