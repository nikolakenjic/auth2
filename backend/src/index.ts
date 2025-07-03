import express from "express";

const app = express();

app.get('/', (req, res) => {
    res.send('hello')
})

app.listen(3500, () => {
    console.log("Server started on port 3500");
})