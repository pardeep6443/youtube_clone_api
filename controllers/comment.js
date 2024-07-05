import { createError } from "../error.js";
import Comment from "../models/Comment.js";
import Video from "../models/Video.js";

export const addComment = async (req, res, next) => {
    const newComment = new Comment({...req.body, userId:req.user.id})
    console.log(newComment)
    try {
     const savedComment = await newComment.save()
     res.status(200).send(savedComment)
    } catch (err) {
        next(err);
    }
}

export const deleteComment = async (req, res, next) => {
    try {
      const comment = await Comment.findById(res.params.id)
      const video = await Video.findById(res.params.id)
      if(req.user.id === comment.userId || req.user.id === video.userId){
        await Comment.findByIdAndDelete(req.params.id)
        res.status(200).json("The Comment Has Been Deleted.")
      }else{
        return next (createError(403,"You Can Delete Only Your Comment!"))
      }
    } catch (err) {
        next(err);
    }
}

export const getComments = async (req, res, next) => {
  console.log(getComments)
  try {
    const comments = await Comment.find({ videoId: req.params.videoId });
    res.status(200).json(comments);
  } catch (err) {
    next(err);
  }
};