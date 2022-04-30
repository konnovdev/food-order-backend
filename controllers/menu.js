// frontend staffs give us only one menu example, I assign it to menuResTwo. 
import {menuResOne, menuResTwo} from "../db/db.js"
import {dbQuery} from "../db/connection.js"
import {queryAllItem} from "../db/utility.js"

function getById(id) {
    if (id === '1') {
        return menuResOne
    }
    else if (id === '2') {
        return menuResOne
    }
    else {
        return null
    }
}

const get = async (req, res) => {
    let result = await queryAllItem()
    res.status(200).send(result)
}

export {get}