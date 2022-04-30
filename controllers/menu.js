// frontend staffs give us only one menu example, I assign it to menuResTwo. 
import {menuResOne, menuResTwo} from "../db/db.js"
import {dbQuery} from "../db/connection.js"
function getById(id) {
    if (id === '1') {

        return 
    }
    else if (id === '2') {
        return menuResTwo
    }
    else {
        return null
    }
}

const get = async (req, res) => {
    // res.status(200).json(getById(req.params.id)) // leave for future work, we don't need restaurant id now.
    let itemTransResult = await dbQuery('SELECT * FROM `Item_Trans` WHERE `lang`=\'zh\'')
    let itemResult = await dbQuery('SELECT * FROM `Item`')
    let commentResult = await dbQuery('SELECT * FROM `Comment`')
    let itemCommentResult = await dbQuery('SELECT * FROM `Item_Comment`')
    let result = []
    let itemList = []
    let itemCommentObj = {}
    itemTransResult.forEach((e)=>{
        itemList = [...itemList, e.itemId]
        itemCommentObj[e.itemId] = []
    })

    itemCommentResult.forEach((e1)=>{
        commentResult.forEach((comment)=>{
            if (e1.commentId===comment.id){
                itemCommentObj[e1.itemId] = [...itemCommentObj[e1.itemId],
                 {name: comment.name,
                    id: comment.id,
                    content: comment.content,
                    time: comment.time
                }]
            }
        })
    })
    console.log("itemCommentObj", itemCommentObj)

    // combine three tables
    itemResult.forEach((e1)=>{
        itemTransResult.forEach((e2)=>{
          if (e1.id===e2.itemId){
              result = [...result, {...e1, ...e2, comments:itemCommentObj[e2.itemId]}]
          }

        })
    })
    res.status(200).send(result)
}

export {get}