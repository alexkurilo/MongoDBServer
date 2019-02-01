import express from "express";
import bodyParser from "body-parser";
//import cors from 'cors';

import * as db from './utils/DataBaseUtils';
import {serverPort} from "../etc/config.json";

const data = {
    title: "Some title",
    text: "Some text",
    color: "Some color",
    createAt: new Date()
}

const app = express();

db.setUpConnection();

app.use( bodyParser.json() );

//app.use( cors({origin: "*"}) );

app.get('/', (req, res)=>{
    res.send("Hello Alex!");
});


app.get('/notes', (req, res)=>{
    console.log("nouts");
    db.listNotes()
    .then(data => res.send(data))
});

app.post('/notes', (req, res)=>{
    db.createNote(req.body).then(data => res.send(data))
});

app.delete('/notes/:id', (req, res)=>{
    db.deleteNote(req.params.id).then(data => res.send(data))
});

const server = app.listen(serverPort, ()=>{
    console.log(`Server is running on port ${serverPort}`)
});

