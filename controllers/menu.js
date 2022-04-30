// frontend staffs give us only one menu example, I assign it to menuResTwo. 
import {menuResOne, menuResTwo} from "../db/db.js"
function getById(id) {
    if (id === '1') {
        return menuResOne
    }
    else if (id === '2') {
        return menuResTwo
    }
    else {
        return null
    }
}

const get = (req, res) => {
    res.status(200).json(getById(req.params.id))
}

export {get}