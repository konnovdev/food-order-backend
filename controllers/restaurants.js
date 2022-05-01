import { restaurants } from "../db/db.js"

const getAll = (req, res) => {
    res.status(200).json(restaurants)
}
export {getAll, restaurants}