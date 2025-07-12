import { Router } from "express";
import { fetchDataFromAPI } from "../utils/fetchData.js";

const bookRouter = Router()

bookRouter.route(`/search`).get(fetchDataFromAPI)

export {bookRouter}

