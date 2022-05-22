import {queryAllItem} from "../db/utility.js"

const get = async (req, res) => {
    let lang = req.get("Content-Language")
    let result = await queryAllItem(lang)
    res.status(200).send(result)
}

export {get}