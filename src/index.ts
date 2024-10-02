import express, { Request, Response } from "express";
import { Database } from "sqlite3";
import router from "./routes";

var app = express();
var db = new Database("films.sqlite");
var port = process.env.PORT || 3000;

app.use(function(req: Request, _: Response, next: Function) {
    console.log(`${req.ip} - [${new Date().toLocaleTimeString()}] ${req.method} ${req.originalUrl} "${req.header("User-Agent")}"`);
    next();
});

app.use(express.json());
app.use("/v1", router);

app.listen(port, function() {
    db.run(`\
    CREATE TABLE IF NOT EXISTS films (
        id INTEGER PRIMARY KEY,
        imdb_id TEXT NOT NULL,
        title TEXT NOT NULL,
        tagline TEXT NOT NULL,
        overview TEXT NOT NULL,
        genres TEXT NOT NULL,
        release_date TEXT NOT NULL,
        runtime INTEGER NOT NULL
    );`, {}, function(err) {
        if (err) throw err;
        console.log(`-> Database: ${__dirname + "\\films.sqlite"}`);
    });

    console.log(`-> Listening on port ${port}: http://localhost:${port}`);
});
