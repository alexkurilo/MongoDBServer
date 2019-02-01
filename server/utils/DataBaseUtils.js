import mongoose from "mongoose";

import config from '../../etc/config.json';

import "../models/Note";
//console.log (config.db);
const Note = mongoose.model('Note');


const data = {
    title: "Some title",
    text: "Some text",
    color: "Some color",
    createAt: new Date()
}


export function setUpConnection() {     
    mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`);
};

export function listNotes() {    //получаем все заметки с UI
    return Note.find();
};

export function createNote(data){   //создаем новую заметку
    const note = new Note({
        title: data.title,
        text: data.text,
        color:data.color,
        createAt: new Date()
    });

    return note.save();
}

export function deleteNote(id) {    //удаляем заметку по id
    return Note.findById(id).remove()
}
