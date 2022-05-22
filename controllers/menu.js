import {queryAllItem} from "../db/utility.js"

const get = async (req, res) => {
    let lang = getLanguage(req)
    let result = await queryAllItem(lang)
    res.status(200).send(result)
}

function getLanguage(req) {
    let selectedLanguage= req.get("Content-Language")
    if (selectedLanguage !== undefined) {
        return selectedLanguage
    }
    return DEFAULT_LANGUAGE
}

const DEFAULT_LANGUAGE = "zh"

export {get}