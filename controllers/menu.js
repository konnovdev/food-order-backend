import {queryAllItem} from "../db/utility.js"

const get = async (req, res) => {
    let result = await queryAllItem()
    res.status(200).send(result)
}

export {get}