import express from "express";
import router from "../routes/notes.js";
import Note from "../models/Note.js";


export const getNotes = async (req, res) => {
    const userId = req.userId;
    try {
      const notes = await Note.find({ userId });
      res.status(200).json({
        success: true,
        data: notes,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  };
  

export const getNote =  async (req, res) => {
     
     if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)){
        return res.status(400).json({
            succes: false,
            error: "Invalid note id",
        })
    }
    try {
       
        const note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(400).json({
                succes: false,
                error: "No note found",
            });
        }
        res.status(200).json({
            succes: true,
            data: note,
        })
    }catch (error) {
        res.status(400).json({
            succes: false,
            error: error.message,
        });
    }
};

export const createNote = async  (req, res) => {

    const userId = req.userId;
    try {
        const note = await Note.create({
            ...req.body,
            user: userId,
        });
        res.status(201).json({
            succes: true,
            data: note,
        });

    }catch (error) {
        res.status(400).json({
            succes: false,
            error: error.message,
        });
    }
};

export const updateNote = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(400).json({
                succes: false,
                error: "No note found",
            });
        }
            const updateNote = await Note.findByIdAndUpdate(
                req.params.id,
                req.body,
                {
                    new: true,
                    runValidators: true,
                }
            );
            res.status(200).json({
                succes: true,
                data: updateNote,
            });
        

    }catch (error) {
        res.status(400).json({
            succes: false,
            error: error.message,
        });

    }
};

export const deleteNote = async (req, res) => {
    try {
      const note = await Note.findById(req.params.id);
      if (!note) {
        return res.status(400).json({
          success: false,
          error: "No note found",
        });
      }
      await Note.findByIdAndDelete(req.params.id);
      res.status(200).json({
        success: true,
        data: {},
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  };