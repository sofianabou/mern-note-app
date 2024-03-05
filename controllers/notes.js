import express from "express";
import router from "../routes/notes.js";
import Note from "../models/Note.js";


export const getNotes = async (req, res) => {
    try{
        const notes = await Note.find();
        res.status(200).json({
            success: true,
            data: notes,
        });
    }catch (error) {
        res.status(400).json({
            succes: false,
        });
    }
}

export const getNote =  async(req, res) => {
     //check if valid mongo id
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
                error: "No not found",
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
    try {
        const note = await Note.create(req.body);
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
    try{
        const note = await Note.findByIdAndDelete(req.params.id);
        if (!note) {
            return res.status(400).json({
                succes: false,
                error: "No note found",
            });
        } 
        res.status(200).json({
            succes: true,
            data: {},
        });
    }catch (error) {
        res.status(400).json({
            succes: false,
            error: error.message,
        })
    }
};