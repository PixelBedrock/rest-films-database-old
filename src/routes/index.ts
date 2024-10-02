import { Router } from "express";
import CreateFilm from "./CreateFilm";
import GetFilmDetails from "./GetFilmDetails";
import UpdateFilmDetails from "./UpdateFilmDetails";
import RemoveFilm from "./RemoveFilm";

var router = Router();
router.post("/films", CreateFilm);
router.get("/films/:id", GetFilmDetails);
router.patch("/films/:id", UpdateFilmDetails);
router.delete("/films/:id", RemoveFilm);

export default router;
