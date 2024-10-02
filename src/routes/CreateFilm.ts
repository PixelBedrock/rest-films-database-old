import { Request, Response } from "express";
import { Database } from "sqlite3";

var db = new Database("films.sqlite");

export default function(req: Request, res: Response) {
    try {
        var imdb_id = req.body.imdb_id,
            title = req.body.title,
            tagline = req.body.tagline,
            overview = req.body.overview,
            genres = JSON.stringify(req.body.genres),
            release_date = new Date(req.body.release_date).toISOString(),
            runtime = req.body.runtime;

        if (imdb_id.length < 1 || title.length < 1 || tagline.length < 1 || overview.length < 1 || genres.length < 1 || runtime.length < 1)
            throw new Error("Field cannot be empty");
    } catch (err) {
        return res.status(400).json({
            error: {
                code: 400,
                message: "Invalid value for field",
                details: err.message
            }
        });
    }

    db.run(`\
    INSERT INTO films (
        imdb_id,
        title,
        tagline,
        overview,
        genres,
        release_date,
        runtime
    ) VALUES (
        $imdb_id,
        $title,
        $tagline,
        $overview,
        $genres,
        $release_date,
        $runtime
    )`, {
        $imdb_id: imdb_id,
        $title: title,
        $tagline: tagline,
        $overview: overview,
        $genres: genres,
        $release_date: release_date,
        $runtime: runtime
    }, function(err: NodeJS.ErrnoException) {
        if (err) {
            if (err.code === "SQLITE_CONSTRAINT") {
                res.status(400).json({
                    error: {
                        code: 400,
                        message: "Missing fields in request",
                        details: err.message
                    }
                });
            }
        } else {
            db.get("SELECT * FROM films ORDER BY id DESC LIMIT 1;", {}, function(err, row: any) {
                if (err) return console.error(err);
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
            });
        }
    });
}
