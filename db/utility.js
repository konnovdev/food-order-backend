import { dbQuery } from "./connection.js"
const queryAllItem = async()=>{
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
    // handel comments
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
    // console.log("itemCommentObj", itemCommentObj)

    // combine three tables
    itemResult.forEach((e1)=>{
        itemTransResult.forEach((e2)=>{
          if (e1.id===e2.itemId){
              result = [...result, {...e1, ...e2, comments:itemCommentObj[e2.itemId]}]
          }

        })
    })

    return result
}

export {queryAllItem,
}