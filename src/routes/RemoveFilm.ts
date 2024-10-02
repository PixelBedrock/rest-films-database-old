import { Request, Response } from "express";
import { Database } from "sqlite3";

var db = new Database("films.sqlite");

export default function(req: Request, res: Response) {
    db.run("DELETE FROM films WHERE id=$id;", {
        $id: req.params.id
    }, function(err) {
        if (err) return console.error(err);
        res.status(204).send("");
    });
}
