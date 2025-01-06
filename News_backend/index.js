const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors')
const app = express();
app.use(express.json());
app.use(cors());

const NewsModel = require("./Model/News");
const usermodel = require("./Model/signup");


app.listen(3000, () => { });

app.get("/", (req, res) => {
    res.json({ name: "test" });
    console.log("root route")
});

app.post("/addnews", async (req, res) => {
    try {
        const news = await NewsModel.create(req.body);
        res.status(200).json(news);
        console.log(req.body);
    } catch (error) {
        res.send(500);
    }
});

app.post("/signup", async (req, res) => {
    usermodel.create(req.body)
    .then(user => res.json(user))
    .catch (err => res.json(err))
});


app.post("/signin",  (req, res) => {
        const { email, password } = req.body;
        usermodel.findOne({ email: email })
        .then(user => {
            if (user) {
                if (user.password === password) {
                    res.json("Success")
                } else {
                    res.json("Password incorrect");
                }
            } else {
                res.json("Record not Found");
            }
        })
});


app.get("/news", async (req, res) => {
    try {
        const news = await NewsModel.find({});
        res.status(200).json(news);
    } catch (error) {
        res.send(500);
    }
});

app.get("/news/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const news = await NewsModel.findById(id);
        res.status(200).json(news);
    } catch (error) {
        res.send(500);
    }
});

app.put("/news/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const news = await NewsModel.findByIdAndUpdate(id, req.body);
        if (!news) {
            return res.status(404).json({ Message: "News not found" });
        }
        const updatenews = await NewsModel.findById(id);
        res.status(200).json(updatenews);

    } catch (error) {
        res.send(500);
        I
    }
});

app.delete("/news/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const news = await NewsModel.findByIdAndDelete(id, req.body);
        if (!news) {
            return res.status(404).json({ Message: "News not found" });
        }
        const updatenews = await NewsModel.findById(id);
        res.status(200).json("Deleted");

    } catch (error) {
        res.send(500);
        I
    }
});

mongoose
    .connect(
        "mongodb://localhost:27017/Newsapplicationdb"
    )
    .then(() => {
        console.log("connected to mongo")
    })