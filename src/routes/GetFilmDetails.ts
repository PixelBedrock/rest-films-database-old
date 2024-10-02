import { Request, Response } from "express";
import { Database } from "sqlite3";

var db = new Database("films.sqlite");

export default function(req: Request, res: Response) {
    db.get("SELECT * FROM films WHERE id=$id;", {
        $id: req.params.id
    }, function(err, row: any) {
        if (err) return console.error(err);

        if (row) {
            res.json({
                id: row.id,
                imdb_id: row.imdb_id,
                title: row.title,
                tagline: row.tagline,
                overview: row.overview,
                genres: JSON.parse(row.genres),
                release_date: row.release_date,
                runtime: row.runtime
            });
        } else {
            res.status(404).json({
                error: {
                    code: 404,
                    message: "Film not found"
                }
            });
        }
    });
}
