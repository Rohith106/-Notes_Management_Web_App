import mongoose from "mongoose";

//1- create schema
//2- crate model out from that schema

const noteSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
    },
    {timestamps: true}
);

const Note = mongoose.model("Note",noteSchema);

export default Note;