import { Router } from "express";
import { getAuthor, createAuthor, getAuthors, updateAuthor, deleteAuthor } from "../controllers/authorController.js";

const authorRoutes = Router();

authorRoutes.route("/")
  .get(getAuthors)
  .post(createAuthor);

authorRoutes.route("/:id")
  .get(getAuthor)
  .put(updateAuthor)
  .delete(deleteAuthor);

export default authorRoutes;