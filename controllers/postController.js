const Joi = require("joi");
const fs = require('fs');
const path = require('path');
const { Op } = require("sequelize");

const { Post, User } = require("../models");
const { handleServerError, handleClientError } = require("../utils/handleError");

exports.getPost = async (req, res) => {
  try {
    const { id } = req.query;
    if (id) {
      const foundPost = await Post.findByPk(id, {include: [
        { model: User, attributes: ["id", "username", "email"] }
      ],});
      if (!foundPost) return handleClientError(res, 404, "Post Not Found");
      
      return res.status(200).json({ data: foundPost, status: 'Success' });
    
    } else {
      const response = await Post.findAll({include: [
        { model: User, attributes: ["id", "username", "email"] },
      ],});
      return res.status(200).json({ data: response, status: 'Success' });
    }
  } catch (error) {
    console.error(error);
    handleServerError(res);
  }
}

exports.getMyPosts = async (req, res) => {
  try {
    const response = await Post.findAll({ 
      where: {user_id: req.user.id},
      include: [{ model: User, attributes: ["id", "username", "email"] },]
    });
    return res.status(200).json({ data:response, status: 'Success' });

  } catch (error) {
    console.error(error);
    handleServerError(res);
  }
}

exports.createPost = async (req, res) => {
  try {
    const newData = req.body;
    const scheme = Joi.object({
      title: Joi.string().required(),
      content: Joi.string().required()
    });

    const { error } = scheme.validate(newData);
    if (error) 
      return res.status(400).json({ status: 'Validation Failed', message: error.details[0].message })

    newData.imageUrl = req.file ? `/uploads/${req.file.filename}` : null;
    const createdPost = await Post.create({...newData, user_id: req.user.id});
    res.status(201).json({ data: createdPost, status: 'Success' });

  } catch (error) {
    console.error(error);
    handleServerError(res);
  }
}

exports.updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const dataReq = req.body;
    const newImage = req.file;
    const scheme = Joi.object({
      title: Joi.string(),
      content: Joi.string()
    });

    const { error } = scheme.validate(dataReq);
    if (error) 
      return res.status(400).json({ status: 'Validation Failed', message: error.details[0].message })

    const foundPost = await Post.findByPk(id);
    if (!foundPost) return handleClientError(res, 404, "Post Not Found");

    if (req.user.role !== 'admin' && req.user.id !== foundPost.user_id)
      return handleClientError(res, 400, 'Not Authorized');

    if (dataReq.title) foundPost.title = dataReq.title;
    if (dataReq.content) foundPost.content = dataReq.content;

    // Delete the old image if a new image is provided
    if (newImage) {
      if (foundPost.imageUrl) {
        // Assuming you have access to the file system
        const imagePath = path.join(__dirname, '..', foundPost.imageUrl);
        fs.unlinkSync(imagePath);
      }
      foundPost.imageUrl = `/uploads/${newImage.filename}`;
    }

    await foundPost.save();
    res.status(200).json({ data: foundPost, status: 'Success' });

  } catch (error) {
    console.error(error);
    handleServerError(res);
  }
}

exports.deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    const foundPost = await Post.findByPk(id);
    if (!foundPost) return handleClientError(res, 404, "Post Not Found");

    if (req.user.role !== 'admin' && req.user.id !== foundPost.user_id)
      return handleClientError(res, 400, 'Not Authorized');

    await Post.destroy({ where: {id: id} });
    if (foundPost.imageUrl) {
      // Assuming you have access to the file system
      const imagePath = path.join(__dirname, '..', foundPost.imageUrl);
      fs.unlinkSync(imagePath);
    }
    
    res.status(200).json({ message: `Success delete '${foundPost.title}'`, status: 'Success' });

  } catch (error) {
    console.error(error);
    handleServerError(res);
  }
}