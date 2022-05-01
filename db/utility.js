import { dbQuery } from "./connection.js"
const handleComment = (itemTransResult, itemCommentResult, commentResult)=>{
    // handle comments
    let itemCommentObj = {}
    let itemList = []
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
    return itemCommentObj
}


const queryAllItem = async()=>{
    let itemTransResult = await dbQuery('SELECT * FROM `Item_Trans` WHERE `lang`=\'zh\'')
    let itemResult = await dbQuery('SELECT * FROM `Item`')
    let commentResult = await dbQuery('SELECT * FROM `Comment`')
    let itemCommentResult = await dbQuery('SELECT * FROM `Item_Comment`')
    let result = []

    let itemCommentObj = handleComment (itemTransResult, itemCommentResult, commentResult)

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

const queryItemById = async (id)=>{
    // todo modify this function to query db directly
    let allItems = await queryAllItem()
    // console.log("id", id)
    let [result] = allItems.filter(item=>item.itemId===id)
    // console.log(allItems)
    return result
}
export {queryAllItem,
    queryItemById
}